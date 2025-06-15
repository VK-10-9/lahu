'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";

export default function BloodBanksPage() {
  const bloodBanks = [
    {
      name: "Hitech Pathology & Blood Bank",
      address: "Near Unkal Cross, Gokul Road, Hubli",
      phone: "Not specified",
      timing: "As listed on local directories",
      verified: true,
      distance: "3.2 km",
      type: "Private"
    },
    {
      name: "Hubli Lions Blood Bank",
      address: "Vivekananda General Hospital Campus, Deshpande Nagar, Hubli",
      phone: "0836-4253366",
      timing: "24x7",
      verified: true,
      distance: "2.8 km",
      type: "Private"
    },
    {
      name: "Jeevanavar Blood Bank",
      address: "Gokul Road, Opp. KSRTC Depot, Hubli",
      phone: "0836-2230892",
      timing: "Not specified",
      verified: true,
      distance: "4.1 km",
      type: "Private"
    },
    {
      name: "KCTRI Blood Bank",
      address: "Navanagar, Hubli",
      phone: "0836-2232021",
      timing: "9 AM – 6 PM (Mon–Sat)",
      verified: true,
      distance: "3.5 km",
      type: "Private"
    },
    {
      name: "KIMS Blood Bank",
      address: "KIMS Campus, Vidyanagar, Hubli",
      phone: "0836-2370047",
      timing: "24x7",
      verified: true,
      distance: "2.5 km",
      type: "Government"
    },
    {
      name: "Life Line 24x7 Blood Bank",
      address: "Gokul Road / New Bus Stand Area, Hubli",
      phone: "Varies by branch",
      timing: "24x7",
      verified: true,
      distance: "3.8 km",
      type: "Private"
    },
    {
      name: "M. R. Diagnostics & Blood Bank",
      address: "Traffic Island, Near Lamington Road, Hubli",
      phone: "0836-4266222",
      timing: "Not specified",
      verified: true,
      distance: "4.3 km",
      type: "Private"
    },
    {
      name: "Rashtrotthana Blood Centre",
      address: "Vidya Nagar, Neeligin Road, Hubli",
      phone: "0836-2360204",
      timing: "9 AM – 6 PM (Mon–Sat)",
      verified: true,
      distance: "2.7 km",
      type: "Private"
    },
    {
      name: "South Central Railway Hospital Blood Bank",
      address: "Railway Hospital, Hubli South",
      phone: "Not specified",
      timing: "24x7 (Emergency)",
      verified: true,
      distance: "4.5 km",
      type: "Government",
      note: "For railway employees & public use in emergencies"
    },
    {
      name: "Suchirayu Blood Bank",
      address: "Suchirayu Hospital, Gokul Road, Hubli",
      phone: "0836-2332000",
      timing: "9 AM – 5 PM (Mon–Sat)",
      verified: true,
      distance: "3.9 km",
      type: "Private"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Blood Banks in Hubli</h1>
          <p className="text-gray-600 mt-2">Find verified blood banks near you</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Search blood banks..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Sort by Distance
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Verified Only
            </Button>
          </div>
        </div>

        {/* Blood Banks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bloodBanks.map((bank, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{bank.name}</h3>
                  <span className={`text-sm ${bank.type === 'Government' ? 'text-blue-600' : 'text-green-600'}`}>
                    {bank.type}
                  </span>
                </div>
                {bank.verified && (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">{bank.address}</p>
                    <p className="text-sm text-gray-500">{bank.distance} away</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600">{bank.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600">{bank.timing}</p>
                </div>
                {bank.note && (
                  <p className="text-sm text-gray-500 italic">{bank.note}</p>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  View Details
                </Button>
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
 