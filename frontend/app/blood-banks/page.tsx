'use client';

import React from 'react';
import { BloodBanks } from "@/components/BloodBanks";

export default function BloodBanksPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Blood Banks in Hubli</h1>
        <p className="text-center text-gray-600 mb-8">
          Find the nearest blood bank for your donation or emergency needs
        </p>
        <BloodBanks />
      </div>
    </div>
  );
}
 