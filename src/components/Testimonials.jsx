"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const testimonials = [
    {
        quote: "The best cookies I've ever had. Soft and chewy!",
        author: "Jane Doe",
        role: "Cookie Lover"
    },
    {
        quote: "Santap.in brownies are dangerously good.",
        author: "John Smith",
        role: "Foodie"
    },
    {
        quote: "Perfect sweetness and amazing texture.",
        author: "Alice Johnson",
        role: "Regular Customer"
    }
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="h-screen bg-[#d2b48c] text-[#0a0a0a] flex flex-col justify-center items-center relative overflow-hidden font-outfit">
            <div className="absolute top-20 left-20 text-xl uppercase tracking-widest font-bold opacity-50">
                Testimonials
            </div>

            <div className="max-w-4xl text-center px-6 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            "{testimonials[current].quote}"
                        </p>
                        <div>
                            <p className="text-xl font-bold uppercase">{testimonials[current].author}</p>
                            <p className="text-sm opacity-60 uppercase tracking-widest">{testimonials[current].role}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-20 right-20 flex gap-4">
                <button onClick={prev} className="p-4 border border-black rounded-full hover:bg-black hover:text-[#d2b48c] transition-colors">
                    <HiArrowLeft size={24} />
                </button>
                <button onClick={next} className="p-4 border border-black rounded-full hover:bg-black hover:text-[#d2b48c] transition-colors">
                    <HiArrowRight size={24} />
                </button>
            </div>
        </section>
    )
}
