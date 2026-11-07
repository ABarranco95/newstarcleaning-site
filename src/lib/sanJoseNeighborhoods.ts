export interface SanJoseNeighborhood {
  slug: string;
  name: string;
  zipLabels: string[];
  title: string;
  description: string;
  intro: string[];
  planning: { title: string; body: string }[];
  serviceNotes: { slug: "standard-cleaning" | "deep-cleaning" | "move-out-cleaning"; title: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

// ZIPs describe the neighborhoods; only Apex determines address coverage.
// Housing facts: C1/COPY-DECK.md §2.1 and its verified local-source list.
export const sanJoseNeighborhoods: SanJoseNeighborhood[] = [
  {
    slug: "cambrian",
    name: "Cambrian",
    zipLabels: ["95118", "95124"],
    title: "House Cleaning in Cambrian, San Jose",
    description: "House cleaning for Cambrian’s mid-century ranch homes in San Jose. Regular, deep and move-out cleaning. See your price before you book.",
    intro: [
      "Cambrian’s housing is mostly one-story ranch homes from the 1950s and ’60s. In a home on one level, the cleaning time goes into the kitchen, bathrooms and floors rather than flights of stairs. The floor plan may be compact, but a bathroom with shower buildup still needs detail time.",
      "We clean occupied homes on a regular schedule, do deep cleans when there’s buildup, and clean empty homes before or after a move. The right visit depends on the condition of your home, not its age. Tell us about original wood floors, remodeled stone counters and any products you want us to avoid.",
      "Cambrian covers 95118 and 95124. Put in your ZIP when you check your price. After that, bedrooms, bathrooms, today’s square footage, condition, how often we come and any add-ons set the price.",
    ],
    planning: [
      { title: "Price the home as it is now", body: "Use the full living space and every bathroom. If a ranch has been added onto or remodeled, use today’s square footage rather than the original floor plan. Include any separate space you want cleaned when you ask for a quote." },
      { title: "Give surfaces the right care", body: "Original wood and newer stone can be in the same house. Tell us what the surfaces are made of and leave any specific care instructions in your booking. Cleaning does not refinish wood, restore stone or remove permanent etching." },
      { title: "Make the first visit useful", body: "Clear counters, sinks and loose belongings so we can reach the surfaces. If the shower glass, kitchen grease or baseboards need a reset, choose a deep clean instead of trying to fit that work into a regular visit." },
    ],
    serviceNotes: [
      { slug: "standard-cleaning", title: "Regular visits for a kept-up ranch", body: "Kitchen, bathrooms, reachable dusting and floors, once or weekly, every two weeks or monthly. For a one-level Cambrian home, this keeps the rooms you use every day in shape between visits. Extra pet hair detail can be added when you book." },
      { slug: "deep-cleaning", title: "A deep clean for the detail work", body: "The regular room list plus baseboards, door frames, trim, switch plates, vent covers and reachable fan blades and light fixtures, with extra time on kitchen and bathroom buildup. Old shower spots can be etching rather than removable residue; text us a photo if you’re unsure." },
      { slug: "move-out-cleaning", title: "An empty-home clean between moves", body: "The full deep-clean list plus the inside of every empty cabinet, drawer and closet. Book it after belongings and movers are out, with water and power on. Oven and fridge interiors and interior windows are add-ons picked before the visit." },
    ],
    faqs: [
      { question: "Do you clean both 95118 and 95124?", answer: "Yes, both. Put in your ZIP when you check your price, then pick an open arrival window." },
      { question: "Does a small Cambrian ranch need a deep clean?", answer: "It can. Size and condition are different things. Shower buildup, kitchen grease and neglected baseboards may need a deep clean even in a compact home. A kept-up home can start with a regular visit." },
      { question: "Are cabinet interiors included?", answer: "On a move-in or move-out clean, the inside of every empty cabinet, drawer and closet is included. On a regular or deep clean, cabinet interiors are an add-on and must be emptied first." },
      { question: "What if something on the checklist is missed?", answer: "Tell us within 24 hours. If it was part of the cleaning you booked, we come back and make it right at no charge." },
    ],
  },
  {
    slug: "almaden-valley",
    name: "Almaden Valley",
    zipLabels: ["95120"],
    title: "House Cleaning in Almaden Valley",
    description: "House cleaning in Almaden Valley, San Jose, priced on the whole home. Regular, deep and empty-home cleaning. See your price before you book.",
    intro: [
      "Almaden Valley has larger homes on bigger lots, many built in the 1970s and ’80s, along with gated communities such as the Villas of Almaden. A bigger floor plan usually means more floor area and more bathrooms to clean. Bedroom count alone does not describe that work.",
      "For a 95120 home, put in the full living space and every bathroom, including the rooms you use less often. If you want a guest house or separate unit cleaned, identify it before booking so it is part of the quote. Homes beyond the online calculator’s size limit get a personal quote rather than a guessed total.",
      "Regular visits handle the kitchen, bathrooms, dusting and floors. A first deep clean adds the trim, baseboards, fixtures and buildup a maintenance visit does not get to. Tell us about stone, wood, custom finishes and anything fragile, as well as gate and driveway access, so the visit fits the home.",
    ],
    planning: [
      { title: "Every bathroom counts", body: "A home with several bathrooms takes more time even when some bedrooms are unused. Include the full bathroom count and current square footage. Choose the condition that matches the house rather than leaving out rooms to reach a lower online price." },
      { title: "Reachable work, not ladder work", body: "We clean fan blades and light fixtures within normal reach. High chandeliers, windows above reach and other ladder work are not included. Mention them before booking so the task list is clear." },
      { title: "Arrange access before arrival", body: "For a gated community such as the Villas of Almaden, put entry instructions and guest parking in the booking. Tell us about stairs, a separate unit or a long driveway. Water and power need to stay on for an empty-home clean." },
    ],
    serviceNotes: [
      { slug: "standard-cleaning", title: "Regular cleaning across the floor plan", body: "Kitchen, bathrooms, reachable dusting and floors on a weekly, every-other-week or monthly schedule, or for one visit. There is no contract. You pay cleaning to cleaning and can pause or stop with at least 24 hours’ notice before the next visit." },
      { slug: "deep-cleaning", title: "Detail time in every bathroom", body: "The regular room list plus baseboards, door frames, trim, switch plates, vent covers and reachable fixtures, with extra time on shower glass, tile and buildup. In a larger Almaden home, include every bathroom so the quote covers the work rather than only the main suite." },
      { slug: "move-out-cleaning", title: "Before a sale or move-in", body: "We clean the empty home, including every empty cabinet, drawer and closet, on top of the full deep-clean list. Tell us about all included living spaces. Add oven, fridge or interior window work when you book, and schedule after the movers and before the walkthrough or delivery." },
    ],
    faqs: [
      { question: "How do you price a larger Almaden home?", answer: "The property’s ZIP, bedrooms, bathrooms, full square footage, condition and requested extras set the price. If the home is larger than the online calculator supports, send us its details for a personal quote." },
      { question: "Can you clean a guest house too?", answer: "Yes, if it is included in the booking. Tell us its square footage and bathrooms so the quote covers that space as well as the main home." },
      { question: "Do you clean high chandeliers or use ladders?", answer: "No ladder work. We clean fixtures within normal reach. Tell us about high or hard-to-reach areas before you book so the limits are clear." },
      { question: "Can you work with gate and entry instructions?", answer: "Yes. Add the gate, guest-parking and entry details to your booking, along with instructions for locking up. Arrange any community access before the appointment." },
    ],
  },
  {
    slug: "west-san-jose",
    name: "West San Jose",
    zipLabels: ["95129", "95130"],
    title: "House Cleaning in West San Jose, CA",
    description: "House cleaning in West San Jose for Country Lane and Happy Valley ranches and remodeled homes. See your price and the full scope before you book.",
    intro: [
      "Country Lane and Happy Valley are among West San Jose’s late-1950s and early-1960s ranch neighborhoods. Many original homes in 95129 and 95130 are under 1,500 square feet. Remodels and additions change the floor plan, so the home you have today is the one we price.",
      "A remodeled kitchen beside an older bathroom needs two different kinds of attention. Stone counters and specialty floors need care instructions; shower residue and kitchen grease need time. Describe the current condition when you check your price rather than assuming a smaller house is automatically a regular-cleaning job.",
      "We do one-time or recurring cleaning for lived-in homes, deep cleaning when there’s buildup, and move-in or move-out cleaning once the home is empty. Put in your ZIP when you check your price.",
    ],
    planning: [
      { title: "Use today’s size", body: "Include additions and every bathroom in the current floor plan. Use the living-space figure on your listing or appraisal rather than the size of the original ranch. If there is a separate living space you want cleaned, mention it before booking." },
      { title: "Tell us about remodeled surfaces", body: "Stone countertops, wood floors and specialty finishes need the right product instructions. Let us know what to use or avoid. Stone restoration, refinishing, grout repairs and permanent etch removal are not part of a house cleaning." },
      { title: "Keep cleaning separate from building work", body: "For a move-in after renovations, book after painters, flooring crews and other dusty work are finished. A residential move-in clean is not a debris-hauling or construction-cleanup service. Arrange access and keep water and power on." },
    ],
    serviceNotes: [
      { slug: "standard-cleaning", title: "A regular visit for a maintained home", body: "Counters, stovetop and sink, bathrooms, reachable dusting and floors. Choose one visit or weekly, every two weeks or monthly cleaning. Clear loose belongings so we can reach surfaces; laundry, dishes, bed making and organizing are not included." },
      { slug: "deep-cleaning", title: "A reset for older detail areas", body: "Along with the regular work, we clean baseboards, door frames and trim, switch plates, vent covers, reachable fan blades and fixtures, window sills, and floor edges and corners. Inside the oven, fridge and cabinets are add-ons you pick when you book." },
      { slug: "move-out-cleaning", title: "The empty home before handoff", body: "The full deep-clean list plus every empty cabinet, drawer and closet interior. Add appliance interiors and interior window glass or tracks before booking so they are in the price. Schedule between the outgoing movers and the incoming furniture, with the home clear and utilities on." },
    ],
    faqs: [
      { question: "Do you clean in both 95129 and 95130?", answer: "Yes, including Country Lane and Happy Valley. Put in your ZIP when you check your price, then pick an open arrival window." },
      { question: "Our home was expanded. Which size do we enter?", answer: "Today’s full living space and bathroom count, not the original ranch floor plan. Include any additional space you want cleaned so it is accounted for in the quote." },
      { question: "Can you clean new stone next to older tile?", answer: "Yes. Tell us the materials and any product restrictions before the visit. We clean surfaces; we do not restore stone, fix grout or refinish floors." },
      { question: "Is a move-out clean a deposit guarantee?", answer: "No. We clean the agreed room-by-room list. The landlord decides deposit deductions, and damage, paint, repairs and carpet wear are not cleaning tasks." },
    ],
  },
];
