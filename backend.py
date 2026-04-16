import os 
import certifi
from dotenv import load_dotenv

from typing import TypedDict, Annotated
import operator
import uuid
# pyrefly: ignore [missing-import]
import psycopg

# pyrefly: ignore [missing-import]
from psycopg.rows import dict_row

from langgraph.graph import StateGraph, START, END

# pyrefly: ignore [missing-import]
from langgraph.checkpoint.postgres import PostgresSaver
from langchain_core.messages import (
    AnyMessage,
    HumanMessage,
    AIMessage,
    SystemMessage,
)
# pyrefly: ignore [missing-import]
from langchain_groq import ChatGroq
from tools.tavily import tavily_search
from tools.flight import search_flights


load_dotenv()

def get_database_url():
    db_url = os.getenv('Database_url')
    if "sslmode=" not in db_url:
        db_url = db_url + "?sslmode=require"
    return db_url

GROQ_API_KEY = os.getenv('GROQ_API_KEY')


llm = ChatGroq(model="openai/gpt-oss-20b",api_key=GROQ_API_KEY)


class TravelAgentState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]
    user_query:str
    flight_results: str
    hotel_results:str
    itinerary:str
    llm_calls:str 

    
def flightAgent(state:TravelAgentState):
    query= state['user_query']
    flight_data = search_flights(query)

    return {
        "llm_calls": state.get("llm_calls" ,0)+1,
        "flight_results": str(flight_data),
        "messages": [AIMessage(content=str(flight_data))]
    }   

def HotelAgent(state:TravelAgentState):
    query= f"Best Hotels for {state['user_query']}"
    hotel_results = tavily_search(query)

    return {
        "llm_calls": state.get("llm_calls" ,0)+1,
        "hotel_results": hotel_results,
        "messages": [AIMessage(content=hotel_results)]
    }   


def itineraryAgent(state:TravelAgentState):
    prompt=f"""You are a travel agent.
    Create a daily itinerary for a trip based on the user's query and the information you have.
    
    User query: {state['user_query']}
    
    Flight info:
    {state['flight_results']}
    
    Hotel info:
    {state['hotel_results']}
    
    """
    response = llm.invoke([
        SystemMessage(content='You are a travel agent'),
        HumanMessage(content=prompt)
        ])

    return {
        "llm_calls": state.get("llm_calls" ,0)+1,
        "itinerary": response.content ,
        "messages": [response]
    }     


def finalAgent(state: TravelAgentState):
    prompt=f"""
    
    You are a travel agent. Your goal is to present the final response to the user.
    User query: {state['user_query']}
    
    Flight info:
    {state['flight_results']}
    
    Hotel info:
    {state['hotel_results']}
    
    Itinerary:
    {state['itinerary']}

    Please format your response nicely:
    - Start with a warm greeting.
    - Present flight info clearly.
    - Present hotel info clearly.
    - Present the itinerary in a day-wise format.
    - Use markdown for bolding, bullet points, etc.
    - End with a nice closing.

    Important:
    -Be clear and practical 
    -Don't provide any additional information that is not related to the user's query
    -Keep the response concise and under 300 words.
    """

    response = llm.invoke([
        SystemMessage(content='You are a travel agent'),
        HumanMessage(content=prompt)
        ])

    return {
        "llm_calls": state.get("llm_calls" ,0)+1,
        "messages": [response]
    }   


graph = StateGraph(TravelAgentState)
graph.add_node('flightAgent' , flightAgent)
graph.add_node('HotelAgent' , HotelAgent)
graph.add_node('itineraryAgent' , itineraryAgent)
graph.add_node('finalAgent' , finalAgent)


graph.add_edge(START, 'flightAgent')
graph.add_edge('flightAgent', 'HotelAgent')
graph.add_edge('HotelAgent', 'itineraryAgent')
graph.add_edge('itineraryAgent', 'finalAgent')
graph.add_edge('finalAgent', END)


# set up state persistence for a LangGraph workflow using a PostgreSQL database
db_url = get_database_url()
#esatblish postgress connection , using psycopg ,  autocommit directly commits the changes 
connection = psycopg.connect(db_url, row_factory=dict_row , autocommit=True)
checkpointer = PostgresSaver(connection)
checkpointer.setup()

travel_graph = graph.compile(checkpointer=checkpointer)


#function for fastapi
def runTravelAgent(query:str , thread_id: str | None=None):
    if not thread_id:
        thread_id = f"user_{uuid.uuid4().hex}"
    
    config= {
        "configurable":{
            "thread_id": thread_id            
        }
    }
    result = travel_graph.invoke({
        'messages':[
            HumanMessage(content=query)
        ], 
        "user_query":query,
        "llm_calls":0, 
        "flight_results" :"",
        "hotel_results": "",
        "itinerary": "",
    },config)

    answer = result['messages'][-1].content 
    return {
        "thread_id": thread_id,
        "user_query":query,
        "llm_calls":result.get("llm_calls" , 0), 
        "flight_results" :result.get("flight_results" , ""),
        "hotel_results": result.get("hotel_results" , ""),
        "itinerary": result.get("itinerary" , ""),
        "final_response": answer
    }


app = graph.compile()
