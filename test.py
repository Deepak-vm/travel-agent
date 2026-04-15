from tools.tavily import tavily_search
from tools.flight import search_flights

res= search_flights('flight from Delhi to New York')
print(res)