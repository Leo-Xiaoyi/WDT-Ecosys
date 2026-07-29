"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Quote, X, BookOpen, ExternalLink } from "lucide-react";

// This is static data for the case studies shown below. In production,
// this could instead be stored in Airtable and fetched dynamically via the API.

interface CaseStudy {
  id: string;
  title: string;
  org: string;
  contact: string;
  quote: string;
  overview: string;
  experience: string;
  impacts: string[];
  lookingAhead: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "alvin-yeo",
    title: "Bridging Knowledge and Industry",
    org: "University of Waikato",
    contact: "Alvin Yeo, Industry Engagement Manager",
    quote: "We need to get everyone paddling the waka in the same direction.",
    overview: "The University of Waikato is a cornerstone of digital innovation and education in the region. Through research, applied learning, and partnership, it nurtures talent and knowledge for the Waikato digital ecosystem.",
    experience: "Alvin participated in prototype testing to connect education with industry. He saw the value in making the regional tech landscape visible for students, researchers, and local companies.",
    impacts: [
      "Work-integrated learning: students identify local internships.",
      "Research collaboration: academics find partners in data sovereignty or IoT.",
      "Regional visibility: businesses gain exposure within a collective Waikato identity."
    ],
    lookingAhead: "Alvin envisions the map as a core resource. He suggests a membership model for sustainability, helping the region move from 'survive to thrive'."
  },
  {
    id: "mike-bennett",
    title: "Local Leadership in Digital Growth",
    org: "Hamilton City Council",
    contact: "Mike Bennett, Economic Development Manager",
    quote: "It could establish a better, clearer picture of which organisations are most active in which tech subsectors.",
    overview: "Hamilton City Council is at the centre of Waikato's digital transformation as both a consumer of technology and a champion for industry growth through initiatives like Tech in the Tron.",
    experience: "Mike recognized the importance of locally-led digital mapping. He found the map uniquely valuable as a tool validated and grounded in local context, producing more actionable data than national datasets.",
    impacts: [
      "HCC as a customer: identifying local suppliers for tech projects.",
      "HCC as a connector: attracting wider participation and promoting collective ownership.",
      "Sharper insights: addressing the challenge of sub-sector classification."
    ],
    lookingAhead: "HCC sees the map as a planning and procurement tool. Mike plans to leverage Council networks to expand adoption and ensure long-term sustainability."
  },
  {
    id: "paniora-daniels",
    title: "Starting from the Ground Up",
    org: "MTFJ WORKit",
    contact: "Paniora Daniels, Employment Coordinator",
    quote: "Local people fixing local problems…creating pathways and tools for ourselves - that's the dream.",
    overview: "MTFJ WORKit is taking its first steps into the digital space, helping South Waikato navigate new territory and seeking connections that can spark change.",
    experience: "Paniora helped South Waikato find its place in the regional digital landscape. For a district where tech is emerging, the map offered a first glimpse of 'who's who'.",
    impacts: [
      "Bridging the visibility gap: identifying who's who in the sector.",
      "Learning platform: helping community understand tech as a broad field.",
      "Growth through partnership: linking local organisations to regional opportunities."
    ],
    lookingAhead: "MTFJ WORKit plans to leverage the map to connect with mentors and training providers, ensuring South Waikato is an active part of the digital future."
  }
];

export default function CaseStudiesPage() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-[#1E1B4B] text-white py-20 mb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights and impacts from across the Waikato Digital & Tech Ecosystem. 
            Hear from our stakeholders about the value of connection and mapping.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div 
              key={study.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all flex flex-col group cursor-pointer"
              onClick={() => setSelectedStudy(study)}
            >
              <div className="p-8 flex-grow">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F3F4FF] text-[#3B3469]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-[#3B3469] uppercase tracking-widest mb-2">
                  {study.org}
                </h3>
                <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 leading-tight group-hover:text-[#3B3469] transition-colors">
                  {study.title}
                </h2>
                
                <div className="relative mb-6">
                  <Quote className="absolute -left-2 -top-2 w-8 h-8 text-[#C4BCEE] opacity-50" />
                  <p className="pl-6 italic text-gray-600 line-clamp-3">
                    "{study.quote}"
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 line-clamp-3 mb-6">
                  {study.overview}
                </p>
              </div>
              
              <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1E1B4B]">{study.contact.split(',')[0]}</span>
                <button className="flex items-center gap-1 text-sm font-bold text-[#3B3469] hover:gap-2 transition-all">
                  Read Narrative <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Case Study Details */}
        {selectedStudy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedStudy(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-8 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-8">
                    <div className="text-[#3B3469] font-bold text-sm tracking-widest uppercase mb-4">{selectedStudy.org}</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1B4B] mb-4">{selectedStudy.title}</h2>
                    <div className="text-gray-500 font-medium">Contact: {selectedStudy.contact}</div>
                  </div>

                  <div className="bg-[#F3F4FF] rounded-3xl p-8 mb-10 relative italic text-[#1E1B4B] text-xl font-medium">
                    <Quote className="absolute -left-4 -top-4 w-12 h-12 text-[#C4BCEE] opacity-40" />
                    "{selectedStudy.quote}"
                  </div>

                  <div className="space-y-10">
                    <section>
                      <h4 className="text-xl font-bold text-[#1E1B4B] mb-4">Overview</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedStudy.overview}</p>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-[#1E1B4B] mb-4">Experience with the Ecosystem Map</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedStudy.experience}</p>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-[#1E1B4B] mb-4">Key Impacts & Opportunities</h4>
                      <ul className="space-y-3">
                        {selectedStudy.impacts.map((impact, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3B3469] shrink-0" />
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-[#1E1B4B] mb-4">Looking Ahead</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedStudy.lookingAhead}</p>
                    </section>
                  </div>

                  <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-gray-500 mb-1">Want to join the conversation?</p>
                      <p className="font-bold text-[#1E1B4B]">Join the Ecosystem today!</p>
                    </div>
                    <Link 
                      href="/join" 
                      className="bg-[#3B3469] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D2852] transition-all shadow-lg"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA for all */}
        <section className="mt-24 bg-[#C4BCEE]/20 rounded-[40px] p-12 text-center">
          <h2 className="text-3xl font-bold text-[#1E1B4B] mb-6">Ready to share your story?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Become a part of the Waikato Digital & Tech Ecosystem and help us shape the future of our region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/join" 
              className="bg-[#3B3469] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#2D2852] transition-all shadow-xl flex items-center justify-center gap-2"
            >
              Join Ecosystem <ExternalLink className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-[#3B3469] border-2 border-[#3B3469] px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
