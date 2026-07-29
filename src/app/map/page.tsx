"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { Search, ChevronDown, Check, X, MapPin } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// --- Types & Config ---
const HAMILTON_CENTER = { lat: -37.787, lng: 175.279 }; // Hamilton, NZ

const TAGS = [
  { label: "Digital equity", color: "bg-red-100 text-red-700", border: "border-red-200" },
  { label: "Digital inclusion", color: "bg-blue-100 text-blue-700", border: "border-blue-200" },
  { label: "Industry pathway", color: "bg-cyan-100 text-cyan-700", border: "border-cyan-200" },
  { label: "Internship pathway", color: "bg-green-100 text-green-700", border: "border-green-200" },
  { label: "Pastoral care", color: "bg-emerald-100 text-emerald-700", border: "border-emerald-200" },
];

const AOE_OPTIONS = ["Accounting", "Advocacy", "Agriculture", "AgriTech", "AI", "Animation", "Arts organisation", "ISP", "Retail", "Telecommunications", "Web development", "SaaS"];

interface MapMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  expertise: string[];
  impactArea: string[];
  address: string;
  phone: string;
  email: string;
  website: string;
  contactPerson: string;
}

export default function MapPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAoe, setActiveAoe] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(HAMILTON_CENTER);
  const [mapZoom, setMapZoom] = useState(13);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Fetch data from Xano API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setIsLoadingData(true);
        const apiUrl = process.env.NEXT_PUBLIC_XANO_API_URL_ECOSYSTEM;
        const endpoint = process.env.NEXT_PUBLIC_XANO_ORGS_ENDPOINT;
        
        if (!apiUrl || !endpoint) {
          throw new Error("API configuration is missing");
        }

        const response = await fetch(`${apiUrl}${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const rawOrgs = data.result1 || [];
        
        // Transform to map markers (only include orgs with valid coordinates)
        const transformedMarkers: MapMarker[] = rawOrgs
          .filter((org: any) => org.latitude && org.longitude)
          .map((org: any) => ({
            id: org.id,
            name: org.name || "",
            lat: parseFloat(org.latitude),
            lng: parseFloat(org.longitude),
            expertise: org.expertise ? org.expertise.split(',').map((s: string) => s.trim()) : [],
            impactArea: org.impact_area ? org.impact_area.split(',').map((s: string) => s.trim()) : [],
            address: org.physical_address || "",
            phone: org.phone || "",
            email: org.email_id || "",
            website: org.website || "",
            contactPerson: org.contact_person || ""
          }));
        
        setMarkers(transformedMarkers);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Handle URL parameters to auto-focus on a specific marker
  useEffect(() => {
    if (markers.length === 0 || !isLoaded) return;

    const targetId = searchParams.get('id');
    if (targetId) {
      const targetMarker = markers.find(m => m.id === parseInt(targetId));
      if (targetMarker) {
        // Center map on the target marker
        setMapCenter({ lat: targetMarker.lat, lng: targetMarker.lng });
        setMapZoom(16); // Zoom in closer
        
        // Open the info window for this marker
        setTimeout(() => {
          setSelectedPlace(targetMarker);
          
          // Scroll to map if on mobile/small screen
          if (typeof window !== 'undefined') {
            const mapElement = document.querySelector('[class*="rounded-\\[32px\\"]');
            if (mapElement) {
              mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }, 800); // Delay to ensure map is loaded
      }
    }
  }, [markers, searchParams, isLoaded]);

  // Filter Logic
  const filteredMarkers = useMemo(() => {
    return markers.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           m.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAoe = activeAoe.length === 0 || m.expertise.some(exp => activeAoe.includes(exp));
      const matchesTag = activeTags.length === 0 || m.impactArea.some(t => activeTags.includes(t));
      return matchesSearch && matchesAoe && matchesTag;
    });
  }, [markers, searchQuery, activeAoe, activeTags]);

  const toggleTag = (label: string) => {
    setActiveTags(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]);
  };

  return (
    <div className="pt-28 pb-0 min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 max-w-6xl flex-grow">
        <h1 className="text-[#3B3469] text-4xl font-extrabold text-center mb-10 tracking-tight">Ecosystem Map</h1>
        
        {/* Top Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TAGS.map((tag) => (
            <button 
              key={tag.label}
              onClick={() => toggleTag(tag.label)}
              className={`${tag.color} px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${activeTags.includes(tag.label) ? `border-[#3B3469] ring-2 ring-[#3B3469]/10` : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Search & AoE Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#3B3469] transition-colors" />
            <input 
              type="text"
              placeholder="Search for organisation OR contact person"
              className="w-full bg-[#F3F4F6] border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-2 focus:ring-[#3B3469]/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AoeDropdown selected={activeAoe} onChange={setActiveAoe} />
        </div>

        {/* Map Container */}
        <div className="w-full h-[600px] bg-gray-100 rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl relative mb-20 isolation-isolate">
          {isLoadingData ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B3469]"></div>
              <p className="text-gray-500">Loading map data...</p>
            </div>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-red-500 font-bold">Failed to load map data</p>
              <p className="text-xs text-gray-400">{error}</p>
            </div>
          ) : isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={mapCenter}
              zoom={mapZoom}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
              }}
            >
              <MarkerClusterer>
                {(clusterer) => (
                  <>
                    {filteredMarkers.map((marker) => (
                      <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        clusterer={clusterer}
                        onClick={() => setSelectedPlace(marker)}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>

              {selectedPlace && (
                <InfoWindow
                  position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="p-2 max-w-[280px]">
                    <h3 className="font-bold text-[#3B3469] text-sm mb-2">{selectedPlace.name}</h3>
                    
                    {selectedPlace.expertise && selectedPlace.expertise.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedPlace.expertise.map((exp: string) => (
                            <span key={exp} className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded font-bold uppercase">{exp}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedPlace.impactArea && selectedPlace.impactArea.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Impact Area:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedPlace.impactArea.map((area: string) => (
                            <span key={area} className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">{area}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedPlace.address && (
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-semibold">Address:</span> {selectedPlace.address}
                      </p>
                    )}
                    
                    {selectedPlace.phone && (
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-semibold">Phone:</span> {selectedPlace.phone}
                      </p>
                    )}
                    
                    {selectedPlace.website && (
                      <a 
                        href={selectedPlace.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#3B3469] hover:underline font-semibold block mt-2"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
               <div className="w-20 h-20 bg-[#3B3469]/10 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="w-10 h-10 text-[#3B3469]/40" />
               </div>
               <p className="text-[#3B3469]/40 font-bold text-lg uppercase tracking-widest">Map Loading...</p>
               <p className="text-xs text-gray-400">Loading Google Maps...</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Feedback Section */}
      <section className="bg-[#A399D8] py-20">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="text-left space-y-4">
                <h2 className="text-[#3B3469] text-3xl font-extrabold tracking-tight">Did you spot an error?</h2>
                <p className="text-[#3B3469]/80 text-sm md:text-base max-w-lg">If you&apos;ve spotted an error in the database, please contact us and we&apos;ll correct it ASAP!</p>
             </div>
             <Link 
               href="/contact" 
               className="bg-[#3B3469] text-white px-10 py-4 rounded-full font-bold hover:bg-[#2D2852] transition-all whitespace-nowrap shadow-lg"
             >
               Contact us
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}

function AoeDropdown({ selected, onChange }: { selected: string[], onChange: (val: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-10 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-[#3B3469] min-w-[200px] shadow-sm hover:border-[#3B3469]/30 transition-all"
      >
        AoE {selected.length > 0 && `(${selected.length})`}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <input 
              type="text" 
              placeholder="Search"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            {AOE_OPTIONS.filter(o => o.toLowerCase().includes(search.toLowerCase())).map(opt => (
              <div 
                key={opt}
                onClick={() => onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])}
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className={`text-sm ${selected.includes(opt) ? "font-bold text-[#3B3469]" : "text-[#1E1B4B]/80"}`}>{opt}</span>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selected.includes(opt) ? "bg-[#3B3469] border-[#3B3469]" : "border-gray-200 bg-gray-100"}`}>
                  {selected.includes(opt) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
