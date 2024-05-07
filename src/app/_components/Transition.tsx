'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// https://www.letsbuildui.dev/articles/animated-page-transitions-in-nextjs/

 

// const variants: Variant = { 
const variants = { 
    inactive: { //  This describes how the page should display either before animating out or after animating in
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeInOut'
        },
    },
    out: { //  describes what happens as part of the exit prop when we are transitioning to a new page and the current one is unmounting
        opacity: 0,
        y: -100,
        transition: {
        duration: 1,
        ease: 'easeInOut'
        }
    },
    in: { // describes the animation when the new page mounts
        y: 100,
        opacity: 0,
        transition: {
          duration: 1,
          ease: 'easeInOut'
        }
    }
};
    
export default function Transition({ children }){
    const pathname = usePathname();
    return (

        <div className="effect-1">
            <AnimatePresence
            initial={false}
            mode="wait"
            >
                <motion.div
                key={pathname}
                variants={variants}
                initial="in"
                animate="inactive"
                exit="out"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    )
};

