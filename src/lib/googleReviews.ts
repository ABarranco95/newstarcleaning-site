// Verbatim Google reviews from the New Star Business Profile
// (https://www.google.com/maps?cid=12575787905603463321), read 2026-09-22.
// `text` is the full public review exactly as posted; every `excerpt` segment
// must be an exact substring of it (scripts/verify-trust-proof.mjs enforces
// this). Author names are shortened to first name + initial. Never edit a
// quote, merge reviews, or add one that is not on the live profile.
export type ReviewTopic = "home" | "standard" | "deep" | "move";

export type GoogleReview = {
  id: string;
  author: string;
  label: string;
  rating: 5;
  topics: ReviewTopic[];
  excerpt: string[];
  text: string;
};

export const googleReviews: GoogleReview[] = [
  {
    id: "daviana-j",
    author: "Daviana J.",
    label: "Move-out cleaning",
    rating: 5,
    topics: ["move"],
    excerpt: ["The process was very easy and staff was very kind, helpful and communicative.", "Even though they were a bit higher in price than others, I truly believe it was worth it."],
    text: "I needed a move out cleaning done and went with New Star Cleaning. The process was very easy and staff was very kind, helpful and communicative. The ladies arrived promptly at the start time and went above and beyond! Even though they were a bit higher in price than others, I truly believe it was worth it. Highly recommend and will work with them again if ever needed in the future!",
  },
  {
    id: "daniel",
    author: "Daniel",
    label: "Deep cleaning",
    rating: 5,
    topics: ["deep", "home"],
    excerpt: ["You get what you pay for. I’ve hired cheaper cleaners before who just wiped around things, but New Star actually scrubbed. The baseboards look new."],
    text: "You get what you pay for. I’ve hired cheaper cleaners before who just wiped around things, but New Star actually scrubbed. The baseboards look new. Angel was professional and sent a reminder before the appointment which was helpful. Definitely worth it for the quality of the deep clean.",
  },
  {
    id: "joseph-b",
    author: "Joseph B.",
    label: "Move-in cleaning",
    rating: 5,
    topics: ["move", "home"],
    excerpt: ["Angel and Muneca were very professional and easy to work with.", "Was not able to be present during the time of cleaning but they had great communication throughout the entire process.", "They list everything they will do and leave no question about the work being done."],
    text: "Angel and Muneca were very professional and easy to work with. Got my appointment scheduled for a move in cleaning next day. Was not able to be present during the time of cleaning but they had great communication throughout the entire process. They list everything they will do and leave no question about the work being done. Happy with the service and would recommend",
  },
  {
    id: "merle-f",
    author: "Merle F.",
    label: "Large home",
    rating: 5,
    topics: ["move", "home"],
    excerpt: ["Selected New Star because they have a checklist that specifies what they clean", "After they left, I discovered a couple of issues and Angel (company contact) sent someone back to remedy the issues at no additional cost."],
    text: "I got cleaning estimates from several sources. Selected New Star because they have a checklist that specifies what they clean and they have a satisfaction guaranteed policy. I have had bad experiences with moving cleans that were not up to my expectations, so the satisfaction guarantee was important to me, especially because it's included in the flat rate. I knew what I was getting for my money. The cleaning team worked hard on my large house and made some trouble spots look new again. After they left, I discovered a couple of issues and Angel (company contact) sent someone back to remedy the issues at no additional cost. I recommend New Star cleaning.",
  },
  {
    id: "kondor-m",
    author: "Kondor M.",
    label: "House cleaning",
    rating: 5,
    topics: ["standard", "deep", "home"],
    excerpt: ["I’ve tried a couple cleaners and this is the first time my kitchen actually looked “done.” Stove and sink were spotless."],
    text: "I’ve tried a couple cleaners and this is the first time my kitchen actually looked “done.” Stove and sink were spotless.",
  },
  {
    id: "kayla-c",
    author: "Kayla C.",
    label: "First cleaning service",
    rating: 5,
    topics: ["standard", "home"],
    excerpt: ["This was the first time we’ve hired anyone for a clean and I wish I did it sooner!", "The team did such a good job and even addressed any concerns I had after the clean."],
    text: "This was the first time we’ve hired anyone for a clean and I wish I did it sooner! The team did such a good job and even addressed any concerns I had after the clean. I really appreciate the attention to detail & will be using them in the future!",
  },
  {
    id: "anmol-r",
    author: "Anmol R.",
    label: "House cleaning",
    rating: 5,
    topics: ["standard", "deep"],
    excerpt: ["The cleaner asked what I wanted them to focus on first, which I appreciated. Hit the bathrooms and baseboards like I asked."],
    text: "The cleaner asked what I wanted them to focus on first, which I appreciated. Hit the bathrooms and baseboards like I asked.",
  },
  {
    id: "daumdatta",
    author: "daumdatta",
    label: "Deep cleaning, then monthly",
    rating: 5,
    topics: ["deep", "standard"],
    excerpt: ["We booked a deep cleaning for a 3-bedroom, 2-bath home (around 1,200 sq ft) and were amazed at how spotless everything turned out.", "The service was so good that we set her up to come back for monthly cleanings."],
    text: "We booked a deep cleaning for a 3-bedroom, 2-bath home (around 1,200 sq ft) and were amazed at how spotless everything turned out. Every surface was cleaned with care, the windows and tracks were sparkling, and the fridge and oven looked like new. Margarita’s attention to detail stood out, she didn’t miss a thing. The house felt fresh and truly deep cleaned, not just surface-level. The service was so good that we set her up to come back for monthly cleanings. Reliable, thorough, and worth every cent.",
  },
];

export function reviewsFor(topic: ReviewTopic, count = 3): GoogleReview[] {
  const matching = googleReviews.filter((review) => review.topics.includes(topic));
  const rest = googleReviews.filter((review) => !review.topics.includes(topic));
  return [...matching, ...rest].slice(0, count);
}
