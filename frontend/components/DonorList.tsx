import React, { useEffect, useState } from 'react';
import { DonorCard } from './DonorCard';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

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

export function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/donors/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch donors');
      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.error('Error fetching donors:', error);
      toast({
        title: "Error",
        description: "Failed to load donors. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (donorId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/donors/${donorId}/contact/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to contact donor');

      toast({
        title: "Success",
        description: "Contact request sent successfully!",
      });
    } catch (error) {
      console.error('Error contacting donor:', error);
      toast({
        title: "Error",
        description: "Failed to contact donor. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donors.map((donor) => (
        <DonorCard
          key={donor.id}
          donor={donor}
          onContact={handleContact}
        />
      ))}
    </div>
  );
} 