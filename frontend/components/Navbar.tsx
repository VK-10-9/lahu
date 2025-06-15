import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-md">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-red-600">Lahu</h1>
            <p className="text-sm text-gray-600">Blood Donation Network</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="/blood-banks">
            <Button
              variant="outline"
              className="border-2 border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors duration-300 px-6"
            >
              Blood Banks
            </Button>
          </Link>
          <Link href="/signin">
            <Button
              variant="outline"
              className="border-2 border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors duration-300 px-6"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 px-6">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 