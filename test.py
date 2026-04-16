from tools.tavily import tavily_search
from tools.flight import search_flights
from backend import runTravelAgent

res = runTravelAgent("Plan a trip from Delhi to Tokyo")
print("FLIGHT RESULTS:\n", res['flight_results'])
print("\nFINAL RESPONSE:\n", res['final_response'])