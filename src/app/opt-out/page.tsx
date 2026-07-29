"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function OptOutPage() {
  const [formData, setFormData] = useState({
    orgName: "",
    name: "",
    role: "",
    email: "",
    address: "",
    reason: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.orgName) newErrors.orgName = "Organisation Name is required";
    if (!formData.name) newErrors.name = "Your Name is required";
    if (!formData.role) newErrors.role = "Title/Role is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.reason) newErrors.reason = "Reason is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Form validation passed. This is a demo submission handler -
      // in production this would send the opt-out request to Airtable.
      alert("Opt-out request submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-[#3B3469] text-3xl font-extrabold tracking-tight">Opt Out Form</h1>
          <p className="text-[#1E1B4B]/60 text-sm">
            Fill in the form if you&apos;d like to be removed from the Waikato DT Ecosystem listing
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

          {/* Your Name */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Your Name *</label>
            <input 
              type="text" 
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.name ? "ring-2 ring-red-400" : ""}`}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Your Title/Role */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Your Title/Role *</label>
            <input 
              type="text" 
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.role ? "ring-2 ring-red-400" : ""}`}
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
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

          {/* Physical Address */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Physical Address</label>
            <input 
              type="text" 
              className="w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          {/* Reason for opting out */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#3B3469]">Reason for opting out *</label>
            <textarea 
              rows={5}
              className={`w-full bg-[#F3F4F6] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#3B3469] transition-all ${errors.reason ? "ring-2 ring-red-400" : ""}`}
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#3B3469] text-white py-4 rounded-2xl font-bold hover:bg-[#2D2852] transition-all shadow-lg mt-8"
          >
            Opt Out Now
          </button>
        </form>
      </div>
    </div>
  );
}

