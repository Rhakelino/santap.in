"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ isLoading, progress }) {

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }} // Slide up slightly on exit
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-[#ededed]"
                >
                    <div className="flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-outfit"
                        >
                            Santap.in
                        </motion.h1>
                        <div className="mt-4 h-1 w-64 bg-gray-800 rounded overflow-hidden relative">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress * 100}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
