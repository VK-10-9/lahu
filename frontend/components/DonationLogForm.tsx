import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Building2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BloodBank {
  id: number;
  name: string;
  address: string;
  timing: string;
  phone: string;
  is_24x7: boolean;
  is_government: boolean;
}

interface DonationLogFormData {
  hospital: number;
  donation_date: Date;
  units_donated: number;
}

export function DonationLogForm() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { token } = useAuth();
  const form = useForm<DonationLogFormData>();

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/bloodbanks/');
      if (!response.ok) throw new Error('Failed to fetch blood banks');
      const data = await response.json();
      setBloodBanks(data);
    } catch (error) {
      console.error('Error fetching blood banks:', error);
      toast({
        title: "Error",
        description: "Failed to load blood banks. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: DonationLogFormData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/donations/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          donation_date: data.donation_date.toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to log donation');

      toast({
        title: "Success",
        description: "Donation logged successfully!",
      });
      form.reset();
    } catch (error) {
      console.error('Error logging donation:', error);
      toast({
        title: "Error",
        description: "Failed to log donation. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto card-shadow border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-medical-dark flex items-center">
          <Building2 className="mr-2 h-6 w-6 text-medical-primary" />
          Log Your Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="hospital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medical-dark">Select Hospital</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-medical-primary/20 focus:border-medical-primary">
                        <SelectValue placeholder="Select a hospital" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodBanks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id.toString()}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="donation_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-medical-dark">Donation Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full h-12 pl-3 text-left font-normal border-medical-primary/20 focus:border-medical-primary ${
                            !field.value && "text-medical-secondary"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 text-medical-primary" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date(new Date().setMonth(new Date().getMonth() - 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="units_donated"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medical-dark">Units Donated</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-medical-primary/20 focus:border-medical-primary">
                        <SelectValue placeholder="Select units donated" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Unit</SelectItem>
                      <SelectItem value="2">2 Units</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-12 bg-medical-primary hover:bg-medical-primary/90 text-white" 
              disabled={loading}
            >
              {loading ? "Logging..." : "Log Donation"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 