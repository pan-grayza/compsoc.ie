import { motion } from 'framer-motion'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const HeroComponent = () => {
    let strarray = [
        'Computer',
        'Developer',
        'Technology',
        'Artificial Intelligence',
        'Cybersecurity',
        'Computer',
    ]
    const text = useTypewriter(strarray, 100, 1000)
    return (
        <section
            className={cn(
                'bg-transperent bg-center bg-cover relative flex justify-center items-center w-full h-[calc(100vh-4.5rem)] md:h-screen',
                'before:bg-black/30 before:absolute before:inset-0',
            )}
        >
            {/* 
            in case of mobile menu height change, change height of section element to h-[calc(100vh-x)] where x is the height of the mobile menu.
            */}
            <div className="relative text-left px-4 w-full max-w-4xl">
                <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-["Raleway",_sans-serif] font-bold mb-2 md:mb-4'>
                    University Of Galway's
                </h1>
                <p className='text-white text-lg sm:text-xl md:text-2xl font-["Poppins",_sans-serif] h-16 sm:h-20 md:h-24 flex flex-row justify-start items-center'>
                    <motion.span
                        animate={{
                            opacity: [0, 1],
                            transition: { duration: 0.3 },
                        }}
                        className="inline-flex"
                    >
                        <span className="relative">
                            {text.split('').map((char, index) => (
                                <span key={index} className="relative inline-block">
                                    {char === ' ' ? (
                                        <>
                                            <span>&nbsp;</span>
                                        </>
                                    ) : (
                                        <>{char}</>
                                    )}
                                    <span className="absolute bottom-[-0.25rem] left-0 w-full h-0.5 bg-accent"></span>
                                </span>
                            ))}
                        </span>
                        <motion.span
                            className="relative h-fit inline-block"
                            animate={{
                                opacity: [0, 1, 0],
                                transition: {
                                    duration: 0.8,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                },
                            }}
                        >
                            <span>|</span>
                            <span className="absolute bottom-[-0.25rem] left-0 w-full h-0.5 bg-accent"></span>
                        </motion.span>
                    </motion.span>
                    <span> Society</span>
                </p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-accent-foreground">
                        Keep scrolling
                    </span>
                    <ChevronDown className="w-6 h-6 text-accent" />
                </div>
            </motion.div>
        </section>
    )
}

export default HeroComponent
