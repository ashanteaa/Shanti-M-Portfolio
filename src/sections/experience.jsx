import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "../constants";
import TitleHeader from "../components/HeroModels/TitleHeader";
import GlowCard from "../components/HeroModels/GlowCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    useGSAP(() => {
        gsap.utils.toArray(".timeline-card").forEach((card) => {
            gsap.from(card, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
            });
        });

        gsap.fromTo(".timeline-line",
            { scaleY: 0 },
            {
                scaleY: 1,
                transformOrigin: "top top",
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
            }
        );

        gsap.utils.toArray(".expText").forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                x: 50,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 70%",
                },
            });
        });
    }, []);

    return (
        <section id="experience" className="md:mt-10 mt-20 py-20">
            <div className="w-full h-full md:px-20 px-5 max-w-7xl mx-auto">
                <TitleHeader title="Work & Extracurricular Experience" />
                <div className="mt-20 relative timeline-container ml-0 md:ml-20">
                    <div className="absolute left-[2.5rem] md:left-[3rem] top-[3rem] bottom-0 w-0.5 z-0">
                        <div className="timeline-line w-full h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 origin-top" />
                    </div>

                    <div className="relative z-10 space-y-12 md:space-y-16">
                        {expCards.map((card, index) => (
                            <div key={index} className="timeline-card flex items-start gap-6 md:gap-10">
                                <div className="flex-shrink-0 relative z-20">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-900 border-4 border-black shadow-xl ring-2 ring-cyan-400/30">
                                        <img src={card.logoPath} alt={card.title} className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div className="expText flex-1 max-w-4xl">
                                    <GlowCard card={card}>
                                        <div className="p-6 md:p-8">
                                            <h1 className="font-bold text-xl md:text-2xl text-white mb-2">{card.title}</h1>
                                            <p className="text-cyan-400 font-medium mb-6">🗓️ {card.date}</p>

                                            {card.responsibilities && card.responsibilities.length > 0 ? (
                                                <ul className="space-y-3 list-disc list-inside">
                                                    {card.responsibilities.map((responsibility, idx) => (
                                                        <li key={idx} className="text-gray-300 text-sm md:text-base leading-relaxed">
                                                            {responsibility}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-400 text-sm md:text-base">
                                                    Leadership position contributing to organizational growth and team development.
                                                </p>
                                            )}
                                        </div>
                                    </GlowCard>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;