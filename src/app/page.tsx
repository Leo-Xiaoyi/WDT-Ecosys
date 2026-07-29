"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Mail, MapPin, AtSign } from "lucide-react";

export default function Home() {
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "/pictures-home/p1.jpeg",
    "/pictures-home/p2.jpeg",
    "/pictures-home/p3.jpeg",
    "/pictures-home/p4.jpeg",
    "/pictures-home/p5.jpeg",
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-[#A399D8] min-h-[550px] flex items-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-[#1E1B4B] space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Explore the Waikato <br />
              Digital & Tech <br />
              Ecosystem
            </h1>
            <p className="text-xl opacity-90 max-w-lg leading-relaxed font-medium">
              Explore the directory and find Waikato businesses & organisations on our map.
            </p>
            <Link 
              href="/database" 
              className="inline-block bg-[#3B3469] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#2D2852] transition-all shadow-lg text-lg"
            >
              Start Exploring
            </Link>
          </div>

          <div className="relative flex justify-center items-center">
             <div className="relative w-full max-w-[500px] aspect-square">
                {/* Visual implementation of Softr-style illustration */}
                <div className="absolute inset-0 bg-[#FCD34D]/20 rounded-full scale-90 blur-xl"></div>
                <div className="absolute bottom-10 left-0 right-0 h-32 bg-[#FEE2E2]/30 rounded-[50px] rotate-[-5deg]"></div>
                
                {/* Hero Person Image Fallback */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                   <div className="relative w-[90%] h-[90%]">
                      <div className="w-full h-full relative group">
                        <div className="absolute inset-0 flex items-center justify-center -translate-y-4">
                           <div className="w-64 h-64 bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 flex flex-col items-center justify-center p-8 text-center shadow-inner">
                              <span className="text-6xl mb-4">👨‍💻</span>
                              <p className="text-[#3B3469] font-bold">Waikato Digital & <br/>Tech Ecosystem</p>
                              <div className="absolute -bottom-6 -right-6 w-32 h-24 bg-[#3B3469]/20 rounded-2xl rotate-12 blur-sm -z-10"></div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Floating Softr-style Icons */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center text-[#A399D8] animate-bounce delay-100 z-20">
                  <AtSign className="w-8 h-8" />
                </div>
                <div className="absolute top-1/3 -left-4 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#F87171] transform -rotate-12 z-20">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="absolute bottom-20 right-0 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-[#60A5FA] animate-pulse z-20">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="absolute top-1/2 right-[-20px] w-12 h-12 bg-white/80 rounded-lg shadow-md flex items-center justify-center text-xl z-20">💬</div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[#3B3469] text-3xl font-bold mb-20 tracking-tight">Ecosystem Overview</h2>
          <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {/* Note: These stats are currently static placeholders.
                In a future iteration they could be replaced with live counts from Airtable/Xano. */}
            <div className="space-y-6">
              <div className="text-7xl font-bold text-[#C4BCEE]">300+</div>
              <div className="space-y-2">
                <div className="font-bold text-[#3B3469] uppercase tracking-[0.2em] text-sm">Entities</div>
                <p className="text-sm text-[#1E1B4B] font-medium leading-relaxed">Number of businesses, organisations & initiatives.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-7xl font-bold text-[#C4BCEE]">100+</div>
              <div className="space-y-2">
                <div className="font-bold text-[#3B3469] uppercase tracking-[0.2em] text-sm">AoE</div>
                <p className="text-sm text-[#1E1B4B] font-medium leading-relaxed">Over 100+ Areas of Expertise represented.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-7xl font-bold text-[#C4BCEE]">1</div>
              <div className="space-y-2">
                <div className="font-bold text-[#3B3469] uppercase tracking-[0.2em] text-sm">One Region</div>
                <p className="text-sm text-[#1E1B4B] font-medium leading-relaxed">The mighty Waikato region!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-12 relative group">
        <div className="container mx-auto px-4 md:px-6">
          <div className="overflow-hidden relative rounded-[32px] shadow-2xl h-[400px] md:h-[600px] bg-gray-100 isolation-isolate">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-700 ease-in-out h-full w-full"
              style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  WebkitBackfaceVisibility: 'hidden',
                  WebkitPerspective: '1000'
              }}
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
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === idx ? "bg-white w-8" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[#3B3469] text-3xl font-bold mb-4 tracking-tight">Our Partners</h2>
          <p className="text-[#1E1B4B]/60 text-sm mb-16">Organisations that have supported the development of this ecosystem database.</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 transition-all duration-500">
             <Image src="/Pictures/Partners/p1.png" alt="Partner 1" width={120} height={60} className="h-auto object-contain" />
             <Image src="/Pictures/Partners/p2.png" alt="Partner 2" width={180} height={60} className="h-auto object-contain" />
             <Image src="/Pictures/Partners/p3.png" alt="Partner 3" width={100} height={60} className="h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
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
    </div>
  );
}
