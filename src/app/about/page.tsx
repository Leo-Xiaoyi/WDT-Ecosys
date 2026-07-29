"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Building2, Database, Laptop, Zap, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutPage() {
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "/pictures-about/p1.jpeg",
    "/pictures-about/p2.jpeg",
    "/pictures-about/p3.jpeg",
    "/pictures-about/p4.jpeg",
    "/pictures-about/p5.jpeg",
    "/pictures-about/p6.jpeg",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  }, [sliderImages.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="pt-20 pb-0 bg-white">
      {/* 1. Intro Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h1 className="text-[#3B3469] text-3xl md:text-4xl font-extrabold tracking-tight">
            The Waikato DT Ecosystem Impact Mapping Project
          </h1>
          <p className="text-[#1E1B4B]/70 leading-relaxed text-sm md:text-base">
            In 2024, the Waikato Ecosystem Impact Mapping Project performed a comprehensive scan of the digital and technology (digitech) sector in the Waikato region. We looked closely at work being done in the digital equity and digital inclusion space, as well as impact generated within the ecosystem in relation to three key areas - industry (job) pathways, internship pathways & pastoral care. The first phase of the project was commissioned by the Web Access Waikato Trust, and delivered by Te Motonui Tech. Over the project&apos;s nine-month duration, key deliverables included the development of an ecosystem database, stakeholder engagement, and delivery of community activation events.
          </p>
        </div>
      </section>

      {/* 2. Capture Data Section */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight">
            How did you capture and collate data?
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base">
            A human captured all data that is contained in this ecosystem map.
          </p>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base">
            No AI tools or AI bots were utilised to capture any of the data.
          </p>
        </div>
      </section>

      {/* 3. Image Slider Section (6 images with arrows) */}
      <section className="py-12 px-4 group">
        <div className="container mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative aspect-[16/9] bg-gray-100">
           {/* Slides */}
           <div 
            className="flex transition-transform duration-700 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((src, idx) => (
              <div key={idx} className="min-w-full h-full relative flex-shrink-0">
                <Image 
                  src={src} 
                  alt={`Slide ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.preventDefault(); prevSlide(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); nextSlide(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {sliderImages.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-white w-6" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technology Definition Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight">
            What is a Technology company?
          </h2>
          <p className="text-[#1E1B4B]/70 leading-relaxed text-sm md:text-base">
            The definition adopted by this project to define a technology company is &quot;one that has technology as a core component of its products, services or solutions.&quot; Examples may include ICT consulting firms, companies using artificial intelligence or robotics in non-traditional ICT businesses such as manufacturing or agritech, companies building digital platforms to enable digital storytelling, website or app building companies, IoT companies, drone companies, or organisations that teach, train, support people in their technology learning journeys. (Source: https://www.taihangara.nz)
          </p>
        </div>
      </section>

      {/* 5. Key Objectives Section */}
      <section className="py-24 px-4 bg-gray-50/80">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight mb-20">Key Objectives</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ObjectiveItem 
              icon={<Users className="w-8 h-8 text-[#A399D8]" />}
              title="Identify Stakeholders"
              desc="Identify digital and technology stakeholders and initiatives within the Waikato region."
            />
            <ObjectiveItem 
              icon={<Building2 className="w-8 h-8 text-[#A399D8]" />}
              title="Identify Entities"
              desc="Identify supporting organisations, initiatives and individuals within the Waikato region."
            />
            <ObjectiveItem 
              icon={<Database className="w-8 h-8 text-[#A399D8]" />}
              title="Compile Database"
              desc="Compile an ecosystem database of digitech stakeholders, organisations and initiatives."
            />
            <ObjectiveItem 
              icon={<Laptop className="w-8 h-8 text-[#A399D8]" />}
              title="Implement Solution"
              desc="Create a freely accessible online resource that shares the ecosystem database."
            />
          </div>
        </div>
      </section>

      {/* 6. Measure Impact Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight mb-6">How did we measure impact?</h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base mb-20">We measured impact across the ecosystem by observing 5 key areas:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <ImpactItem icon={<Zap className="w-6 h-6" />} title="Industry Pathways" desc="Number of industry pathways available, and who offers them." />
            <ImpactItem icon={<Zap className="w-6 h-6" />} title="Internship Pathways" desc="Number of internship pathways available, and who offers them." />
            <ImpactItem icon={<Zap className="w-6 h-6" />} title="Pastoral Care" desc="Pastoral care opportunities available, and who offers them." />
            <ImpactItem icon={<Zap className="w-6 h-6" />} title="Digital Equity & Inclusion" desc="Number of organisations and initiatives in the DE & DI space." />
          </div>
        </div>
      </section>

      {/* 7. Join Ecosystem CTA (Added here per requested order) */}
      <section className="bg-[#A399D8] py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[#3B3469] text-4xl font-extrabold mb-12 tracking-tight">Join the Ecosystem today!</h2>
          <Link 
            href="/join" 
            className="bg-[#3B3469] text-white px-12 py-5 rounded-full font-bold hover:bg-[#2D2852] transition-all uppercase tracking-widest text-sm inline-block shadow-xl"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* 8. Key Milestones Section */}
      <section className="py-24 px-4 bg-gray-50/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight mb-20">Key Milestones</h2>
          <div className="grid md:grid-cols-3 gap-16">
            <ObjectiveItem 
              icon={<Search className="w-8 h-8 text-[#A399D8]" />}
              title="Research & Ecosystem Scan"
              desc="Conducted research & ecosystem scan to gather data about the digitech landscape in Waikato."
            />
            <ObjectiveItem 
              icon={<Users className="w-8 h-8 text-[#A399D8]" />}
              title="Community Engagement"
              desc="Engaged with key stakeholders & organisations to build relationships and gain insights."
            />
            <ObjectiveItem 
              icon={<Database className="w-8 h-8 text-[#A399D8]" />}
              title="Database Development"
              desc="Compiled & organised data into an online database, ready for MVP solution."
            />
          </div>
        </div>
      </section>

      {/* 9. Project Outputs Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight mb-20">Project Outputs</h2>
          {/* Note: These stats are currently static placeholders.
              In a future iteration they could be replaced with live counts from Airtable/Xano. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem num="300+" label="300+ Entities captured" />
            <StatItem num="12" label="12 Key stakeholders identified & engaged" />
            <StatItem num="6" label="6 Key stakeholder meetings held" />
            <StatItem num="4" label="4 Community activation events delivered" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ObjectiveItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mb-2">{icon}</div>
      <h3 className="text-[#3B3469] font-bold text-sm md:text-base">{title}</h3>
      <p className="text-[#1E1B4B]/60 text-[12px] leading-snug max-w-[200px]">{desc}</p>
    </div>
  );
}

function ImpactItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-[#A399D8]">{icon}</div>
      <h3 className="text-[#3B3469] font-bold text-sm md:text-base">{title}</h3>
      <p className="text-[#1E1B4B]/60 text-[12px] leading-snug max-w-[200px]">{desc}</p>
    </div>
  );
}

function StatItem({ num, label }: { num: string, label: string }) {
  return (
    <div className="space-y-4">
      <div className="text-5xl font-bold text-[#C4BCEE]">{num}</div>
      <p className="text-[#1E1B4B] font-medium text-[12px] leading-snug max-w-[150px] mx-auto">{label}</p>
    </div>
  );
}
