import Link from "next/link";
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Lahu</h3>
                <p className="text-sm text-gray-400">Blood Donation Network</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting donors and recipients to save lives, one donation at a time. Building healthier communities through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blood-banks" className="text-gray-400 hover:text-white transition-colors">
                  Find Blood Banks
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Hubli, Karnataka</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency: 108</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@lahu.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Lahu. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 