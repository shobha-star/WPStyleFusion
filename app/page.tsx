'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, Sparkles, Smile, Star, MapPin, 
  Phone, Mail, Menu, X, ArrowRight, CheckCircle2,
  Facebook, Instagram, Youtube, ChevronLeft, ChevronRight
} from 'lucide-react';

const SERVICES = [
  {
    icon: Smile,
    title: 'Skin',
    desc: 'Facial, Deep Clean Up, Body Polishing, Waxing'
  },
  {
    icon: Scissors,
    title: 'Hair',
    desc: 'Straightening, Keratin, Botox, Nano Plastiya, Smoothening, Cutting, Hair Spa'
  },
  {
    icon: Sparkles,
    title: 'Makeup',
    desc: 'Bridal Makeup, Party Makeup'
  },
  {
    icon: Star,
    title: 'Nails & Mehendi',
    desc: 'Pedicure, Manicure, and Mehendi'
  }
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=1000&auto=format&fit=crop",
    alt: "Indian Bridal Makeup"
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop",
    alt: "Nail Art"
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop",
    alt: "Hair Cutting"
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
    alt: "Body Polishing"
  },
  {
    src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1000&auto=format&fit=crop",
    alt: "Straightening & Smoothing"
  }
];

const TESTIMONIALS = [
  {
    text: "Style Fusion transformed my look completely! Best haircut and balayage I've ever had. Highly recommend the team here.",
    author: "Sarah Jenkins"
  },
  {
    text: "The bridal package was an absolute dream. I felt so relaxed and looked stunning for my special day.",
    author: "Elena Rodriguez"
  },
  {
    text: "A luxurious experience from start to finish. The estheticians are so knowledgeable and my skin has never felt better.",
    author: "Maya Patel"
  }
];

const BrandLogo = ({ isDarkBg = false, className = "" }: { isDarkBg?: boolean, className?: string }) => {
  return (
    <div className={`flex items-center ${className} select-none`}>
      <div className="relative flex items-center justify-center w-48 h-16 md:w-56 md:h-20 shrink-0">
        <img
          src="/logo.png"
          alt="Style Fusion Logo"
          className={`w-full h-full object-contain ${isDarkBg ? '' : 'brightness-0'}`}
        />
      </div>
    </div>
  );
};

export default function StyleFusion() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const nextGalleryImage = () => {
    setGalleryIdx((prev) => (prev + 1) % GALLERY.length);
  };

  const prevGalleryImage = () => {
    setGalleryIdx((prev) => (prev - 1 + GALLERY.length) % GALLERY.length);
  };

  // Handle scroll events for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple auto-rotating testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-pink-light selection:bg-gold selection:text-indigo-950">
      {/* NAVIGATION */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-indigo-start to-indigo-end py-3 shadow-xl' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-white">
          <a href="#home" className="group mr-16">
            <BrandLogo isDarkBg={true} className="group-hover:opacity-80 transition-opacity" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {['Home', 'About', 'Services', 'Gallery', 'Testimonials'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-widest hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="#book"
              className="bg-gold text-indigo-end font-bold px-6 py-2 rounded-full hover:bg-white hover:text-indigo-start transition-all transform hover:scale-105"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-indigo-end/95 backdrop-blur-md"
            >
              <div className="px-4 py-8 flex flex-col space-y-4">
                {['Home', 'About', 'Services', 'Gallery', 'Testimonials'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-lg font-serif border-b border-white/10 pb-2 hover:text-gold"
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gold text-center text-indigo-end font-bold px-6 py-3 rounded-md mt-4"
                >
                  Book Appointment
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2500&auto=format&fit=crop")' }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-start/80 via-indigo-start/50 to-pink-primary/40 z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-white font-bold mb-6 drop-shadow-xl"
          >
            Where Beauty <br />
            <span className="text-gold italic">Meets Innovation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Experience unparalleled elegance and cutting-edge styling in a sanctuary designed to bring out your absolute best.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a href="#book" className="w-full sm:w-auto bg-gradient-to-r from-gold to-[#B8942A] text-indigo-end font-bold px-10 py-4 rounded-full text-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center group">
              Book Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a href="#services" className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-white hover:text-indigo-start transition-colors">
              View Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-pink-primary text-indigo-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]"
            >
              <img 
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop"
                alt="Stylists working in salon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 to-transparent"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-indigo-end/60 mb-2">Our Story</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-bold mb-6">Crafting confidence since 2018</h3>
              <p className="text-lg leading-relaxed mb-6 text-indigo-end/80">
                Founded by master stylists, Style Fusion was born out of a desire to blend classical elegance with avant-garde styling techniques. We believe that true beauty stems from confidence, and our space is dedicated to cultivating both.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-indigo-end/80">
                Our hand-picked team treats every appointment as a personalized collaboration, ensuring that the results are as uniquely spectacular as the individuals we serve.
              </p>
              
              <div className="grid grid-cols-2 gap-8 text-center pt-8 border-t border-indigo-950/10">
                <div>
                  <div className="text-4xl font-serif font-bold text-indigo-end">10+</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-indigo-end/60 mt-1">Expert Artists</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold text-indigo-end">5k+</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-indigo-end/60 mt-1">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-indigo-end">Our Services</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-indigo-end/70 text-lg">Indulge in a comprehensive suite of treatments crafted to rejuvenate your hair, skin, and spirit.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-start to-indigo-end text-white hover:shadow-2xl hover:shadow-indigo-950/20 transition-all duration-300 border border-white/5 hover:border-gold/50 flex flex-col h-full transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                
                <service.icon className="w-12 h-12 text-pink-primary mb-6 group-hover:text-gold transition-colors" />
                <h3 className="font-serif text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-8 flex-grow">{service.desc}</p>
                <div className="mt-auto inline-flex justify-end text-gold font-bold">
                  <a href="#book" className="text-sm uppercase tracking-wider hover:text-white transition-colors">Book →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-indigo-end">Our Portfolio</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryIdx}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={GALLERY[galleryIdx].src} 
                  alt={GALLERY[galleryIdx].alt}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent flex items-end pb-8 px-8">
                  <h3 className="text-white font-serif text-2xl md:text-3xl drop-shadow-md">{GALLERY[galleryIdx].alt}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Controls */}
            <button 
              onClick={prevGalleryImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextGalleryImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {GALLERY.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${idx === galleryIdx ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-pink-light to-pink-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Star className="w-12 h-12 text-gold mx-auto mb-8 fill-gold" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-indigo-end">Client Love</h2>
          
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <p className="text-2xl md:text-4xl font-serif italic text-indigo-start mb-8 leading-relaxed">
                  &quot;{TESTIMONIALS[testimonialIdx].text}&quot;
                </p>
                <p className="font-bold uppercase tracking-widest text-indigo-end/60">
                  — {TESTIMONIALS[testimonialIdx].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIdx(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === testimonialIdx ? 'bg-indigo-end' : 'bg-indigo-end/20'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING / CONTACT SECTION */}
      <section id="book" className="py-24 bg-gradient-to-br from-indigo-start to-indigo-end text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10"
            >
              <h2 className="text-3xl font-serif font-bold mb-2">Reserve Your Time</h2>
              <p className="text-gray-400 mb-8">Secure your appointment today. We look forward to serving you.</p>
              
              {formStatus === 'success' ? (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-xl flex flex-col items-center text-center">
                  <CheckCircle2 size={48} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Request Received!</h3>
                  <p>We&apos;ll be in touch shortly to confirm your booking.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 border border-green-500/50 hover:bg-green-500/20 px-6 py-2 rounded-full transition-colors"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 uppercase tracking-wider" htmlFor="name">Full Name</label>
                      <input required id="name" type="text" className="w-full bg-transparent border-b border-gray-600 focus:border-gold py-2 px-1 outline-none transition-colors" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 uppercase tracking-wider" htmlFor="email">Email Address</label>
                      <input required id="email" type="email" className="w-full bg-transparent border-b border-gray-600 focus:border-gold py-2 px-1 outline-none transition-colors" placeholder="jane@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider" htmlFor="service">Select Service</label>
                    <select id="service" className="w-full bg-indigo-end border-b border-gray-600 focus:border-gold py-3 px-1 outline-none transition-colors appearance-none cursor-pointer">
                      <option value="">Choose a treatment...</option>
                      {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                      <option>Other / Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider" htmlFor="date">Preferred Date</label>
                    <input required id="date" type="date" className="w-full bg-transparent border-b border-gray-600 focus:border-gold py-2 px-1 outline-none transition-colors [color-scheme:dark]" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-gold to-[#B8942A] text-indigo-end font-bold py-4 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-wait"
                  >
                    {formStatus === 'submitting' ? 'Processing...' : 'Confirm Request'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <div className="mb-10 space-y-6 text-gray-300">
                <h2 className="text-3xl font-serif font-bold text-white mb-6">Visit Our Salon</h2>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Location</strong>
                    Road No. 5/2. Kishor Ganj, Harmu Road,<br/>Ranchi
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Phone</strong>
                    +91 9110085934<br/>+91 8406865837
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Email</strong>
                    hello@stylefusion.com
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="w-full flex-grow min-h-[300px] bg-indigo-start border border-white/10 rounded-3xl overflow-hidden relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Map Location Placeholder" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/40 group-hover:bg-transparent transition-colors">
                  <div className="bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20 rounded-full flex items-center text-white">
                    <MapPin size={18} className="mr-2 text-gold" />
                    Open in Maps
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-indigo-start pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="mb-6">
                <BrandLogo isDarkBg={true} />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Where beauty meets innovation. A premier destination for transformational styling and rejuvenation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:bg-white/10 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#E4405F] hover:bg-white/10 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:bg-white/10 transition-colors">
                  <span className="sr-only">Youtube</span>
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Gallery', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-gold transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-white font-bold uppercase tracking-wider mb-4">Opening Hours</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-white">Monday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-white">Tuesday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-white">Wednesday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-white">Thursday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-white">Friday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-white">Saturday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-medium text-gold">Sunday</span>
                  <span className="text-gold">10:00 AM - 7:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Style Fusion Professional Ladies Salon. All rights reserved.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
