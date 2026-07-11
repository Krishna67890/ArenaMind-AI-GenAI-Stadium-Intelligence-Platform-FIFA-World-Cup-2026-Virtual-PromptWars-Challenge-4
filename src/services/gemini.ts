/**
 * ArenaMind AI - Gemini Service
 * Updated to use mock responses for Challenge 4 submission.
 */

export async function askGemini(prompt: string) {
  // Simulating AI thinking delay - Reduced for "zero-latency" feel in demo
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockGeminiResponse(prompt);
}

export async function generateOSResponse(prompt: string) {
  return askGemini(prompt);
}

function mockGeminiResponse(prompt: string) {
  const p = prompt.toLowerCase();

  // Football & How to Play
  if (p.includes("how to play") || p.includes("learn football") || p.includes("football basics") || p.includes("soccer rules")) {
    return "Football (Soccer) is played with two teams of 11 players. The objective is to score by getting the ball into the opposing goal using any part of the body except hands/arms (unless you're the goalkeeper). Key rules include Offside (cannot be behind the last defender when a pass is made), Fouls (yellow/red cards for dangerous play), and Throw-ins/Corner kicks for out-of-bounds play. A standard match is two 45-minute halves.";
  }

  if (p.includes("offside")) {
    return "A player is in an offside position if they are in the opponent's half and closer to the goal line than the second-last opponent (usually the last defender) when the ball is played to them. Semi-Automated Offside Technology (SAOT) at FIFA 2026 will use 12 dedicated cameras to track 29 data points per player.";
  }

  if (p.includes("match") || p.includes("game") || p.includes("live")) {
    return "LIVE UPDATE: USA vs Brazil at MetLife Stadium is currently 2-1 (84th minute). Next match: Mexico vs Germany at Estadio Azteca, tomorrow 18:00 UTC. Tournament status: Group Stage Day 4. All systems operational.";
  }

  // FIFA 2026 Details
  if (p.includes("fifa 2026") || p.includes("world cup 26") || p.includes("tournament")) {
    return "FIFA World Cup 2026 will be the largest ever, featuring 48 teams across 16 host cities in the USA, Canada, and Mexico. A total of 104 matches will be played between June 11 and July 19, 2026. The final will be held at MetLife Stadium.";
  }

  // Stadium Info
  if (p.includes("stadium") || p.includes("arena")) {
    if (p.includes("metlife") || p.includes("new york") || p.includes("new jersey")) return "MetLife Stadium (NY/NJ): The crown jewel of the tournament hosting the Final. Capacity: 82,500. Features advanced 5G integration and neural crowd management.";
    if (p.includes("azteca") || p.includes("mexico city")) return "Estadio Azteca (Mexico City): The historic venue for the opening match. Capacity: 87,523. First stadium to host three World Cups.";
    if (p.includes("sofi") || p.includes("los angeles")) return "SoFi Stadium (LA): Hosting the USA's opening match. The world's most expensive stadium with a 360-degree dual-sided 4K Oculus video board.";
    if (p.includes("arrowhead") || p.includes("kansas city")) return "Arrowhead Stadium (KC): Known for the loudest crowd in the world. Capacity: 76,416. Will host quarter-final matches.";
    if (p.includes("att") || p.includes("dallas")) return "AT&T Stadium (Dallas): Featuring the massive center-hung video board and retractable roof. Capacity: 80,000+.";
    return "I have data on all 16 host cities: New York, Los Angeles, Mexico City, Toronto, Vancouver, Kansas City, Miami, Dallas, and more. Which one would you like to explore in ArenaVerse?";
  }

  // 3D Navigation & Page Routes
  if (p.includes("go to") || p.includes("open") || p.includes("show me") || p.includes("navigate to")) {
    if (p.includes("home")) return "NAVIGATE_HOME|Returning to the ArenaMind headquarters.";
    if (p.includes("verse") || p.includes("3d")) return "NAVIGATE_ARENA_VERSE|Initializing the 3D ArenaVerse environment.";
    if (p.includes("twin") || p.includes("digital")) return "NAVIGATE_DIGITAL_TWIN|Synchronizing with the stadium's digital twin.";
    if (p.includes("agent") || p.includes("ai")) return "NAVIGATE_AGENTS|Connecting to the AI Agent collective.";
    if (p.includes("launch") || p.includes("platform")) return "NAVIGATE_LAUNCH|Accessing the mission launch platform.";
    if (p.includes("demo") || p.includes("schedule")) return "NAVIGATE_DEMO|Opening the experience scheduling portal.";
    if (p.includes("menu") || p.includes("food")) return "NAVIGATE_MENU|Loading the neural cuisine menu.";
    if (p.includes("about")) return "NAVIGATE_ABOUT|Accessing ArenaMind background protocols.";
    if (p.includes("profile")) return "NAVIGATE_PROFILE|Opening your operator profile.";
    if (p.includes("dashboard") || p.includes("command center")) return "NAVIGATE_DASHBOARD|Accessing the central command dashboard.";
    if (p.includes("pricing") || p.includes("cost")) return "NAVIGATE_PRICING|Displaying investment tiers and pricing models.";
    if (p.includes("features") || p.includes("capabilities")) return "NAVIGATE_FEATURES|Listing the core capabilities of the ArenaMind system.";
    if (p.includes("contact") || p.includes("support")) return "NAVIGATE_CONTACT|Opening the communication uplink to support.";
    if (p.includes("fifa") && p.includes("detail")) return "NAVIGATE_FIFA_DETAILS|Accessing specific FIFA 2026 tournament logistics.";
    if (p.includes("accessibility")) return "NAVIGATE_ACCESSIBILITY|Loading universal access and inclusion protocols.";
    if (p.includes("traffic") || p.includes("prediction")) return "NAVIGATE_TRAFFIC|Initializing predictive traffic flow analysis.";
  }

  if (p.includes("stadium") || p.includes("arena") || p.includes("take me to")) {
    if (p.includes("globe") || p.includes("world") || p.includes("earth")) {
      return "COMMAND_VIEW_GLOBE|Initiating orbital view. Mapping all 2026 host cities.";
    }
    if (p.includes("vip") || p.includes("lounge")) {
      return "COMMAND_VIEW_VIP|Navigating to the VIP Executive Lounge. Enjoy the premium bird's eye view.";
    }
    if (p.includes("pitch") || p.includes("field") || p.includes("grass")) {
      return "COMMAND_VIEW_PITCH|Moving camera to pitch level for a player's perspective.";
    }
    return "COMMAND_VIEW_STADIUM|Redirecting neural link to MetLife Stadium 3D twin. Welcome to the ArenaVerse.";
  }

  if (p.includes("night") || p.includes("dark")) {
    return "COMMAND_MODE_NIGHT|Switching to night operations mode. Floodlights activated.";
  }

  if (p.includes("day") || p.includes("light")) {
    return "COMMAND_MODE_DAY|Switching to day operations mode. Optimizing for natural light visibility.";
  }

  if (p.includes("celebrate") || p.includes("goal")) {
    return "COMMAND_CELEBRATE|GOAL DETECTED! Activating victory light show and fan engagement sequence!";
  }

  if (p.includes("walk") || p.includes("first person")) {
    return "COMMAND_WALK_MODE|Activating First-Person Walk Mode. Use your sensors to explore the concourse.";
  }

  // Football Regulations & FIFA 2026 Specifics
  if (p.includes("fifa") || p.includes("regulation") || p.includes("rule")) {
    if (p.includes("offside")) {
      return "Under FIFA 2026 guidelines, Semi-Automated Offside Technology (SAOT) will be used. A player is in an offside position if any part of their head, body or feet is in the opponents' half (excluding the halfway line) and is nearer to the opponents' goal line than both the ball and the second-last opponent.";
    }
    if (p.includes("var")) {
      return "Video Assistant Referee (VAR) at FIFA 2026 uses a dedicated fiber-optic link to the Match Hub. It only intervenes for 'clear and obvious errors' or 'serious missed incidents' relating to goals, penalties, direct red cards, or mistaken identity.";
    }
    if (p.includes("bag") || p.includes("item") || p.includes("prohibited")) {
      return "FIFA 2026 Stadium Security Policy: Only clear bags smaller than 12x6x12 inches are permitted. Prohibited items include professional cameras, bottles, banners with commercial content, and any incendiary devices. Smart lockers are available at Gates A and D.";
    }
    return "I am specialized in FIFA 2026 tournament regulations. I can provide information on match rules, stadium security protocols, and ticketing policies. What specific regulation can I clarify?";
  }

  // Logistics & Operations
  if (p.includes("logistics") || p.includes("delivery") || p.includes("supply")) {
    return "Logistics Protocol: Automated delivery drones are currently replenishing Concourse B kiosks. Internal supply chain latency is at 4.2ms. All VIP catering units have been verified for cold-chain compliance.";
  }

  // Navigation & Crowd Management
  if (p.includes("gate") || p.includes("entrance")) {
    return "Gate B is currently at 42% capacity. The fastest route from your current location is via the West Entrance. Estimated walking time is 4 minutes. AI-detected crowd flow suggests staying left of the main concourse.";
  }

  // Facilities
  if (p.includes("restroom") || p.includes("toilet")) {
    return "The nearest restroom is located 50 meters behind Sector 4. It is currently unoccupied and has been flagged for cleaning in 15 minutes by our automated maintenance schedule.";
  }

  // Emergency & Safety
  if (p.includes("emergency") || p.includes("help") || p.includes("police")) {
    return "Emergency protocol activated. Stadium security teams and nearest medical personnel (Station 3) have been notified of your coordinates. Please stay calm and follow the pulsing blue floor lights for the safest evacuation route.";
  }

  // Sustainability
  if (p.includes("recycle") || p.includes("waste") || p.includes("sustainability")) {
    return "Thank you for contributing to our Green Goal initiative. The nearest smart-sorting bin is located next to the Food Court entrance. We have diverted 84% of today's stadium waste from landfills so far.";
  }

  // Multilingual Assistance
  if (p.includes("language") || p.includes("translate")) {
    return "I can assist you in 12 languages. You can change the global stadium interface language from your dashboard or simply ask me to translate specific announcements.";
  }

  // Matchday Itinerary Generation
  if (p.includes("itinerary") || p.includes("schedule") || p.includes("my day")) {
    return "COMMAND_GENERATE_ITINERARY|Matchday Itinerary Generated:\n1. 14:00 - Smart Shuttle arrival at Zone A.\n2. 14:30 - VIP Lounge check-in & Neural Link sync.\n3. 15:45 - Pitch-side architectural briefing.\n4. 17:00 - Kick-off: Real-time spatial intelligence monitoring.\n5. 19:30 - Post-match crowd flow optimization analysis.";
  }

  // Operational Intelligence (Venue Staff)
  if (p.includes("staff") || p.includes("load") || p.includes("concession")) {
    return "Concession Stand 7 is experiencing a 15% increase in demand. Recommending dispatch of 2 additional staff members from the North Reserve pool to optimize service speed.";
  }

  if (p.includes("tour") || p.includes("guide")) {
    return "COMMAND_AI_TOUR|Initiating the ArenaVerse AI Tour. Fastening neural links for a guided tour of the FIFA 2026 stadium ecosystem.";
  }

  if (p.includes("route") || p.includes("detect")) {
    return "COMMAND_DETECT_ROUTE|Activating global transit detection. Mapping synchronization routes between host cities.";
  }

  return "I'm ArenaMind AI, your stadium operations assistant. I'm currently monitoring crowd density, transportation synchronization, and venue safety in real-time. How can I assist your tournament experience?";
}
