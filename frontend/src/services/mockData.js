export const DESTINATION_DATABASE = {
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    currency: "JPY (¥)",
    exchangeRate: "1 USD ≈ 152 JPY",
    coordinates: "35.6762° N, 139.6503° E",
    budgetEstimate: 1450,
    weather: {
      temp: "21°C",
      condition: "Partly Sunny",
      humidity: "58%",
      wind: "12 km/h",
      icon: "sun-cloud",
      forecast: [
        { day: "Day 1", temp: "22°C", cond: "Sunny", icon: "sun" },
        { day: "Day 2", temp: "20°C", cond: "Partly Cloudy", icon: "cloud" },
        { day: "Day 3", temp: "19°C", cond: "Light Rain", icon: "rain" },
        { day: "Day 4", temp: "23°C", cond: "Clear", icon: "sun" }
      ]
    },
    flights: [
      {
        id: "fl-101",
        airline: "Japan Airlines (JAL)",
        flightNo: "JL-752",
        from: "DAC",
        fromName: "Hazrat Shahjalal Intl",
        to: "NRT",
        toName: "Narita Intl Tokyo",
        departTime: "22:45",
        arrivalTime: "08:15 (+1)",
        duration: "6h 30m",
        stops: "Non-stop",
        price: 620,
        cabin: "Economy Direct",
        badge: "AviationStack Verified"
      },
      {
        id: "fl-102",
        airline: "All Nippon Airways (ANA)",
        flightNo: "NH-848",
        from: "DAC",
        fromName: "Dhaka Intl",
        to: "HND",
        toName: "Tokyo Haneda",
        departTime: "13:10",
        arrivalTime: "22:30",
        duration: "6h 20m",
        stops: "Non-stop",
        price: 690,
        cabin: "Premium Economy",
        badge: "Fastest Route"
      }
    ],
    hotels: [
      {
        id: "ht-201",
        name: "Shinjuku Granbell Hotel",
        stars: 4.7,
        neighborhood: "Shinjuku City • 0.3 km to Metro",
        pricePerNight: 140,
        totalEstimate: 560,
        tags: ["High-speed Wi-Fi", "Rooftop Sky Bar", "Subway Direct", "English Staff"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        link: "https://tavily.com/search?q=Shinjuku+Granbell+Hotel+Tokyo",
        badge: "Tavily Top Pick"
      },
      {
        id: "ht-202",
        name: "The Celestine Tokyo Shiba",
        stars: 4.8,
        neighborhood: "Minato Ward • Near Tokyo Tower",
        pricePerNight: 175,
        totalEstimate: 700,
        tags: ["Onsen Bath", "Lounge Access", "Garden Terrace", "Concierge"],
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        link: "https://tavily.com/search?q=The+Celestine+Tokyo+Shiba",
        badge: "Luxury Tech Stays"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Neon Odyssey in Akihabara",
        summary: "Touch down at Narita, check into Shinjuku hotel, explore electronic town & maid cafes.",
        estimatedSpend: 110,
        blocks: [
          {
            time: "Morning",
            type: "transit",
            title: "Arrival & Narita Express Transit",
            desc: "Board N'EX direct to Shinjuku Station. Grab Suica IC transit card & pocket Wi-Fi at airport terminal.",
            cost: "$28",
            location: "Narita Airport ➔ Shinjuku",
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: "Akihabara Electric Town & Super Potato",
            desc: "Immerse in multi-floor retro gaming shops, Gundam Cafe, and anime figures store in Chiyoda.",
            cost: "$45",
            location: "Akihabara, Chiyoda City",
            completed: false
          },
          {
            time: "Evening",
            type: "food",
            title: "Ramen Street & Omoide Yokocho Bar Crawl",
            desc: "Savor legendary Tonkotsu ramen at Ichiran Shinjuku followed by yakitori sticks in memory lane alleyways.",
            cost: "$37",
            location: "Omoide Yokocho, Shinjuku",
            completed: false
          }
        ]
      },
      {
        day: 2,
        title: "Futuristic Digital Art & Shibuya Scramble",
        summary: "Dive into immersive light installations at teamLab and catch sunset views over Tokyo.",
        estimatedSpend: 135,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "teamLab Planets TOKYO Immersive Exhibit",
            desc: "Walk barefoot through crystal water installations and projection mapped koi ponds in Toyosu.",
            cost: "$38",
            location: "Toyosu, Koto City",
            completed: false
          },
          {
            time: "Afternoon",
            type: "food",
            title: "Tsukiji Outer Market Seafood Lunch",
            desc: "Enjoy flame-torched A5 Wagyu skewers, fresh uni bowls, and tamagoyaki egg blocks.",
            cost: "$42",
            location: "Tsukiji Outer Market",
            completed: false
          },
          {
            time: "Evening",
            type: "attraction",
            title: "Shibuya Sky Observation Deck",
            desc: "360-degree open-air glass rooftop panoramic views of Shibuya Scramble and Mount Fuji backdrop.",
            cost: "$55",
            location: "Shibuya Scramble Square",
            completed: false
          }
        ]
      },
      {
        day: 3,
        title: "Historic Asakusa Shrine & Cyberpunk Shinjuku",
        summary: "Blend ancient Senso-ji temple vibes with nighttime neon alleyways.",
        estimatedSpend: 95,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Senso-ji Temple & Nakamise Shopping Street",
            desc: "Pass under the Kaminarimon Thunder Gate, burn incense, and sample matcha dorayaki snacks.",
            cost: "$20",
            location: "Asakusa, Taito City",
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: "Ghibli Museum / Meiji Jingu Shrine stroll",
            desc: "Walk through tranquil evergreen forest to Meiji Shrine, followed by Harajuku Takeshita Street.",
            cost: "$30",
            location: "Yoyogi Park & Harajuku",
            completed: false
          },
          {
            time: "Evening",
            type: "food",
            title: "Kabukicho Neon Alley & VR Zone Arcade",
            desc: "Dine at Robot Restaurant district, play high-tech VR simulators, and enjoy Japanesecraft beers.",
            cost: "$45",
            location: "Kabukicho, Shinjuku",
            completed: false
          }
        ]
      },
      {
        day: 4,
        title: "Ginza Shopping & Departure Prep",
        summary: "Final souvenir shopping in Ginza, green tea ceremony, and express transfer.",
        estimatedSpend: 80,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Ginza Six Flagship Store & Tea Ceremony",
            desc: "Browse high-end Japanese crafts, luxury stationary at Itoya, and traditional matcha tasting.",
            cost: "$35",
            location: "Ginza, Chuo City",
            completed: false
          },
          {
            time: "Afternoon",
            type: "food",
            title: "Final Tonkatsu Lunch & Airport Express",
            desc: "Crispy Kurobuta pork cutlet at Maisen followed by direct airport limousine bus transfer.",
            cost: "$45",
            location: "Tokyo Station Hub",
            completed: false
          }
        ]
      }
    ]
  },
  kyoto: {
    city: "Kyoto",
    country: "Japan",
    currency: "JPY (¥)",
    exchangeRate: "1 USD ≈ 152 JPY",
    coordinates: "35.0116° N, 135.7681° E",
    budgetEstimate: 980,
    weather: {
      temp: "19°C",
      condition: "Clear Sky",
      humidity: "52%",
      wind: "8 km/h",
      icon: "sun",
      forecast: [
        { day: "Day 1", temp: "20°C", cond: "Sunny", icon: "sun" },
        { day: "Day 2", temp: "18°C", cond: "Partly Cloudy", icon: "cloud" },
        { day: "Day 3", temp: "21°C", cond: "Clear", icon: "sun" }
      ]
    },
    flights: [
      {
        id: "fl-201",
        airline: "Japan Airlines",
        flightNo: "JL-124",
        from: "DAC",
        fromName: "Dhaka Intl",
        to: "KIX",
        toName: "Kansai Intl Osaka",
        departTime: "01:20",
        arrivalTime: "10:45",
        duration: "6h 25m",
        stops: "Non-stop",
        price: 540,
        cabin: "Economy Direct",
        badge: "Kansai Express"
      }
    ],
    hotels: [
      {
        id: "ht-301",
        name: "Kyoto Granbell Hotel Gion",
        stars: 4.8,
        neighborhood: "Gion District • Traditional Machiya Design",
        pricePerNight: 125,
        totalEstimate: 375,
        tags: ["Public Onsen Bath", "Gion Lantern Walk", "Tatami Rooms"],
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
        link: "https://tavily.com/search?q=Kyoto+Granbell+Hotel+Gion",
        badge: "Heritage Sanctuary"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Fushimi Inari Torii Gates & Gion Geisha District",
        summary: "Hike through 10,000 vermilion gates and explore historic lantern-lit streets.",
        estimatedSpend: 75,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Fushimi Inari Shrine Gate Trek",
            desc: "Early morning walk up Mount Inari under thousands of vibrant red torii gates.",
            cost: "$15",
            location: "Fushimi Ward, Kyoto",
            completed: false
          },
          {
            time: "Afternoon",
            type: "food",
            title: "Nishiki Market Street Food Tour",
            desc: "Try octopus skewers, dango rice cakes, roasted chestnuts, and Kyoto matcha ice cream.",
            cost: "$30",
            location: "Nishiki Market",
            completed: false
          },
          {
            time: "Evening",
            type: "attraction",
            title: "Gion Hanamikoji Lantern Walk & Kaiseki Dinner",
            desc: "Stroll along wooden tea houses and enjoy traditional multi-course Kyoto Kaiseki cuisine.",
            cost: "$30",
            location: "Gion District",
            completed: false
          }
        ]
      },
      {
        day: 2,
        title: "Arashiyama Bamboo Grove & Golden Pavilion",
        summary: "Serene bamboo forests, monkey park, and glistening Kinkaku-ji temple.",
        estimatedSpend: 85,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Arashiyama Bamboo Grove & Tenryu-ji Garden",
            desc: "Listen to rustling bamboo stalks and explore UNESCO Zen landscape gardens.",
            cost: "$20",
            location: "Arashiyama",
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: "Kinkaku-ji (Golden Pavilion) Temple",
            desc: "Admire the top two floors covered in pure gold leaf reflected in Kyoko-chi pond.",
            cost: "$25",
            location: "Kita Ward",
            completed: false
          },
          {
            time: "Evening",
            type: "food",
            title: "Pontocho Alley Riverside Dining",
            desc: "Dine on elevated wooden platforms overlooking the Kamogawa River.",
            cost: "$40",
            location: "Pontocho Alley",
            completed: false
          }
        ]
      },
      {
        day: 3,
        title: "Kiyomizu-dera Wooden Temple & Higashiyama Stroll",
        summary: "Panoramic hillside balcony temple views and historic stone slope shopping.",
        estimatedSpend: 70,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Kiyomizu-dera Temple Wooden Stage",
            desc: "Stand on the towering wooden balcony built without a single nail overlooking Kyoto.",
            cost: "$15",
            location: "Higashiyama Ward",
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: "Ninenzaka & Sannenzaka Preserved Streets",
            desc: "Browse pottery shops, historic Starbucks in a 100-year-old machiya house, and crafts.",
            cost: "$25",
            location: "Higashiyama",
            completed: false
          },
          {
            time: "Evening",
            type: "food",
            title: "Matcha Dessert Tasting & Haruka Express Transfer",
            desc: "Uji matcha parfait at Tsujiri followed by return bullet train or airport transfer.",
            cost: "$30",
            location: "Kyoto Station Hub",
            completed: false
          }
        ]
      }
    ]
  },
  paris: {
    city: "Paris",
    country: "France",
    currency: "EUR (€)",
    exchangeRate: "1 USD ≈ 0.92 EUR",
    coordinates: "48.8566° N, 2.3522° E",
    budgetEstimate: 1350,
    weather: {
      temp: "18°C",
      condition: "Partly Cloudy",
      humidity: "65%",
      wind: "14 km/h",
      icon: "cloud",
      forecast: [
        { day: "Day 1", temp: "19°C", cond: "Partly Cloudy", icon: "cloud" },
        { day: "Day 2", temp: "17°C", cond: "Sunny", icon: "sun" },
        { day: "Day 3", temp: "20°C", cond: "Clear", icon: "sun" }
      ]
    },
    flights: [
      {
        id: "fl-301",
        airline: "Air France",
        flightNo: "AF-229",
        from: "DAC",
        fromName: "Dhaka Intl",
        to: "CDG",
        toName: "Paris Charles de Gaulle",
        departTime: "03:40",
        arrivalTime: "11:15",
        duration: "10h 35m",
        stops: "1 Stop",
        price: 780,
        cabin: "Economy Standard",
        badge: "AviationStack Verified"
      }
    ],
    hotels: [
      {
        id: "ht-401",
        name: "Hôtel Saint-Germain Des Prés",
        stars: 4.6,
        neighborhood: "6th Arrondissement • Left Bank Paris",
        pricePerNight: 160,
        totalEstimate: 480,
        tags: ["Boutique Design", "French Breakfast", "Walk to Seine"],
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
        link: "https://tavily.com/search?q=Hotel+Saint+Germain+Des+Pres+Paris",
        badge: "Romantic Stay"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Eiffel Tower Sunset & Seine River Cruise",
        summary: "Arrive in Paris, stroll the Champs-Élysées, and experience the sparkling Eiffel Tower.",
        estimatedSpend: 110,
        blocks: [
          {
            time: "Morning",
            type: "transit",
            title: "Check-in at Saint-Germain & Fresh Croissants",
            desc: "Settle into boutique room, enjoy fresh butter croissants and cafe au lait at Cafe de Flore.",
            cost: "$25",
            location: "Saint-Germain-des-Prés",
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: "Louvre Museum Pyramids & Tuileries Garden",
            desc: "View Mona Lisa, Winged Victory, and take a romantic walk through Tuileries gardens.",
            cost: "$40",
            location: "1st Arrondissement",
            completed: false
          },
          {
            time: "Evening",
            type: "attraction",
            title: "Eiffel Tower Summit & Bateaux Mouches Seine Cruise",
            desc: "Glide down the Seine past illuminated monuments as the Eiffel Tower sparkles on the hour.",
            cost: "$45",
            location: "Champ de Mars",
            completed: false
          }
        ]
      },
      {
        day: 2,
        title: "Montmartre Artistry & Sacré-Cœur Panorama",
        summary: "Cobblestone streets, artists in Place du Tertre, and sunset over Sacré-Cœur dome.",
        estimatedSpend: 95,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Sacré-Cœur Basilica Hilltop View",
            desc: "Climb the steps of Montmartre for sweeping views of Paris rooftops.",
            cost: "$15",
            location: "18th Arrondissement",
            completed: false
          },
          {
            time: "Afternoon",
            type: "food",
            title: "Le Marais Bistro Lunch & Vintage Boutiques",
            desc: "Taste gourmet duck confit and galettes in Paris' trendiest historic neighborhood.",
            cost: "$40",
            location: "Le Marais",
            completed: false
          },
          {
            time: "Evening",
            type: "attraction",
            title: "Opéra Garnier & Roof Terrace Champagne Bar",
            desc: "Visit the opulent Opera house followed by rooftop drinks at Galeries Lafayette.",
            cost: "$40",
            location: "9th Arrondissement",
            completed: false
          }
        ]
      }
    ]
  }
};

/**
 * Generate synthetic intelligent payload if destination is custom
 */
export function generateSyntheticDestination(userQuery) {
  // Extract potential city name or default to user input
  const queryLower = userQuery.toLowerCase();
  let cityName = "Custom Destination";
  
  if (queryLower.includes("tokyo")) cityName = "Tokyo";
  else if (queryLower.includes("kyoto")) cityName = "Kyoto";
  else if (queryLower.includes("paris")) cityName = "Paris";
  else if (queryLower.includes("iceland")) cityName = "Reykjavik, Iceland";
  else if (queryLower.includes("bali")) cityName = "Bali, Indonesia";
  else if (queryLower.includes("new york")) cityName = "New York City";
  else if (queryLower.includes("london")) cityName = "London, UK";
  else {
    // Extract capitalized words or generic
    const match = userQuery.match(/in\s+([A-Za-z\s]+)/i) || userQuery.match(/to\s+([A-Za-z\s]+)/i);
    if (match && match[1]) {
      cityName = match[1].split(' ')[0].trim();
      cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    } else {
      cityName = "Global Gateway";
    }
  }

  // Parse budget from prompt if present
  const budgetMatch = userQuery.match(/\$([0-9]+)/);
  const userBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : 1500;

  return {
    city: cityName,
    country: "Worldwide Destination",
    currency: "USD ($)",
    exchangeRate: "Local Market Rate",
    coordinates: "Lat 35.6° N, Long 139.7° E",
    budgetEstimate: Math.round(userBudget * 0.92),
    userBudget: userBudget,
    weather: {
      temp: "22°C",
      condition: "Pleasant & Clear",
      humidity: "55%",
      wind: "10 km/h",
      icon: "sun-cloud",
      forecast: [
        { day: "Day 1", temp: "23°C", cond: "Sunny", icon: "sun" },
        { day: "Day 2", temp: "21°C", cond: "Partly Cloudy", icon: "cloud" },
        { day: "Day 3", temp: "22°C", cond: "Clear", icon: "sun" },
        { day: "Day 4", temp: "24°C", cond: "Sunny", icon: "sun" }
      ]
    },
    flights: [
      {
        id: "fl-sys-1",
        airline: "Global Airways Express",
        flightNo: "GA-409",
        from: "DAC",
        fromName: "Dhaka Hub",
        to: cityName.slice(0, 3).toUpperCase(),
        toName: `${cityName} International`,
        departTime: "21:30",
        arrivalTime: "07:45 (+1)",
        duration: "7h 15m",
        stops: "Non-stop",
        price: Math.round(userBudget * 0.42),
        cabin: "Economy Flex",
        badge: "AviationStack Live MCP"
      },
      {
        id: "fl-sys-2",
        airline: "Emirates / SkyAlliance",
        flightNo: "EK-318",
        from: "DAC",
        fromName: "Dhaka Hub",
        to: cityName.slice(0, 3).toUpperCase(),
        toName: `${cityName} Executive Airport`,
        departTime: "14:15",
        arrivalTime: "23:50",
        duration: "8h 35m",
        stops: "1 Layover",
        price: Math.round(userBudget * 0.38),
        cabin: "Economy Standard",
        badge: "Lowest Price Option"
      }
    ],
    hotels: [
      {
        id: "ht-sys-1",
        name: `The Grand Obsidian Hotel ${cityName}`,
        stars: 4.8,
        neighborhood: `City Center • 0.2 km from Metro`,
        pricePerNight: Math.round((userBudget * 0.35) / 4),
        totalEstimate: Math.round(userBudget * 0.35),
        tags: ["High-speed Wi-Fi", "Sky Lounge", "Breakfast Included", "24/7 Concierge"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        link: `https://tavily.com/search?q=Best+Hotels+in+${encodeURIComponent(cityName)}`,
        badge: "Tavily MCP Recommended"
      },
      {
        id: "ht-sys-2",
        name: `Aura Modern Boutique Stays`,
        stars: 4.7,
        neighborhood: `Arts & Culinary Quarter`,
        pricePerNight: Math.round((userBudget * 0.28) / 4),
        totalEstimate: Math.round(userBudget * 0.28),
        tags: ["Boutique Spa", "Rooftop Terrace", "Local Dining Pass"],
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        link: `https://tavily.com/search?q=Boutique+Stays+${encodeURIComponent(cityName)}`,
        badge: "Value Choice"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: `Arrival & City Center Orientation in ${cityName}`,
        summary: "Airport transfer, hotel check-in, local neighborhood walking tour & iconic dinner.",
        estimatedSpend: 95,
        blocks: [
          {
            time: "Morning",
            type: "transit",
            title: `Arrival at ${cityName} International & Transfer`,
            desc: "Express airport transport to central accommodation. Check in & refresh.",
            cost: "$25",
            location: `${cityName} Downtown`,
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: `Historic Center & Iconic City Landmark Tour`,
            desc: "Explore top cultural monuments, pedestrian squares, and local artisan markets.",
            cost: "$35",
            location: "Central District",
            completed: false
          },
          {
            time: "Evening",
            type: "food",
            title: "Welcome Gourmet Dinner & Night Skyline",
            desc: "Sample signature regional dishes at top-rated local bistro followed by scenic views.",
            cost: "$35",
            location: "Culinary District",
            completed: false
          }
        ]
      },
      {
        day: 2,
        title: "Deep Cultural Immersion & Culinary Highlights",
        summary: "Morning museum access, traditional lunch spot, and sunset observation deck.",
        estimatedSpend: 110,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "National Heritage Museum & Gardens",
            desc: "Skip-the-line guided entrance to main art exhibition and botanical gardens.",
            cost: "$30",
            location: "Cultural Quarter",
            completed: false
          },
          {
            time: "Afternoon",
            type: "food",
            title: "Artisanal Food Hall & Local Tasting Tour",
            desc: "Guided food tasting featuring street food favorites and specialty coffee.",
            cost: "$40",
            location: "Market Square",
            completed: false
          },
          {
            time: "Evening",
            type: "attraction",
            title: "Panoramic Observatory & Cocktail Lounge",
            desc: "Enjoy golden hour views of the cityscape with craft cocktail or beverage.",
            cost: "$40",
            location: "High Tower Deck",
            completed: false
          }
        ]
      },
      {
        day: 3,
        title: "Nature Excursion & Modern Lifestyle Walk",
        summary: "Day trip to nearby natural scenic area followed by shopping & entertainment.",
        estimatedSpend: 85,
        blocks: [
          {
            time: "Morning",
            type: "attraction",
            title: "Scenic Waterfront / Mountain Nature Park",
            desc: "Morning hike or boat excursion around scenic natural reserves.",
            cost: "$25",
            location: "Outer Nature Reserve",
            completed: false
          },
          {
            time: "Afternoon",
            type: "attraction",
            title: "Modern Arts District & Shopping Alleyways",
            desc: "Browse designer boutiques, indie galleries, and interactive pop-ups.",
            cost: "$30",
            location: "Arts District",
            completed: false
          },
          {
            time: "Evening",
            type: "food",
            title: "Farewell Dinner & Live Performance",
            desc: "Relaxing multi-course dinner with live jazz or traditional music.",
            cost: "$30",
            location: "Old Town Square",
            completed: false
          }
        ]
      }
    ]
  };
}
