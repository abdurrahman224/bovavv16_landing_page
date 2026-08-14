import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      text: "Working with this team has completely transformed our digital presence. Their strategic approach to SEO and content marketing delivered results beyond our expectations. We saw a 300% increase in organic traffic within just 6 months!",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO, TechStart Inc",
      text: "The level of professionalism and expertise is outstanding. They took the time to understand our business goals and created a custom strategy that actually works. Our conversion rates have doubled and our ROI speaks for itself.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Founder, GrowthLab",
      text: "I've worked with several marketing agencies before, but none compare to the dedication and results I've seen here. The team is responsive, creative, and always goes above and beyond. Highly recommend for any business looking to scale!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white section-gap font-sans">
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-[39px] hero-title font-bold text-center text-black mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          What Our Clients Are Saying
        </h2>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#F6F6F6] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-start shadow-xl card-hover animate-fade-in-up transition-smooth"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Rating Stars */}
              <div className="flex space-x-1 mb-4 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`sm:w-5 sm:h-5 ${
                      i < item.rating
                        ? "fill-orange-400 text-orange-400"
                        : "text-orange-400"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#0A0A0AE5] text-sm xl:text-base italic xl:leading-relaxed text-left  border-b border-gray-300 pb-4 ">
                {item.text}
              </p>

              {/* Client Info */}
              <div className="flex items-center pt-2 mt-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-700 transition-smooth hover:border-orange-400"
                />
                <div className="ml-3 sm:ml-4">
                  <h4 className="text-black font-bold text-base sm:text-lg">
                    {item.name}
                  </h4>
                  <p className="text-[#0A0A0A] text-sm xl:text-base">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
