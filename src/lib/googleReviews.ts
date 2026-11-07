// Verbatim Google reviews from the New Star Business Profile
// (https://www.google.com/maps?cid=13545152036473270457), read 2026-11-06.
// Every excerpt segment is an exact substring of the recorded full text.
// Names follow the site's first-name + initial presentation convention.
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
    id: "nicholas-m",
    author: "Nicholas M.",
    label: "House cleaning",
    rating: 5,
    topics: ["home", "standard"],
    excerpt: ["Excellent, professional service. Muñeca does a wonderful job and is very kind."],
    text: "Excellent, professional service. Muñeca does a wonderful job and is very kind. Would highly recommend.",
  },
  {
    id: "miranda-g",
    author: "Miranda G.",
    label: "House cleaning",
    rating: 5,
    topics: ["home"],
    excerpt: ["Great service and very professional and did an amazing job"],
    text: "Great service and very professional and did an amazing job",
  },
  {
    id: "joel-s",
    author: "Joel S.",
    label: "Deep cleaning",
    rating: 5,
    topics: ["deep"],
    excerpt: ["They deep-cleaned up my huge house", "Highly recommended!"],
    text: "Great service! They deep-cleaned up my huge house, including a really good job of washing the carpets. Highly recommended!",
  },
  {
    id: "merle-f",
    author: "Merle F.",
    label: "Move-out cleaning",
    rating: 5,
    topics: ["move", "home"],
    excerpt: ["Selected New Star because they have a checklist that specifies what they clean instead of me having to ask or wonder.", "After they left, I discovered a couple of issues and Angel (company contact) sent someone back to remedy the issues at no additional cost.", "We had a very large house that needed a move out clean and I was very happy."],
    text: "Selected New Star because they have a checklist that specifies what they clean instead of me having to ask or wonder. They also have a flat rate and satisfaction guaranteed policy. For me this is preferable to surprise charges or additional charges for incomplete or unsatisfactory cleaning. After they left, I discovered a couple of issues and Angel (company contact) sent someone back to remedy the issues at no additional cost. That's not something you will find with most cleaning companies. We had a very large house that needed a move out clean and I was very happy.",
  },
  {
    id: "daisy-m",
    author: "Daisy M.",
    label: "House cleaning",
    rating: 5,
    topics: ["standard"],
    excerpt: ["They did an amazing job would always keep coming back to them."],
    text: "They did an amazing job would always keep coming back to them. Definitely recommend!",
  },
  {
    id: "daumdatta",
    author: "daumdatta",
    label: "Deep cleaning",
    rating: 5,
    topics: ["deep", "standard", "home"],
    excerpt: ["We booked a deep cleaning for a 3-bedroom, 2-bath home (around 1,200 sq ft) and were amazed at how spotless everything turned out.", "Margarita's attention to detail stood out, she didn't miss a thing.", "The service was so good that we set her up to come back for monthly cleanings."],
    text: "We booked a deep cleaning for a 3-bedroom, 2-bath home (around 1,200 sq ft) and were amazed at how spotless everything turned out. Every surface was cleaned with care, the windows and tracks were sparkling, and the fridge and oven looked like new. Margarita's attention to detail stood out, she didn't miss a thing. The house felt fresh and truly deep cleaned, not just surface-level. The service was so good that we set her up to come back for monthly cleanings. Reliable, thorough, and worth every cent.",
  },
];

export function reviewsFor(topic: ReviewTopic, count = 3): GoogleReview[] {
  const matching = googleReviews.filter((review) => review.topics.includes(topic));
  const rest = googleReviews.filter((review) => !review.topics.includes(topic));
  return [...matching, ...rest].slice(0, count);
}
