"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Bookmark, MessageCircle, Users, Laptop, ChevronRight as ChevronRightIcon } from "lucide-react";

export default function WAWTPage() {
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "/pictures-wawt/p1.jpeg",
    "/pictures-wawt/p2.jpeg",
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
            Web Access Waikato Trust
          </h1>
          <p className="text-[#1E1B4B]/70 leading-relaxed text-sm md:text-base">
            The Web Access Waikato Trust is a charitable trust that was established in 2019 to deliver a range of programmes and services, and support aligned initiatives, focused on bridging the digital divide in the Waikato with a focus on infrastructure as well as enablement. Our vision is to &quot;maximise community prosperity through equitable access, self-determination and trust of digital technology.&quot;
          </p>
        </div>
      </section>

      {/* 2. Image Slider Section (2 images) */}
      <section className="py-8 px-4 group">
        <div className="container mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative aspect-[16/9] bg-gray-100">
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

      {/* 3. Foundation Partner Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight">
            Foundation Partner
          </h2>
          <p className="text-[#1E1B4B]/70 leading-relaxed text-sm md:text-base">
            The WAWT are a foundation partner of the Waikato DT ecosystem project, and have been a key driver and enabler of the work that has been completed to date. The first phase of this project was kindly commissioned by the Trust.
          </p>
        </div>
      </section>

      {/* 4. What we do Section */}
      <section className="py-24 px-4 bg-gray-50/80">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight mb-20">What we do</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureItem 
              icon={<Bookmark className="w-8 h-8 text-[#A399D8]" />}
              title="Knowledge builders"
              desc="Host an up-to-date virtual repository of information, resources, services and support providers of digital inclusion, equity and enablement."
            />
            <FeatureItem 
              icon={<MessageCircle className="w-8 h-8 text-[#A399D8]" />}
              title="Connections and conversations"
              desc="Identify supporting organisations, initiatives and individuals within the Waikato region."
            />
            <FeatureItem 
              icon={<Users className="w-8 h-8 text-[#A399D8]" />}
              title="Storytelling"
              desc="Raise awareness of digital inclusion issues and successes through the development and promotion of case studies and real stories of impact."
            />
            <FeatureItem 
              icon={<Laptop className="w-8 h-8 text-[#A399D8]" />}
              title="Innovation and activation"
              desc="Identify opportunities to develop appropriate resources, services and support that bridge the digital divide."
            />
          </div>
        </div>
      </section>

      {/* 5. What is a digital divide? */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-[#3B3469] text-3xl font-extrabold tracking-tight">What is a digital divide?</h2>
              <p className="text-[#1E1B4B]/70 text-sm md:text-base">Digital divides are the gaps between those who:</p>
              <ul className="space-y-4">
                {[
                  "have access to the Internet, and those who do not.",
                  "can afford an Internet connection and devices, and those who can not.",
                  "have the capability & skills to use the Internet, and those who do not are not limited by impairment online, and those who are.",
                  "have the capability, motivation and trust to use the Internet to enrich their lives and their social connections, and those who do not."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-[#1E1B4B]/70 text-sm md:text-base leading-relaxed">
                    <ChevronRightIcon className="w-5 h-5 text-[#A399D8] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <Image src="/pictures-wawt/softr1.png" alt="Digital Divide Illustration" fill className="object-contain" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why is digital inclusion important? */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight">
            Why is digital inclusion important?
          </h2>
          <p className="text-[#1E1B4B]/70 leading-relaxed text-sm md:text-base">
            If everyone has what they need to access and use the internet, there will be a strong foundation in place for all New Zealanders to move forward together in an ever-changing digital world. People who cannot access and use the internet are increasingly at a disadvantage. (Source: digital.govt.nz)
          </p>
        </div>
      </section>

      {/* 7. What is needed to be digitally included? */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-[#3B3469] text-3xl font-extrabold tracking-tight leading-tight">
                What is needed to be digitally included?
              </h2>
              <p className="text-[#1E1B4B]/70 text-sm md:text-base">
                There are 4 interdependent elements which are all needed for a person to be digitally included: motivation, access, skills, and trust.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Motivation", text: "Understanding how the internet and digital technology can help us connect, learn, or access opportunities, and consequently have a meaningful reason to engage with the digital world." },
                  { title: "Access", text: "Having access to digital devices, services, software, and content that meet our needs at a cost we can afford, and being able to connect to the internet where you work, live and play. Access is a broad element, which can be broken into 3 key parts: connectivity, affordability and accessibility." },
                  { title: "Skills", text: "Having the know-how to use the internet and digital technology in ways that are appropriate and beneficial for each of us." },
                  { title: "Trust", text: "Trusting in the internet and online services; and having the digital literacy to manage personal information and understand and avoid scams, harmful communication and misleading information. This element also touches on online safety, digital understanding, confidence and resilience." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-[#1E1B4B]/70 text-sm md:text-base leading-relaxed">
                    <ChevronRightIcon className="w-5 h-5 text-[#A399D8] flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-[#3B3469]">{item.title}: </span>
                      <span>{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[450px] aspect-square">
                <Image src="/pictures-wawt/softr2.png" alt="Digital Inclusion Illustration" fill className="object-contain" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="bg-[#A399D8] py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          <h2 className="text-[#3B3469] text-2xl md:text-3xl font-extrabold tracking-tight">
            For more info, go to the WAWT website.
          </h2>
          <Link 
            href="https://www.wawt.org.nz/" 
            target="_blank"
            className="bg-[#3B3469] text-white px-12 py-5 rounded-full font-bold hover:bg-[#2D2852] transition-all uppercase tracking-widest text-sm inline-block shadow-xl"
          >
            Find out more
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mb-2">{icon}</div>
      <h3 className="text-[#3B3469] font-bold text-sm md:text-base">{title}</h3>
      <p className="text-[#1E1B4B]/60 text-[12px] leading-snug max-w-[200px]">{desc}</p>
    </div>
  );
}
