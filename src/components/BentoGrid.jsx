"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
    {
        title: "Premium Ingredients",
        description: "Only the finest chocolate and flour for our treats.",
        className: "md:col-span-2 md:row-span-2",
        bg: "bg-stone-800"
    },
    {
        title: "Freshly Baked",
        description: "Baked fresh every single day.",
        className: "md:col-span-1 md:row-span-1",
        bg: "bg-stone-700"
    },
    {
        title: "Community First",
        description: "A hub for locals to gather.",
        className: "md:col-span-1 md:row-span-1",
        bg: "bg-stone-600"
    },
    {
        title: "Sustainable Practices",
        description: "100% compostable packaging.",
        className: "md:col-span-3 md:row-span-1",
        bg: "bg-stone-900"
    }
]

export default function BentoGrid() {
    return (
        <section className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 md:px-20 font-outfit">
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center">Why Santap.in?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-[120vh] md:h-[80vh]">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`relative rounded-3xl overflow-hidden p-8 flex flex-col justify-end group ${item.className} ${item.bg}`}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                            <p className="text-lg text-gray-300">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
