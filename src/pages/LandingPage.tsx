
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Award, 
  Mic, 
  Calendar, 
  BarChart, 
  UserRound, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">ST</span>
            </div>
            <span className="font-bold text-xl">Speech Spark</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-primary">How It Works</a>
            <a href="#testimonials" className="text-sm hover:text-primary">Testimonials</a>
          </nav>
          <div>
            <Link to="/login">
              <Button variant="ghost" className="mr-2">Log In</Button>
            </Link>
            <Link to="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-therapy-light to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Speech Therapy Made <span className="text-therapy-purple">Fun</span> and <span className="text-therapy-blue">Effective</span>
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Our gamified platform helps children improve their speech and language skills through engaging exercises while giving therapists the tools to track progress effectively.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="rounded-full">
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-therapy-purple/10 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-therapy-blue/10 rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-4 rounded-xl shadow-lg">
                  <img 
                    src="/placeholder.svg" 
                    alt="Child using Speech Spark" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg animate-float">
                  <Award className="text-therapy-orange h-8 w-8" />
                </div>
                <div className="absolute top-1/4 -left-8 transform -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
                  <Mic className="text-therapy-purple h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Everyone</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our platform is designed to meet the needs of therapists, patients, and administrators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-therapy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24 Interactive Exercises</h3>
              <p className="text-gray-600">
                From oral to written exercises, our platform offers a wide range of activities designed by speech therapy experts.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-blue/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-therapy-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Detailed analytics and reports to monitor patient progress over time with visual charts and insights.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-therapy-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gamification System</h3>
              <p className="text-gray-600">
                Rewards, badges, and achievements to keep patients motivated and engaged with their therapy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-purple/10 rounded-lg flex items-center justify-center mb-4">
                <UserRound className="h-6 w-6 text-therapy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-User Platform</h3>
              <p className="text-gray-600">
                Separate interfaces for administrators, therapists, and patients with role-based access controls.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-therapy-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scheduled Assignments</h3>
              <p className="text-gray-600">
                Therapists can assign specific exercises and create personalized therapy plans for each patient.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-therapy-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Recording</h3>
              <p className="text-gray-600">
                Capture and review speech exercises with built-in recording tools for better assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-therapy-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Speech Spark Works</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our platform connects therapists and patients in a unified experience
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-therapy-purple/20 hidden md:block"></div>
            
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right order-2 md:order-1">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">1. Therapist Assignment</h3>
                    <p className="text-gray-600">
                      Therapists assign appropriate exercises based on patient needs and therapy goals.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 relative">
                  <div className="h-12 w-12 bg-therapy-purple text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 relative order-1">
                  <div className="h-12 w-12 bg-therapy-blue text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-1/2 order-2">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">2. Patient Engagement</h3>
                    <p className="text-gray-600">
                      Patients complete fun, gamified exercises through their personalized dashboard.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right order-2 md:order-1">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">3. Progress Tracking</h3>
                    <p className="text-gray-600">
                      Results are automatically recorded and analyzed to track improvement over time.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 relative">
                  <div className="h-12 w-12 bg-therapy-orange text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 relative order-1">
                  <div className="h-12 w-12 bg-therapy-purple text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">4</span>
                  </div>
                </div>
                <div className="md:w-1/2 order-2">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">4. Data Analysis</h3>
                    <p className="text-gray-600">
                      Therapists review data, adjust treatment plans, and provide personalized feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Hear from therapists and parents about the impact of Speech Spark
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-600">LJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lisa Johnson</h4>
                  <p className="text-sm text-gray-600">Speech Therapist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Speech Spark has revolutionized my practice. My patients are more engaged and I can track their progress more effectively than ever before."
              </p>
              <div className="flex mt-4 text-therapy-orange">
                <span>★★★★★</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-600">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600">Parent of Patient</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "My son used to dread speech therapy, but now he asks to play his 'speech games' daily. The difference in his progress is remarkable."
              </p>
              <div className="flex mt-4 text-therapy-orange">
                <span>★★★★★</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-600">SB</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Brown</h4>
                  <p className="text-sm text-gray-600">Clinic Director</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Implementing Speech Spark at our clinic has improved patient outcomes and therapist efficiency. The data analytics have been invaluable."
              </p>
              <div className="flex mt-4 text-therapy-orange">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-therapy-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Speech Therapy?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join therapists and patients around the world using Speech Spark to make therapy more effective and enjoyable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="rounded-full">
                Get Started Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white/10">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Speech Spark?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Evidence-Based Approach</h3>
                    <p className="text-gray-600">Our exercises are developed by certified speech pathologists following proven methodologies.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Engaging For All Ages</h3>
                    <p className="text-gray-600">Age-appropriate games and activities that keep patients motivated and coming back.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Comprehensive Data</h3>
                    <p className="text-gray-600">Detailed analytics provide insights for therapists to tailor treatment plans effectively.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Secure & Private</h3>
                    <p className="text-gray-600">HIPAA-compliant platform ensures patient data is always protected and secure.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-therapy-blue/10 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-therapy-purple/10 rounded-full z-0"></div>
              <img 
                src="/placeholder.svg" 
                alt="Speech Spark platform" 
                className="rounded-xl shadow-lg z-10 relative w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-therapy-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-therapy-purple font-bold text-xl">ST</span>
                </div>
                <span className="font-bold text-xl">Speech Spark</span>
              </div>
              <p className="text-sm text-gray-300">
                Making speech therapy effective, engaging, and enjoyable for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">For Therapists</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">For Patients</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">For Clinics</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Research</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Speech Spark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
