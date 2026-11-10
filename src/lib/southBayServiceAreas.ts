import type { ServiceArea } from "@/lib/serviceAreas";
import { bathroomResultPhotos, homeResultPhotos } from "@/lib/realWorkPhotos";

export const southBayServiceAreas: ServiceArea[] = [
  {
    market: "southbay",
    slug: "san-jose",
    name: "San Jose",
    county: "Santa Clara County",
    areaType: "South Bay hub",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for San Jose homes, from Cambrian ranches and Willow Glen bungalows to downtown condos.",
    neighborhoods: [
      "Cambrian",
      "Almaden Valley",
      "Willow Glen",
      "West San Jose",
      "Rose Garden",
      "Berryessa",
      "Evergreen",
      "Downtown San Jose"
    ],
    nearbyAreas: [
      "Campbell",
      "Santa Clara",
      "Cupertino",
      "Sunnyvale",
      "Saratoga",
      "Los Gatos"
    ],
    localContent: "San Jose homes take different kinds of work. A Cambrian ranch from the '50s or '60s is usually one floor, so the time goes into the kitchen, bathrooms and floors. A 1920s bungalow in Willow Glen often still has its original wood floors and trim. Almaden Valley homes run bigger, with more bathrooms, and bathrooms are where a lot of the cleaning time goes.\n\nSo the price comes from your home: bedrooms, bathrooms, square footage, condition and how often we come. Put those in and you'll see the price and a room-by-room checklist of what's included. If something needs special care, like stone counters, original wood floors or a building with elevator rules, put it in your booking notes.",
    localProof: "Regular cleaning, deep cleaning and move-outs for San Jose homes, from Cambrian ranches and Willow Glen bungalows to downtown condos.",
    planCards: [
      { title: "Cambrian and West San Jose ranches", body: "Mostly one-story homes from the '50s and '60s. No stairs, so the time goes into the kitchen, bathrooms and floors.", photo: homeResultPhotos[1] },
      { title: "Hard water", body: "Much of San Jose's tap water is hard, so mineral spots on shower glass and fixtures are common. A deep clean takes care of that. Spots left on glass for years can etch it.", photo: bathroomResultPhotos[2] },
      { title: "Willow Glen and Almaden Valley", body: "Willow Glen bungalows often still have their original wood floors and trim. Almaden Valley homes run bigger, with more bathrooms, so count every bathroom when you price it.", photo: bathroomResultPhotos[1] },
    ],
    homeProfiles: [
      "One-story ranch homes in Cambrian and West San Jose",
      "1920s bungalows and revival cottages in Willow Glen and Rose Garden",
      "Fairglen Eichlers in Willow Glen",
      "Larger homes and gated communities in Almaden Valley",
      "One- and two-story homes in Evergreen",
      "Condos, apartments and townhomes downtown and in North San Jose"
    ],
    commonJobs: [
      "Weekly, every-other-week or monthly cleaning",
      "A first deep clean before regular visits start",
      "Move-out cleaning before a rental walkthrough or a sale",
      "Move-in cleaning before the furniture arrives"
    ],
    bookingNote: "Put in your ZIP, home size and the date you want. You'll see your price and what's included before anything is booked.",
    serviceDetails: {
      standard: "For a maintained home, we handle cleared kitchen surfaces, bathrooms, reachable dusting, and floors. Choose a one-time visit or weekly, biweekly, or monthly care. Tell us about pets and flooring so the quote fits your household.",
      deep: "Much of San Jose's tap water is hard, so mineral spots on shower glass and fixtures are common here. A deep clean takes care of that, along with everything a regular visit doesn't get to: baseboards, door frames, trim, switch plates, vent covers, reachable fan blades and light fixtures. Spots that have sat on glass for years can etch it, and etching doesn't clean off. Inside the oven, fridge and cabinets are add-ons you pick when you book.",
      move: "For a rental handoff, a sale or a move-in. It covers the full deep-clean list plus the inside of every empty cabinet, drawer and closet. Inside the oven and fridge and interior windows are add-ons; pick them when you book and they're in your price. Book it after the movers are done and before the walkthrough, with the water and power still on."
    },
    faqs: [
      {
        question: "Do you clean all of San Jose?",
        answer: "We take homes across the city, including Cambrian, Almaden Valley, Willow Glen, Rose Garden, West San Jose, Blossom Valley, Evergreen, Berryessa and downtown. Put in your ZIP when you check your price. Service depends on the address, and we confirm it before you book."
      },
      {
        question: "How do you figure the price?",
        answer: "Your ZIP sets the market. The price at the top of this page covers the cleaning type, bedrooms, bathrooms and home size. Condition, how often we come and any add-ons are set when you book, and you see your exact price before you confirm."
      },
      {
        question: "Can you clean a downtown condo with building rules?",
        answer: "Yes. Add guest parking, elevator, concierge check-in and any work-hour rules to your booking and we plan the visit around them."
      },
      {
        question: "Will a deep clean get hard-water spots off my shower glass?",
        answer: "It takes off normal mineral buildup on glass, tile and fixtures. Spots that have been there for years can etch the glass, and etching doesn't come off with cleaning. Not sure which you have? Text us a photo before you book."
      },
      {
        question: "Is there a contract?",
        answer: "No. You pay cleaning to cleaning, and nothing is charged when you book. Recurring visits are month to month; pause or stop with 24 hours' notice before the next visit."
      },
      {
        question: "What if something gets missed?",
        answer: "Tell us within 24 hours. If it was part of the cleaning you booked, we come back and make it right at no charge."
      }
    ],
    neighborhoodNotes: [
      {
        title: "Cambrian (95124, 95118)",
        body: "Mostly one-story ranch homes from the 1950s and '60s. No stairs, so the time goes into the kitchen, bathrooms and floors."
      },
      {
        title: "Almaden Valley (95120)",
        body: "Larger homes on bigger lots, many built in the '70s and '80s, plus gated communities like the Villas of Almaden. Count every bathroom when you price it."
      },
      {
        title: "Willow Glen and Rose Garden (95125, 95126)",
        body: "1920s and '30s Craftsman bungalows and Tudor and Spanish revival cottages. Willow Glen also has the Fairglen Eichlers, west of Booksin Avenue. Tell us about original wood floors or anything fragile before the visit."
      },
      {
        title: "West San Jose (95129, 95130)",
        body: "Late-'50s and early-'60s ranch homes in neighborhoods like Country Lane and Happy Valley, many under 1,500 square feet. If yours has been remodeled, tell us about stone counters or specialty floors."
      },
      {
        title: "Evergreen (95135, 95148)",
        body: "Single-family homes built from the 1960s through the 2000s, from the flats up into the eastern foothills, in one- and two-story plans. Two stories usually means more bathrooms and stairs."
      },
      {
        title: "Downtown and North San Jose",
        body: "High-rise condos, apartments and newer townhomes. Add parking, elevator, concierge and building-hour rules to your booking and we plan around them."
      }
    ]
  },
  {
    market: "southbay",
    slug: "cupertino",
    name: "Cupertino",
    county: "Santa Clara County",
    areaType: "West Valley",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for Cupertino homes, from 1950s ranches in Rancho Rinconada to townhomes along Stevens Creek.",
    neighborhoods: [
      "Monta Vista",
      "Rancho Rinconada",
      "Garden Gate",
      "Stevens Creek corridor"
    ],
    nearbyAreas: [
      "San Jose",
      "Sunnyvale",
      "Santa Clara",
      "Saratoga"
    ],
    localContent: "The typical Cupertino house was built around 1965. Rancho Rinconada, on the east side, went up in the 1950s as one-story ranch homes. Fairgrove, right next to it, is Cupertino's Eichler neighborhood: about 220 homes from 1960 and 1961, with glass walls and open rooms. Monta Vista, on the west side, was the city's first housing tract, and today it's small-lot streets of ranch houses and rebuilds. Most townhomes and condos are in HOA communities, several of them along Stevens Creek Boulevard.\n\nBetween the rebuilds and the remodels, surfaces change from house to house. Tell us about stone counters, wood floors and anything you want us to stay away from, and we plan the cleaning around it.",
    localProof: "Regular cleaning, deep cleaning and move-outs for Cupertino homes, from 1950s ranches in Rancho Rinconada to townhomes along Stevens Creek.",
    homeProfiles: [
      "1950s ranch homes in Rancho Rinconada",
      "Eichlers in Fairgrove",
      "Ranch houses and rebuilds in Monta Vista",
      "Townhomes and condos along Stevens Creek Boulevard"
    ],
    commonJobs: [
      "Every-other-week kitchen, bathroom and floor cleaning",
      "A deep clean first, then regular visits",
      "Empty-home cleaning between tenants or before a move-in"
    ],
    bookingNote: "Put in your Cupertino ZIP, home size and the date you want. You'll see the price and what's included before you book.",
    serviceDetails: {
      deep: "An updated kitchen and an older bathroom in the same house need different kinds of time. A Cupertino deep clean covers the regular list plus baseboards, door frames, trim, switch plates, vent covers and reachable fan blades, with extra time on shower glass, tile and fixtures. Inside the oven, fridge and cabinets are add-ons you choose when you book.",
      move: "Clear out the cabinets, drawers and closets first; we clean inside all of them, along with the full deep-clean list. If it has to be done before movers, a walkthrough or a new tenant, pick an arrival window ahead of that date when you book."
    },
    faqs: [
      {
        question: "Is all the glass in a Fairgrove Eichler included?",
        answer: "Mirrors and reachable glass in the rooms we clean are included. Interior window glass and tracks are an add-on, so add them if you want every pane done. Exterior windows, screens and ladder work aren't part of our cleaning."
      },
      {
        question: "Can you work around stone counters and wood floors?",
        answer: "Yes. Tell us what your counters and floors are made of and anything to avoid. Stone restoration, refinishing and etch removal aren't cleaning, so they're not included."
      },
      {
        question: "Do I need a deep clean before biweekly visits?",
        answer: "Not always. If the home has been kept up, start with a regular visit. If there's buildup in the bathrooms or kitchen, start with a deep clean. You can see both prices before you choose."
      },
      {
        question: "Do you clean townhomes with three levels?",
        answer: "Yes. Bedrooms, bathrooms and square footage set the price. Put the stairs, parking and HOA entry rules in your booking notes."
      }
    ],
    neighborhoodNotes: [
      {
        title: "Rancho Rinconada",
        body: "One-story 1950s ranch homes on the east side. No stairs to work around, so the kitchen and bathrooms set the pace."
      },
      {
        title: "Fairgrove",
        body: "Cupertino's Eichler tract. Mirrors and reachable glass in the rooms we clean are included. If you want every interior window and track done, add it when you book; in an Eichler that's a lot of glass."
      },
      {
        title: "Monta Vista",
        body: "Small-lot streets of ranch houses and rebuilds near the Monta Vista Village shops. If yours is a rebuild, price it with today's square footage."
      },
      {
        title: "Stevens Creek corridor",
        body: "Townhomes and condos with stairs, shared parking and HOA rules. Add the number of levels and parking instructions when you book."
      }
    ]
  },
  {
    market: "southbay",
    slug: "santa-clara",
    name: "Santa Clara",
    county: "Santa Clara County",
    areaType: "South Bay",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for Santa Clara houses, apartments and townhomes.",
    neighborhoods: [
      "Old Quad",
      "Rivermark",
      "Central Park area",
      "Lawrence Station area"
    ],
    nearbyAreas: [
      "San Jose",
      "Sunnyvale",
      "Cupertino",
      "Campbell"
    ],
    localContent: "Santa Clara's oldest homes are in the Old Quad, by Santa Clara University and the Mission: Victorians and Craftsmans from the early 1900s on deep lots. North of 101, Rivermark went up from 2002 on the old Agnews site as a planned neighborhood of houses, townhomes and condos. Lawrence Station, by the Caltrain stop, is newer still, with apartments and townhomes built since 2018. Most of the city in between is single-family tract homes.\n\nA house as old as the Old Quad's usually has original trim and older tile, and both take detail time. For a townhome or apartment, the things to sort out ahead of time are parking, stairs and building entry.",
    localProof: "Regular cleaning, deep cleaning and move-outs for Santa Clara houses, apartments and townhomes.",
    homeProfiles: [
      "Victorians and Craftsmans in the Old Quad",
      "Single-family tract homes across the city",
      "Rivermark houses, townhomes and condos",
      "Apartments with managed entry near Lawrence Station"
    ],
    commonJobs: [
      "Regular kitchen, bathroom and floor cleaning",
      "Deep cleaning for older trim, tile and fixtures",
      "Apartment and townhome move-outs"
    ],
    bookingNote: "Put in your Santa Clara ZIP, home size and the date you want. For a managed building, add parking, entry and elevator details.",
    serviceDetails: {
      deep: "A Santa Clara deep clean covers the regular list plus baseboards, door frames, trim, switch plates, vent covers and reachable fan blades, with extra time on bathroom and kitchen buildup. In an Old Quad house, the old tile and woodwork are where the hours go. Worn grout and permanent stains don't change with cleaning, and we'll tell you that up front.",
      move: "Book it after your things are out. We clean inside every empty cabinet, drawer and closet, plus the whole deep-clean list. Inside the oven and fridge and interior windows are add-ons. If your building needs an elevator reservation or a key pickup, set it up before the appointment."
    },
    faqs: [
      {
        question: "Can you clean an apartment in Rivermark or near Lawrence Station?",
        answer: "Yes. Put in the ZIP, unit size and bathrooms to see your price, then add parking, entry codes and elevator instructions to your booking."
      },
      {
        question: "When should I book a move-out clean?",
        answer: "After the movers are done and before your walkthrough, with the water and power still on. Leave a little time before the walkthrough in case you want anything touched up."
      },
      {
        question: "Will a deep clean fix old grout or stains?",
        answer: "It takes off normal buildup. Damaged grout, permanent stains and worn finishes don't change with cleaning, and repairs aren't something we do."
      },
      {
        question: "Do you clean older homes with original woodwork?",
        answer: "Yes. We dust and wipe reachable trim, doors and built-ins. Tell us about anything fragile or any product to avoid. We don't refinish or repair wood."
      }
    ],
    neighborhoodNotes: [
      {
        title: "Old Quad",
        body: "Early-1900s Victorians and Craftsmans near the university, plus duplexes and older rentals. Original trim and old tile take detail time, so a deep clean is often the right first visit."
      },
      {
        title: "Rivermark",
        body: "Houses, townhomes and condos built from 2002 north of 101. Put stairs, gate codes and guest parking in your booking."
      },
      {
        title: "Lawrence Station",
        body: "Santa Clara's newest neighborhood, next to the Caltrain station, with apartments and townhomes. Add the elevator, garage and entry details when you book."
      }
    ]
  },
  {
    market: "southbay",
    slug: "sunnyvale",
    name: "Sunnyvale",
    county: "Santa Clara County",
    areaType: "South Bay",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for Sunnyvale ranches, Eichlers and townhomes.",
    neighborhoods: [
      "Birdland",
      "Cherry Chase",
      "Heritage District",
      "Ponderosa",
      "Lakewood Village"
    ],
    nearbyAreas: [
      "Santa Clara",
      "Cupertino",
      "San Jose"
    ],
    localContent: "Sunnyvale has about 1,100 Eichler homes, more than any city but Palo Alto, spread across 16 tracts. They're one story, with glass walls and open rooms, and many have atriums. Cherry Chase is roughly 2,500 homes from the 1950s and '60s on quiet cul-de-sacs. In Birdland, across Homestead Road from Apple Park, original single-story houses sit next to two-story rebuilds. The Heritage District, around the original downtown on Murphy Avenue, has some of the city's oldest homes.\n\nThe thing to plan for in a lot of Sunnyvale homes is glass. Mirrors and reachable glass in the rooms we clean are included. Interior window glass and tracks are an add-on, and in an Eichler that's a big part of the house, so decide when you book.",
    localProof: "Regular cleaning, deep cleaning and move-outs for Sunnyvale ranches, Eichlers and townhomes.",
    homeProfiles: [
      "Eichlers with glass walls and atriums",
      "1950s and '60s homes in Cherry Chase",
      "Single-story originals and two-story rebuilds in Birdland",
      "Older homes in the Heritage District"
    ],
    commonJobs: [
      "Weekly or biweekly cleaning",
      "Deep cleaning for trim, fixtures and floor edges",
      "Move-in cleaning before boxes and furniture arrive"
    ],
    bookingNote: "Put in your Sunnyvale ZIP, bedrooms, bathrooms and square footage. Add product restrictions, stairs and access notes when you book.",
    serviceDetails: {
      deep: "On top of the regular list, we clean baseboards, door frames, trim, switch plates, vent covers and reachable fan blades and fixtures, with extra time on shower glass and tile. Original Eichlers often have wood paneling and specialty floors; tell us about them and anything you want us to skip.",
      move: "For a Sunnyvale move, the inside of every empty cabinet, drawer and closet is included with the full deep-clean list. Inside the oven and fridge and interior glass are add-ons. Book it between the outgoing movers and the incoming furniture, with water and power on."
    },
    faqs: [
      {
        question: "Do you clean the atrium in an Eichler?",
        answer: "The house, yes: floors and reachable surfaces in the rooms you book. An open-air atrium is outdoor space, so it isn't part of a house cleaning."
      },
      {
        question: "Do you offer biweekly cleaning in Sunnyvale?",
        answer: "Yes: weekly, every two weeks or monthly, with no contract. You can pause or stop with 24 hours' notice before your next visit."
      },
      {
        question: "Can you clean before we move in?",
        answer: "Yes. The home should be empty, with water and power on. If painters or flooring crews are still working, book after they're done; their dust settles on everything."
      },
      {
        question: "Our house was rebuilt. Which square footage do we use?",
        answer: "Today's living space, the number on your listing or appraisal. That's what the price is based on."
      }
    ],
    neighborhoodNotes: [
      {
        title: "Cherry Chase",
        body: "About 2,500 homes from the 1950s and '60s, mostly Eichlers and ranches. If the house has been added onto, put in today's square footage."
      },
      {
        title: "Birdland and Raynor Park (94087)",
        body: "Original single-story houses next to two-story rebuilds near Apple Park. Price a rebuild by what's there now: today's bedrooms, bathrooms and square footage."
      },
      {
        title: "Eichler tracts",
        body: "About 1,100 Eichlers across the city, with glass walls and atriums. Decide on interior window glass when you book."
      },
      {
        title: "Heritage District",
        body: "Some of Sunnyvale's oldest homes, on the streets around Murphy Avenue. Tell us about original floors or anything fragile."
      }
    ]
  },
  {
    market: "southbay",
    slug: "campbell",
    name: "Campbell",
    county: "Santa Clara County",
    areaType: "West Valley",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for Campbell homes, condos and townhomes.",
    neighborhoods: [
      "Downtown Campbell",
      "Pruneyard area",
      "San Tomas",
      "Campbell Village"
    ],
    nearbyAreas: [
      "San Jose",
      "Los Gatos",
      "Saratoga",
      "Santa Clara"
    ],
    localContent: "About two-thirds of Campbell's single-family homes were built between 1950 and 1979, so most of the city is ranch houses, with condos, townhomes and apartments mixed in. San Tomas is mostly ranch homes from the '50s through the '70s. Pruneyard-Dry Creek, between Bascom and Leigh, has 1950s houses near the creek trail, and some of them have been rebuilt.\n\nA small older house can take more time than its square footage suggests if the bathrooms haven't had a real cleaning in a while. Pick the condition honestly when you price it, and the first visit gets the time it needs.",
    localProof: "Regular cleaning, deep cleaning and move-outs for Campbell homes, condos and townhomes.",
    homeProfiles: [
      "Ranch houses from the 1950s through the '70s",
      "Rebuilt houses in Pruneyard-Dry Creek",
      "Condos, townhomes and apartments"
    ],
    commonJobs: [
      "Regular kitchen, bathroom and floor cleaning",
      "A deep clean for shower buildup and trim",
      "Rental turnovers and pre-sale cleans once the house is empty"
    ],
    bookingNote: "Put in your Campbell ZIP, home size and the date you want. Add stairs, parking and any key pickup so we can plan the visit.",
    serviceDetails: {
      deep: "Extra time goes to baseboards, door frames, trim, switch plates, vent covers, reachable fan blades and fixtures, on top of the regular kitchen and bathroom work. Pick the condition that matches the house: a compact home with neglected bathrooms is still a deep clean.",
      move: "The inside of every empty cabinet, drawer and closet is included for a Campbell move-out or move-in. Appliance interiors and interior windows are add-ons. Have the house cleared and entry arranged before the appointment; we don't pack, haul or move furniture."
    },
    faqs: [
      {
        question: "Can a small Campbell house need a deep clean?",
        answer: "Yes. Size is only part of it. Bathroom buildup, kitchen grease and how long it's been since a real cleaning decide whether it's a regular visit or a deep clean."
      },
      {
        question: "Do you clean condos and townhomes?",
        answer: "Yes. Put in the square footage and bathrooms for your price, then add stairs, gate codes and guest parking to the booking."
      },
      {
        question: "Are cabinets included for a rental turnover?",
        answer: "On a move-out or move-in, yes: the inside of every empty cabinet, drawer and closet. On a regular or deep clean, cabinet interiors are an add-on and need to be emptied first."
      },
      {
        question: "Can you clean before we list the house?",
        answer: "Yes. Book it after your things are out and before listing photos. If the house is staged, tell us; we clean around staging furniture and don't move anything heavy."
      }
    ],
    neighborhoodNotes: [
      {
        title: "San Tomas",
        body: "Mostly ranch homes from the '50s through the '70s, plus some townhomes. A kept-up one-level house like this is a good fit for every-other-week visits."
      },
      {
        title: "Pruneyard-Dry Creek",
        body: "1950s houses between Bascom and Leigh, some of them rebuilt. Price a rebuild by today's square footage."
      },
      {
        title: "Condos and townhomes",
        body: "Stairs, gates and guest parking go in your booking."
      }
    ]
  },
  {
    market: "southbay",
    slug: "saratoga",
    name: "Saratoga",
    county: "Santa Clara County",
    areaType: "West Valley",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for Saratoga homes, priced on the whole floor plan.",
    neighborhoods: [
      "Saratoga Village",
      "Golden Triangle",
      "Quito",
      "Saratoga Woods"
    ],
    nearbyAreas: [
      "Cupertino",
      "Los Gatos",
      "Campbell",
      "San Jose"
    ],
    localContent: "The Golden Triangle, between Saratoga Avenue, Saratoga-Sunnyvale Road and Cox Avenue, is mostly four-bedroom ranch homes on quarter-acre lots, and more of them get replaced by bigger custom houses every year. The Village along Big Basin Way has newer condo and townhouse complexes within walking distance of the shops. West of Saratoga-Sunnyvale Road and up into the hills, lots get bigger: Parker Ranch has a one-acre minimum, and the estates off Mount Eden Road are larger still.\n\nWith a bigger home, we need the whole picture. Put in the full square footage and every bathroom, and mention a guest house or second unit if you want it cleaned. If your home is bigger than the online calculator prices, we'll quote it directly.",
    localProof: "Regular cleaning, deep cleaning and move-outs for Saratoga homes, priced on the whole floor plan.",
    homeProfiles: [
      "Four-bedroom ranch homes and custom rebuilds in the Golden Triangle",
      "Homes in Saratoga Woods, Brookview and Blue Hills",
      "Condos and townhomes near the Village",
      "Larger homes on big lots in Parker Ranch and the hills"
    ],
    commonJobs: [
      "Every-other-week cleaning across a big single-level floor plan",
      "A first deep clean for trim, fixtures and floor edges",
      "Empty-home cleaning before a sale or move-in"
    ],
    bookingNote: "Put in your Saratoga ZIP, total square footage, bathrooms and any separate spaces. Larger homes may get a personal quote.",
    serviceDetails: {
      deep: "We need the whole floor plan, not just the bedroom count. A Saratoga deep clean covers the regular list plus baseboards, door frames, trim, switch plates, vent covers and reachable fan blades and fixtures. High ceilings and chandeliers get cleaned as far as normal reach goes; we don't do ladder work. Tell us about custom finishes and the rooms that matter most to you.",
      move: "Clear the cabinets and closets and tell us every space you want cleaned, including a guest unit. We clean inside every empty cabinet, drawer and closet along with the full deep-clean list. Ovens, fridges, interior windows and extra spaces need to be in the booking so the price covers them."
    },
    faqs: [
      {
        question: "How do you price a bigger Saratoga home?",
        answer: "Bedrooms, bathrooms, total square footage and condition, the same as any home. If yours is bigger than the online calculator goes, send us the details and we'll quote it directly instead of guessing."
      },
      {
        question: "Do you clean a guest house or second unit?",
        answer: "Yes, if it's in the booking. Tell us its size and bathrooms so it's priced in."
      },
      {
        question: "Do you clean high fixtures or use ladders?",
        answer: "We clean what's within normal reach. Ladder work, high windows and fixtures above reach aren't included, so mention them before you book."
      },
      {
        question: "Can you use our products on custom surfaces?",
        answer: "Yes. Leave out what you want used on stone, wood or specialty finishes and say so in your booking notes. Restoration and refinishing aren't part of a cleaning."
      }
    ],
    neighborhoodNotes: [
      {
        title: "Golden Triangle",
        body: "Four-bedroom ranch homes on quarter-acre lots, plus a growing number of custom rebuilds. A rebuild gets priced on today's square footage."
      },
      {
        title: "Saratoga Village",
        body: "Condos and townhomes near Big Basin Way. Note the stairs and where to park."
      },
      {
        title: "Parker Ranch and the hills",
        body: "Bigger homes on big lots, often with long driveways. If the calculator can't price yours, we quote it directly."
      }
    ]
  },
  {
    market: "southbay",
    slug: "los-gatos",
    name: "Los Gatos",
    county: "Santa Clara County",
    areaType: "West Valley",
    isPrimary: true,
    description: "Regular cleaning, deep cleaning and move-outs for Los Gatos homes.",
    neighborhoods: [
      "Downtown Los Gatos",
      "Blossom Hill",
      "Los Gatos-Almaden corridor",
      "Shannon Road area"
    ],
    nearbyAreas: [
      "Saratoga",
      "Campbell",
      "San Jose",
      "Cupertino"
    ],
    localContent: "Downtown Los Gatos has the Almond Grove historic district: Victorian, Craftsman and bungalow-era houses on the old almond orchard just west of North Santa Cruz Avenue. Houses that old usually have original woodwork and older floors, and both take care. Along Blossom Hill Road, east of Los Gatos Boulevard, it's mostly 1950s and '60s ranch tracts and hillside lots. Off Shannon Road the foothill lots run an acre or more.\n\nThe 95033 ZIP reaches up into the Santa Cruz Mountains, so a Los Gatos mailing address doesn't always mean it's on our route. Put in your ZIP when you check your price; for a mountain address, we'll confirm the route with you before booking.",
    localProof: "Regular cleaning, deep cleaning and move-outs for Los Gatos homes.",
    homeProfiles: [
      "Victorian, Craftsman and bungalow-era houses in Almond Grove",
      "1950s and '60s ranch homes along Blossom Hill Road",
      "Foothill homes around Shannon Road"
    ],
    commonJobs: [
      "Weekly or biweekly cleaning",
      "Detail cleaning for original woodwork, fixtures and bathroom buildup",
      "Move-in cleaning with empty cabinets and closets"
    ],
    bookingNote: "Put in your Los Gatos ZIP, home size and the date you want, plus driveway, stairs and access notes. Mountain addresses get a route check first.",
    serviceDetails: {
      deep: "A Los Gatos deep clean pairs the regular kitchen, bathroom, dusting and floor work with the detail list: baseboards, door frames, trim, switch plates, vent covers and reachable fan blades. In an Almond Grove house, the original woodwork is a big part of that. We clean it; we don't refinish it. Cabinet, oven and fridge interiors are add-ons.",
      move: "Plan an empty-home clean after the movers, with utilities on and entry arranged. The inside of every empty cabinet, drawer and closet is included. Add appliance interiors or window work when you book, and pick a time ahead of your walkthrough or furniture delivery."
    },
    faqs: [
      {
        question: "Do you clean homes up in the mountains?",
        answer: "Some of them. 95033 covers a lot of the Santa Cruz Mountains, so we check the exact address and route before booking."
      },
      {
        question: "Do you clean original woodwork in older homes?",
        answer: "Yes. Reachable trim, doors and built-ins get dusted and wiped. Tell us about anything fragile or any product to avoid. We don't strip, refinish or repair wood."
      },
      {
        question: "Can you clean before our furniture is delivered?",
        answer: "That's the easiest time to do it. Pick an arrival window before the delivery date when you book."
      },
      {
        question: "Do you clean homes with pets?",
        answer: "Yes. Tell us about pets when you book, and if there's a lot of hair, ask for extra pet hair detail so the visit has the time."
      }
    ],
    neighborhoodNotes: [
      {
        title: "Almond Grove",
        body: "The historic district west of North Santa Cruz Avenue. Original woodwork and older floors; tell us about anything fragile."
      },
      {
        title: "Blossom Hill",
        body: "Mostly 1950s and '60s ranch tracts, plus hillside lots near Blossom Hill Park."
      },
      {
        title: "Shannon Road area",
        body: "Foothill homes on lots of an acre or more. Driveway access and stairs go in your booking notes."
      },
      {
        title: "Mountain addresses (95033)",
        body: "Up into the Santa Cruz Mountains. We confirm the route before booking."
      }
    ]
  }
];

export const sanJoseServiceContent = {
  "standard-cleaning": {
    title: "Weekly & Biweekly Cleaning in San Jose",
    description: "Regular house cleaning in San Jose: kitchen, bathrooms, dusting and floors, one time or weekly, biweekly or monthly. No contract. See your price online.",
    h1: "Regular house cleaning in San Jose",
    intro: "Kitchen, bathrooms, dusting and floors for a San Jose home that's kept up. One visit, or weekly, every two weeks or monthly. No contract.",
    localHeading: "Regular cleaning for San Jose homes.",
    lead: "A regular visit keeps a lived-in home in shape: counters, stovetop and sink, bathrooms top to bottom, dusting in every room you book, and floors vacuumed and mopped.",
    local: "In a Cambrian ranch that's one level of kitchen, bathrooms and floors. In a townhome, add the stairs and the parking situation to your notes. If pets shed a lot, ask for extra pet hair detail when you book so the visit has time for it.\n\nIf it's been a while since the home had a real cleaning, start with a deep clean and move to regular visits after. You'll see both prices before you choose.",
    faqs: [
      {
        question: "Is a regular clean enough for a first visit?",
        answer: "If the home's been kept up, yes. If there's heavy shower buildup, kitchen grease or dusty baseboards, start with a deep clean. We'd rather say that up front than book a visit without enough time for the house."
      },
      {
        question: "Can I do every other week instead of weekly?",
        answer: "Yes. Weekly, every two weeks and monthly are all options, and you'll see the price for the one you pick."
      },
      {
        question: "Is there a contract?",
        answer: "No. You pay cleaning to cleaning. To pause or stop, let us know at least 24 hours before your next visit."
      },
      {
        question: "What isn't included?",
        answer: "Laundry, dishes, making beds, organizing and moving heavy furniture. Inside the oven, fridge and cabinets and interior windows are add-ons you can pick when you book."
      }
    ],
    quoteIntro: "Regular cleaning is already selected. Add your ZIP, home size and how often you want us, and you'll see your price before you book."
  },
  "deep-cleaning": {
    title: "Deep House Cleaning in San Jose, CA",
    description: "Deep cleaning in San Jose: baseboards, door frames, vents, fan blades, shower glass and tile, on top of a regular clean. See your price before you book.",
    h1: "Deep cleaning in San Jose",
    intro: "Everything in a regular clean, plus the baseboards, door frames, vents, fan blades and bathroom buildup a regular visit doesn't get to.",
    localHeading: "Deep cleaning for San Jose homes.",
    lead: "Much of San Jose's tap water is hard, so the shower is usually where a lot of the time goes: mineral spots on the glass and buildup on the tile and around the fixtures.",
    local: "Then it's the detail list, room by room: baseboards, door frames and trim, switch plates, vent covers, reachable fan blades and light fixtures, window sills, and the edges and corners of every floor.\n\nHow long that takes depends on the house. A Willow Glen bungalow may still have its original tile and trim. A bigger Almaden Valley home has more bathrooms. A downtown condo has less floor but the same kitchen and bathroom work. Pick the condition that matches your home and the price accounts for it.",
    faqs: [
      {
        question: "What does a deep clean include beyond a regular one?",
        answer: "Baseboards, door frames and trim, switch plates, vent covers, reachable fan blades and light fixtures, window sills, floor edges and corners, and extra time on shower glass, tile, grout and kitchen buildup. The full room-by-room list is on this page."
      },
      {
        question: "Will it get hard-water spots off the shower glass?",
        answer: "Normal mineral buildup, yes. Spots that have sat for years can etch the glass, and etching doesn't come off with cleaning. Text us a photo if you want to know before you book."
      },
      {
        question: "Are the oven, fridge and cabinets included?",
        answer: "Not in the base price. Inside the oven, inside the fridge, emptied cabinets and interior window glass are add-ons. Pick them when you book and they're in your price."
      },
      {
        question: "How long does a deep clean take?",
        answer: "It depends on the size and condition of the home. You'll pick an arrival window when you book."
      },
      {
        question: "Should I start with a deep clean before regular visits?",
        answer: "If there's buildup in the bathrooms or kitchen, yes. After that, regular visits keep it there."
      }
    ],
    quoteIntro: "Deep cleaning is already selected. Add your ZIP and home size and you'll see your price before you book."
  },
  "move-out-cleaning": {
    title: "Move-Out & Move-In Cleaning in San Jose",
    description: "Move-out and move-in cleaning in San Jose, with the inside of every empty cabinet, drawer and closet included. See your price before you book.",
    h1: "Move-out and move-in cleaning in San Jose",
    intro: "Empty-home cleaning before you hand over the keys or move your furniture in. The inside of every empty cabinet, drawer and closet is included.",
    localHeading: "Move-out cleaning for San Jose homes.",
    lead: "A move-out clean covers the whole empty home: the full deep-clean list, plus the inside of every cabinet, drawer and closet, closet shelves and rods, and blinds where they're safe to dust.",
    local: "Inside the oven and fridge, interior window glass and tracks, and garage or patio sweeping are add-ons. Pick them when you book and they're in the price, not added on the day.\n\nTiming is the main thing to get right. Book it after the movers are done, with the water and power still on, and before the walkthrough or the new furniture. For a downtown or North San Jose apartment, reserve the elevator and sort out parking before the appointment. For a house, put in every bathroom and the full square footage, not just the rooms in the listing photos.",
    faqs: [
      {
        question: "When should I schedule it?",
        answer: "After everything is out and before your walkthrough or furniture delivery. Pick an arrival window ahead of that date when you book."
      },
      {
        question: "Will this get my deposit back?",
        answer: "Nobody can promise what a landlord decides. California lets a landlord deduct the cleaning needed to bring a unit back to how clean it was when you moved in, and that's what the move-out list covers: kitchen, bathrooms, inside every cabinet and closet, baseboards and floors. Damage, paint and carpet wear aren't cleaning, and we don't repair them."
      },
      {
        question: "What's included in the kitchen?",
        answer: "Counters, sink, backsplash, stovetop, range hood and filter, the dishwasher inside and out, an empty microwave, and every empty cabinet and drawer. Inside the oven and fridge are add-ons."
      },
      {
        question: "Do you haul trash or leftover things?",
        answer: "No. The home needs to be empty before we start. We clean; we don't haul, pack or move furniture."
      },
      {
        question: "Do you do move-in cleaning too?",
        answer: "Yes, same list. It's easiest before your boxes and furniture arrive."
      }
    ],
    quoteIntro: "Move-out cleaning is already selected. Add your ZIP and home size and you'll see your price before you book."
  }
} as const;
