"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Search, Calendar, Loader2, Shield, Award, Clock, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/search")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen medical-gradient flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-medical-primary mx-auto mb-4" />
          <p className="text-medical-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient">
          <div className="absolute inset-0 bg-[url('/blood-pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 py-24 text-center relative">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-base font-medium mb-6 border border-white/20">
                  <Shield className="w-5 h-5 mr-2" />
                  Trusted Healthcare Platform
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 heading-primary leading-tight">
                Save Lives with
                <span className="block text-red-100 mt-2">Lahu</span>
              </h2>
              <p className="text-xl md:text-2xl text-red-50 mb-12 max-w-2xl mx-auto leading-relaxed">
                Connecting donors and recipients to save lives, one donation at a time. Building healthier communities through technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 text-lg px-10 py-6 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="mr-3 h-6 w-6" />
                    Find Donors Now
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg px-10 py-6 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Heart className="mr-3 h-6 w-6" />
                    Become a Donor
                  </Button>
                </Link>
              </div>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-medium">500+</p>
                  <p className="text-red-100 text-sm">Active Donors</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-medium">1,200+</p>
                  <p className="text-red-100 text-sm">Lives Impacted</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-medium">24/7</p>
                  <p className="text-red-100 text-sm">Emergency Support</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-medium">15+</p>
                  <p className="text-red-100 text-sm">Partner Hospitals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 medical-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-medical-dark mb-4 heading-secondary">How Lahu Works</h3>
            <p className="text-xl text-medical-secondary max-w-2xl mx-auto">
              A comprehensive blood donation platform connecting donors, recipients, and blood banks in real-time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center card-shadow card-hover border-0">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 feature-icon rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-medical-primary" />
                </div>
                <CardTitle className="text-xl text-medical-dark heading-secondary">Easy Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-medical-secondary text-base leading-relaxed">
                  Quick sign-up process for donors and recipients. Donors can specify their blood type, location, and availability. Recipients can create urgent blood requests with specific requirements.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center card-shadow card-hover border-0">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 feature-icon rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-medical-primary" />
                </div>
                <CardTitle className="text-xl text-medical-dark heading-secondary">Real-time Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-medical-secondary text-base leading-relaxed">
                  Instantly find nearby blood banks and available donors. Filter by blood type, location, and urgency. Get immediate notifications for matching donors and available blood units.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center card-shadow card-hover border-0">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 feature-icon rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-medical-primary" />
                </div>
                <CardTitle className="text-xl text-medical-dark heading-secondary">Blood Bank Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-medical-secondary text-base leading-relaxed">
                  Direct connection with local blood banks. Track blood inventory, manage donation requests, and coordinate with healthcare facilities. Real-time updates on blood availability and requirements.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center space-x-2 bg-medical-light/50 px-6 py-3 rounded-full">
                <Shield className="h-6 w-6 text-medical-primary" />
                <span className="text-medical-dark font-medium">Secure Platform</span>
              </div>
              <div className="flex items-center space-x-2 bg-medical-light/50 px-6 py-3 rounded-full">
                <Award className="h-6 w-6 text-medical-primary" />
                <span className="text-medical-dark font-medium">Verified Blood Banks</span>
              </div>
              <div className="flex items-center space-x-2 bg-medical-light/50 px-6 py-3 rounded-full">
                <Heart className="h-6 w-6 text-medical-primary" />
                <span className="text-medical-dark font-medium">Real-time Updates</span>
              </div>
            </div>
            <p className="text-medical-secondary max-w-2xl mx-auto">
              Our platform ensures secure data handling, partners with verified blood banks, and provides real-time updates for emergency situations.
            </p>
          </div>
        </div>
      </section>

      {/* College/University Credits */}
      <section className="py-20 medical-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-medical-dark mb-4">Academic Excellence</h4>
              <div className="w-20 h-1 bg-medical-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
              <div className="text-center mb-6">
                <h5 className="text-2xl font-bold text-medical-dark mb-2">K. L. E. SOCIETY'S</h5>
                <h5 className="text-2xl font-bold text-medical-dark mb-4">K. L. E. INSTITUTE OF TECHNOLOGY</h5>
                <p className="text-medical-secondary text-lg">Department of Computer Science</p>
                <p className="text-medical-secondary text-lg mb-2">Visvesvaraya Technological University</p>
                <p className="text-medical-secondary">Opp. Airport, Gokul, Hubballi-580 027</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-medical-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-medical-primary" />
                  </div>
                  <h5 className="text-xl font-semibold text-medical-dark">Vishwanath M. Koliwad</h5>
                </div>
                <p className="text-medical-secondary">1st Year, Computer Science</p>
                <div className="mt-4 pt-4 border-t border-medical-light">
                  <p className="text-sm text-medical-secondary">Full Stack Developer</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-medical-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-medical-primary" />
                  </div>
                  <h5 className="text-xl font-semibold text-medical-dark">Nihal V. Batunge</h5>
                </div>
                <p className="text-medical-secondary">1st Year, Computer Science</p>
                <div className="mt-4 pt-4 border-t border-medical-light">
                  <p className="text-sm text-medical-secondary">Full Stack Developer</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Heart className="h-6 w-6 text-medical-primary" />
                <h5 className="text-xl font-semibold text-medical-dark">Blood Donation Network</h5>
              </div>
              <p className="text-medical-secondary">First Year Mini Project - 2024</p>
              <div className="mt-4 flex justify-center space-x-4">
                <span className="px-4 py-2 bg-medical-primary/10 rounded-full text-medical-primary text-sm">Web Development</span>
                <span className="px-4 py-2 bg-medical-primary/10 rounded-full text-medical-primary text-sm">React</span>
                <span className="px-4 py-2 bg-medical-primary/10 rounded-full text-medical-primary text-sm">Django</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
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
    </div>
  )
}

