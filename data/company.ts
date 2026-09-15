export interface CompanyConfig {
  name: string;
  googleMapsUrl: string;
  googleReviewsUrl: string;
  phone: string;
  whatsapp: string;
  website: string;
  address: string;
  logoUrl?: string;
}

const activeStudio = process.env.ACTIVE_STUDIO || 'classy-craft';
let profile: any = {};
try {
  profile = require(`@/data/studios/${activeStudio}.json`);
} catch (e) {
  console.warn(`Could not load studio profile for ${activeStudio}, using fallback.`);
}

export const companyTheme = profile.theme || {};

export const companyConfig: CompanyConfig = {
  name: profile.name || "Classy Craft Interiors",
  googleMapsUrl: profile.googleMapsUrl || "#", 
  googleReviewsUrl: profile.googleReviewsUrl || "#", 
  phone: profile.phone || "+91 70580 88895", 
  whatsapp: profile.whatsapp || "917058088895",
  website: profile.website || "www.classycraftinteriors.com",
  address: profile.address || "Studio address — update before launch",
  logoUrl: profile.logo || "/assets/logo-transparent.png" 
};

export interface CredibilityStat {
  label: string;
  value: string;
}

export const credibilityStats: CredibilityStat[] = [
  { label: "Years in Business", value: "12+" },
  { label: "Homes Completed", value: "250+" },
  { label: "Commercial Projects", value: "45+" },
  { label: "Industry Awards", value: "14" }
];

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  text: string;
}

export const googleReviews: Review[] = profile.reviews || [
  {
    id: "r1",
    author: "Aditi S.",
    rating: 5,
    text: "Working with the team was a seamless experience. They understood our lifestyle and translated it into a home that is both beautiful and highly functional. The attention to detail in the cabinetry is outstanding."
  },
  {
    id: "r2",
    author: "Rahul M.",
    rating: 5,
    text: "Transparent pricing, clear timelines, and flawless execution. They transformed our 3BHK into a serene, modern space without any of the typical contractor headaches."
  },
  {
    id: "r3",
    author: "Priya K.",
    rating: 5,
    text: "Their design philosophy really shows in the final result. Everything feels considered and built to last. It’s a quiet kind of luxury that we appreciate every single day."
  }
];

export interface Faq {
  question: string;
  answer: string;
}

export const homeownerFaqs: Faq[] = [
  {
    question: "How much will my home interior actually cost?",
    answer: "Costs depend entirely on the scope, materials, and specific requirements of your project. We provide a detailed, transparent, itemized estimate after our initial consultation, ensuring you understand exactly what you are paying for before any commitment."
  },
  {
    question: "How long will the entire interior project take?",
    answer: "A standard apartment interior typically takes between 45 to 90 days from finalizing the design to handover. Larger villas or complex custom builds require more time. We provide a clear project schedule and stick to it."
  },
  {
    question: "How do I know the quoted price won’t increase unexpectedly?",
    answer: "Our pricing is transparent and fixed for the approved scope of work. Price changes only occur if you explicitly request a design change or material upgrade during the execution phase."
  },
  {
    question: "What happens if there is a problem with the design, materials, or execution?",
    answer: "We take full accountability for our work. All our modular woodwork and hardware come with comprehensive warranties, and our dedicated project managers ensure strict quality control throughout the build phase."
  },
  {
    question: "How involved do I need to be during the project?",
    answer: "Once the design is approved, our team handles all procurement, site management, and execution. You will receive regular progress updates, meaning you can be as hands-off as you prefer while retaining complete peace of mind."
  }
];
