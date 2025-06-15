import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, MapPin, Building2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";

interface BloodBank {
  id: number;
  name: string;
  address: string;
  timing: string;
  phone: string;
  is_24x7: boolean;
  is_government: boolean;
}

export function BloodBanks() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8000/api/bloodbanks/', {
        headers,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blood banks');
      }
      
      const data = await response.json();
      setBloodBanks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blood banks:', error);
      toast({
        title: "Error",
        description: "Failed to load blood banks. Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const filteredBanks = bloodBanks.filter(bank => {
    if (filter === "all") return true;
    if (filter === "24x7") return bank.is_24x7;
    if (filter === "government") return bank.is_government;
    return true;
  });

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blood Banks in Hubli</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Blood Banks</SelectItem>
            <SelectItem value="24x7">24x7 Available</SelectItem>
            <SelectItem value="government">Government</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanks.map((bank) => (
          <Card key={bank.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{bank.name}</CardTitle>
                <div className="flex gap-2">
                  {bank.is_24x7 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      24x7
                    </Badge>
                  )}
                  {bank.is_government && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Government
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-600">{bank.address}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-600">{bank.timing}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-600">{bank.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 