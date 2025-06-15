import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, User, MapPin, Droplet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Donor {
  id: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  blood_group: string;
  phone_number: string;
  address: string;
  is_available: boolean;
  last_donation_date: string;
}

interface DonorCardProps {
  donor: Donor;
  onContact: (donorId: number) => void;
}

export function DonorCard({ donor, onContact }: DonorCardProps) {
  const fullName = `${donor.user.first_name} ${donor.user.last_name}`;
  const daysSinceLastDonation = donor.last_donation_date
    ? Math.floor((new Date().getTime() - new Date(donor.last_donation_date).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{fullName}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Droplet className="w-4 h-4" />
              <span>{donor.blood_group}</span>
            </CardDescription>
          </div>
          <Badge variant={donor.is_available ? "default" : "secondary"}>
            {donor.is_available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">{donor.address}</p>
          </div>
          {daysSinceLastDonation !== null && (
            <p className="text-sm text-gray-600">
              Last donation: {daysSinceLastDonation} days ago
            </p>
          )}
          
          <div className="flex gap-2 mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Donor Profile</DialogTitle>
                  <DialogDescription>
                    Detailed information about the donor
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Personal Information</h3>
                    <p>Name: {fullName}</p>
                    <p>Blood Group: {donor.blood_group}</p>
                    <p>Status: {donor.is_available ? "Available" : "Unavailable"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Information</h3>
                    <p>Phone: {donor.phone_number}</p>
                    <p>Email: {donor.user.email}</p>
                    <p>Address: {donor.address}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Donation History</h3>
                    <p>Last Donation: {donor.last_donation_date ? new Date(donor.last_donation_date).toLocaleDateString() : "No previous donations"}</p>
                    {daysSinceLastDonation !== null && (
                      <p>Days since last donation: {daysSinceLastDonation}</p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              className="flex-1"
              onClick={() => onContact(donor.id)}
              disabled={!donor.is_available}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 