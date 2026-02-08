"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/#about" },
    { title: "Locations", href: "/#locations" },
    { title: "Shop", href: "/#shop" },
    { title: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVars = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0],
            },
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }
    };

    const containerVars = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.09,
                staggerDirection: 1,
            },
        },
    };

    const mobileLinkVars = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.5,
                ease: [0.37, 0, 0.63, 1],
            },
        },
        open: {
            y: 0,
            transition: {
                ease: [0, 0.55, 0.45, 1],
                duration: 0.7,
            },
        },
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference text-white">
                <div className="text-2xl font-bold font-outfit uppercase tracking-tight">Santap.in</div>
                <button onClick={toggleMenu} className="text-3xl focus:outline-none">
                    {isOpen ? <HiX /> : <HiMenuAlt4 />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-[#d2b48c] text-[#0a0a0a] z-30 origin-top flex flex-col justify-center items-center"
                    >
                        <div className="flex flex-col h-full justify-center">
                            <motion.div
                                variants={containerVars}
                                initial="initial"
                                animate="open"
                                exit="initial"
                                className="flex flex-col gap-4 items-center"
                            >
                                {navLinks.map((link, index) => (
                                    <div key={index} className="overflow-hidden">
                                        <motion.a
                                            variants={mobileLinkVars}
                                            href={link.href}
                                            onClick={toggleMenu}
                                            className="text-5xl md:text-7xl font-bold uppercase hover:text-white transition-colors duration-300 font-outfit"
                                        >
                                            {link.title}
                                        </motion.a>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="absolute bottom-10 w-full flex justify-between px-10 text-lg uppercase font-medium">
                            <div>
                                <p>Instagram</p>
                                <p>Twitter</p>
                            </div>
                            <div className="text-right">
                                <p>hello@santap.in</p>
                                <p>Jakarta, Indonesia</p>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
