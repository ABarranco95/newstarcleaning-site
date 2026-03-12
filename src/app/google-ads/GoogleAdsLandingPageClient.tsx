"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  homesize: string;
  date: string;
  referral: string;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

function GoogleAdsForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    homesize: "",
    date: "",
    referral: "",
  });
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const utm: UTMParams = {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
    };
    setUtmParams(utm);
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        ...utmParams,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/google-ads-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
        <p className="text-gray-600">We&apos;ve received your request and will contact you within 2 hours during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Smith" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="(559) 123-4567" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
          <select id="service" name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white">
            <option value="">Select service...</option>
            <option value="standard">Standard Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="moveinout">Move-In/Move-Out</option>
          </select>
        </div>
        <div>
          <label htmlFor="homesize" className="block text-sm font-semibold text-gray-700 mb-1">Home Size</label>
          <select id="homesize" name="homesize" required value={formData.homesize} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white">
            <option value="">Select size...</option>
            <option value="1-2">1-2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4+">4+ Bedrooms</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
        <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
      </div>

      <div className="mt-4">
        <label htmlFor="referral" className="block text-sm font-semibold text-gray-700 mb-1">How did you hear about us?</label>
        <select id="referral" name="referral" value={formData.referral} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white">
          <option value="">Select...</option>
          <option value="google">Google Search</option>
          <option value="referral">Friend/Family Referral</option>
          <option value="facebook">Facebook</option>
          <option value="nextdoor">Nextdoor</option>
          <option value="yelp">Yelp</option>
          <option value="other">Other</option>
        </select>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}

      <button type="submit" disabled={isSubmitting} className="w-full mt-6 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-lg rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        {isSubmitting ? "Submitting..." : "Get My Free Quote"}
      </button>
    </form>
  );
}

function FAQAccordion() {
  const faqs = [
    { question: "Do you bring your own cleaning supplies?", answer: "Yes! Our background-checked cleaners arrive with all necessary supplies and equipment. Just provide access to water and electrical outlets." },
    { question: "Are your cleaners background-checked?", answer: "Absolutely. Every cleaner undergoes a thorough background check before joining our team. Your safety and security are our priority." },
    { question: "What's your satisfaction guarantee?", answer: "If you're not satisfied with our cleaning for any reason, simply contact us within 24 hours and we'll return to re-clean at no additional charge." },
    { question: "How soon can you come?", answer: "We offer same-week availability for most cleaning services. Book online or call (559) 785-2822 to schedule your preferred date." },
    { question: "Do you require contracts?", answer: "No contracts required! We offer one-time, weekly, bi-weekly, or monthly services with no long-term commitment. Cancel anytime." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 text-left font-semibold text-primary flex justify-between items-center hover:bg-gray-100 transition-colors">
            {faq.question}
            <span className={`text-2xl transition-transform ${openIndex === index ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
            <p className="px-6 pb-5 text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-50 md:hidden p-4">
      <div className="flex gap-3 max-w-md mx-auto">
        <a href="tel:+15597852822" className="flex-1 py-3 bg-accent text-white text-center font-bold rounded-lg flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
          Call Now
        </a>
        <a href="#booking-form" className="flex-1 py-3 bg-primary text-white text-center font-bold rounded-lg">Book Online</a>
      </div>
    </div>
  );
}

function FormWithParams() {
  return <GoogleAdsForm />;
}

export default function GoogleAdsLandingPageClient() {
  return (
    <div className="pb-24 md:pb-0">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center"><span className="text-white text-xl font-bold">★</span></div>
            <span className="text-xl font-extrabold text-primary">New Star Cleaning</span>
          </div>
          <a href="tel:+15597852822" className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
            <span className="hidden sm:inline">(559) 785-2822</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 transform rotate-12 -translate-x-1/4" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full font-semibold mb-6">
                <div className="flex">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                5.0 ★ (26 Reviews)
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">Professional House Cleaning in Fresno</h1>
              <p className="text-lg sm:text-xl opacity-90 mb-6">Background-checked cleaners, 100% satisfaction guarantee, and same-week availability. Book your clean in just 60 seconds.</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  <span className="text-sm font-medium">Background-Checked</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
                  <span className="text-sm font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  <span className="text-sm font-medium">Satisfaction Guarantee</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-primary mb-1 text-center">Get Your Free Quote</h3>
              <p className="text-gray-500 text-center mb-6 text-sm">Book online in 60 seconds — no phone call needed</p>
              <div id="booking-form">
                <Suspense fallback={<div className="animate-pulse bg-gray-100 h-64 rounded-lg"></div>}>
                  <FormWithParams />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Our Cleaning Services</h2>
            <p className="text-gray-600">Professional residential cleaning tailored to your needs. No contracts, no hassle.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-7h-2V8H8v2H6v2h2v2h2v-2h2V8h-2V6z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Standard Cleaning</h3>
              <p className="text-gray-600 text-sm">Regular weekly, bi-weekly, or monthly cleaning to keep your home consistently fresh and clean.</p>
              <div className="mt-4 text-accent font-bold"><a href="#booking-form" className="hover:underline">Get Instant Quote →</a></div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Deep Cleaning</h3>
              <p className="text-gray-600 text-sm">Thorough top-to-bottom cleaning for those times when standard cleaning isn&apos;t enough.</p>
              <div className="mt-4 text-accent font-bold"><a href="#booking-form" className="hover:underline">Get Instant Quote →</a></div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Move-In/Move-Out</h3>
              <p className="text-gray-600 text-sm">Get your deposit back or start fresh. Complete cleaning for vacating or new homes.</p>
              <div className="mt-4 text-accent font-bold"><a href="#booking-form" className="hover:underline">Get Instant Quote →</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">How It Works</h2>
            <p className="text-gray-600">Get your home cleaned in three simple steps</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold">1</div>
              <h3 className="text-lg font-bold text-primary mb-2">Book Online</h3>
              <p className="text-gray-600 text-sm">Complete our simple booking form or call (559) 785-2822. Get your instant quote in 60 seconds.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold">2</div>
              <h3 className="text-lg font-bold text-primary mb-2">We Clean</h3>
              <p className="text-gray-600 text-sm">Our background-checked professionals arrive on time and clean your home top to bottom.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold">3</div>
              <h3 className="text-lg font-bold text-primary mb-2">You Relax</h3>
              <p className="text-gray-600 text-sm">Enjoy your sparkling clean home. Not satisfied? We re-clean FREE within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-accent mb-1">500+</div>
                <div className="text-sm opacity-90">Homes Cleaned</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-accent mb-1">26</div>
                <div className="text-sm opacity-90">5-Star Reviews</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-accent mb-1">100%</div>
                <div className="text-sm opacity-90">Satisfaction</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-extrabold text-accent mb-1">24hr</div>
                <div className="text-sm opacity-90">Re-Clean Guarantee</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-accent">
              <h3 className="text-xl font-bold text-accent flex items-center gap-2 mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                Our Satisfaction Guarantee
              </h3>
              <p className="opacity-90 leading-relaxed">We&apos;re confident you&apos;ll love our service. If you&apos;re not completely satisfied with any aspect of our cleaning, simply let us know within 24 hours and we&apos;ll return to re-clean — absolutely free. Your happiness is our top priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Service Areas</h2>
            <p className="text-gray-600">Proudly serving Fresno and surrounding Central Valley communities</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Fresno", "Clovis", "Madera", "Sanger", "Selma", "Kingsburg", "Reedley", "Visalia", "Tulare", "Hanford"].map((area) => (
              <span key={area} className="bg-white px-5 py-3 rounded-full font-semibold text-primary shadow-md hover:bg-primary hover:text-white transition-colors cursor-default">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-green-50 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Ready for a Cleaner Home?</h2>
          <p className="text-gray-600 mb-8">Book online in 60 seconds or call us now</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+15597852822" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-lg rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
              Call (559) 785-2822
            </a>
            <a href="#booking-form" className="inline-flex items-center justify-center px-6 py-4 bg-white border-2 border-primary text-primary font-bold text-lg rounded-xl hover:bg-primary hover:text-white transition-all">
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
