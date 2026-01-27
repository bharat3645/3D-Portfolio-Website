'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO @ TechFlow",
    content: "Bharat's understanding of distributed systems is unparalleled. He didn't just build our infrastructure; he future-proofed it.",
    rating: 5,
    avatar: "SC"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Product Lead @ InnovateX",
    content: "The 3D visualization work exceeded our expectations. It's rare to find an engineer who has such a strong grasp of both aesthetics and performance.",
    rating: 5,
    avatar: "MR"
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Research Director @ AI Labs",
    content: "His contribution to our ML pipeline optimization reduced training costs by 40%. A true problem solver.",
    rating: 5,
    avatar: "EW"
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-oswald text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
            ENDORSEMENTS
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 text-white/5">
            <Quote size={120} />
          </div>
          <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 text-white/5 rotate-180">
            <Quote size={120} />
          </div>

          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : index < activeIndex ? -100 : 100,
                  pointerEvents: index === activeIndex ? 'auto' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-primary fill-accent-primary" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-white/90 font-light italic mb-8 max-w-2xl leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-accent-primary/20">
                    <AvatarFallback className="bg-white/10 text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-bold text-white font-oswald tracking-wide">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-8 bg-accent-primary" : "bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
