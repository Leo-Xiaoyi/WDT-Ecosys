"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Mail, ChevronDown, Check, Loader2 } from "lucide-react";
import countryList from 'react-select-country-list';
import { getCountryCallingCode } from 'libphonenumber-js';
import axios from 'axios';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    orgName: "",
    orgDesc: "",
    contactPerson: "",
    role: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    expertise: "",
  });

  // 1. Get full country list with calling codes
  const countries = useMemo(() => {
    const list = countryList().getData();
    return list.map(c => {
      let callingCode = "";
      try {
        callingCode = `+${getCountryCallingCode(c.value as any)}`;
      } catch (e) {
        callingCode = ""; // Some territories might not have codes
      }
      return {
        name: c.label,
        value: c.value,
        code: callingCode,
        flag: String.fromCodePoint(...c.value.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))
      };
    }).filter(c => c.code !== ""); // Filter out those without codes
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.value === 'NZ') || countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  
  // 2. Address Autocomplete State
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchCountry.toLowerCase()) || 
    c.code.includes(searchCountry)
  );

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setIsAddressOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch address suggestions from Photon (OpenStreetMap)
  useEffect(() => {
    const fetchAddresses = async () => {
      if (formData.address.length < 3) {
        setAddressSuggestions([]);
        return;
      }
      setIsAddressLoading(true);
      try {
        // Appending "New Zealand" to the query significantly improves house number recognition
        const response = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(formData.address + " New Zealand")}&limit=15&lat=-38.4&lon=175.2`);
        
        const suggestions = response.data.features
          .filter((f: any) => f.properties.countrycode === 'NZ' || f.properties.country === 'New Zealand')
          .map((f: any) => {
            const p = f.properties;
            // Robustly combine house number and street
            const house = p.housenumber || "";
            const street = p.street || p.name || "";
            const mainLabel = house ? `${house} ${street}` : street;
            const city = p.city || p.town || p.district || "";
            const subLabel = [city, p.state, "New Zealand"].filter(Boolean).join(", ");
            
            return {
              main: mainLabel,
              sub: subLabel,
              full: `${mainLabel}, ${subLabel}`
            };
          })
          .filter((item: any) => item.main.length > 0) // Filter out empty results
          .slice(0, 5);
          
        setAddressSuggestions(suggestions);
        setIsAddressOpen(suggestions.length > 0);
      } catch (error) {
        console.error("Address fetch error:", error);
      } finally {
        setIsAddressLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchAddresses, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [formData.address]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.orgName) newErrors.orgName = "Organisation Name is required";
    if (!formData.orgDesc) newErrors.orgDesc = "Description is required";
    if (!formData.contactPerson) newErrors.contactPerson = "Contact Person is required";
    if (!formData.role) newErrors.role = "Title/Role is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.address) newErrors.address = "Physical Address is required";
    if (!formData.expertise) newErrors.expertise = "Areas of Expertise is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Form validation passed. This is a demo submission handler -
      // in production this would send formData to the Airtable API.
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-[#3B3469] text-3xl font-extrabold tracking-tight">Join The Ecosystem</h1>
          <p className="text-[#1E1B4B]/60 text-sm">
            Fill in the form if you want to join the Waikato DT Ecosystem community and be added to the database.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Organisation Name */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Organisation Name *</label>
            <input 
              type="text" 
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.orgName ? "ring-2 ring-red-400" : ""}`}
              value={formData.orgName}
              onChange={(e) => setFormData({...formData, orgName: e.target.value})}
            />
          </div>

          {/* Organisation Description */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Organisation Description *</label>
            <textarea 
              rows={3}
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.orgDesc ? "ring-2 ring-red-400" : ""}`}
              value={formData.orgDesc}
              onChange={(e) => setFormData({...formData, orgDesc: e.target.value})}
            />
          </div>

          {/* Contact Person */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Contact Person *</label>
            <input 
              type="text" 
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.contactPerson ? "ring-2 ring-red-400" : ""}`}
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
            />
          </div>

          {/* Title/Role */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Title/Role *</label>
            <input 
              type="text" 
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.role ? "ring-2 ring-red-400" : ""}`}
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Website</label>
            <input 
              type="url" 
              className="w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Email *</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                className={`w-full bg-[#F3F4F6] border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.email ? "ring-2 ring-red-400" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div className="space-y-2 relative" ref={countryRef}>
            <label className="text-[13px] font-bold text-[#3B3469]">Contact Phone</label>
            <div className="flex gap-0">
               <div 
                 onClick={() => setIsCountryOpen(!isCountryOpen)}
                 className="bg-[#F3F4F6] border-r border-gray-200 rounded-l-2xl px-4 py-4 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors min-w-[100px]"
               >
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="text-xs font-bold text-[#3B3469]">{selectedCountry.code}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
               </div>
               <input 
                type="tel" 
                placeholder="Phone number"
                className="flex-grow bg-[#F3F4F6] border-none rounded-r-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            {/* Comprehensive Country Dropdown */}
            {isCountryOpen && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] flex flex-col max-h-[350px]">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                  <input 
                    type="text" 
                    placeholder="Search country or code..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <div 
                      key={country.value}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryOpen(false);
                        setSearchCountry("");
                      }}
                      className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${selectedCountry.value === country.value ? "bg-gray-50" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm font-medium text-[#1E1B4B]">{country.name}</span>
                        <span className="text-xs font-bold text-gray-400 ml-auto">{country.code}</span>
                      </div>
                      {selectedCountry.value === country.value && <Check className="w-4 h-4 text-[#3B3469]" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Physical Address */}
          <div className="space-y-2 relative" ref={addressRef}>
            <label className="text-[13px] font-bold text-[#3B3469]">Physical Address *</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Start typing your address..."
                className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.address ? "ring-2 ring-red-400" : ""}`}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                autoComplete="off"
              />
              {isAddressLoading && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Real Address Autocomplete Dropdown */}
            {isAddressOpen && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] flex flex-col">
                {addressSuggestions.map((addr, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      setFormData({...formData, address: addr.full});
                      setIsAddressOpen(false);
                    }}
                    className="px-8 py-5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none"
                  >
                    <div className="text-[#1E1B4B] font-bold text-sm mb-1">{addr.main}</div>
                    <div className="text-gray-400 text-xs">{addr.sub}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Area/s Of Expertise */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Area/s Of Expertise *</label>
            <input 
              type="text" 
              placeholder="E.g. agritech, web dev, cybersecurity, software dev"
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.expertise ? "ring-2 ring-red-400" : ""}`}
              value={formData.expertise}
              onChange={(e) => setFormData({...formData, expertise: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#3B3469] text-white py-4 rounded-2xl font-bold hover:bg-[#2D2852] transition-all shadow-lg mt-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
