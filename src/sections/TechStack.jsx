import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "/src/components/HeroModels/TitleHeader.jsx";
import { useState, useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
    const containerRef = useRef(null);

    const technologies = [
        { name: "HTML 5", icon: "/images/logos/html.png" },
        { name: "CSS 3", icon: "/images/logos/css.png" },
        { name: "JavaScript", icon: "/images/logos/JavaScript.png" },
        { name: "React/JS", icon: "/images/logos/react.png" },
        { name: "Tailwind CSS", icon: "/images/logos/tailwind.png" },
        { name: "Figma", icon: "/images/logos/figma.png" },
        { name: "Canva", icon: "/images/logos/Canva.png" },
        { name: "DBeaver", icon: "/images/logos/DBeaver.png" },
        { name: "Firebase", icon: "/images/logos/Firebase.png" },
        { name: "Git", icon: "/images/logos/git.png" },
        { name: "Linux", icon: "/images/logos/Linux.png" },
        { name: "MongoDB", icon: "/images/logos/mongodb.png" },
        { name: "MySQL", icon: "/images/logos/MySQL.png" },
        { name: "Python", icon: "/images/logos/python.svg" },
        { name: "Three.js", icon: "/images/logos/three.png" },
        { name: "VS Code", icon: "/images/logos/vscode.png" },
        { name: "Vite.js", icon: "/images/logos/Vite.png" },
        { name: "WebStorm", icon: "/images/logos/WebStorm.png" },
    ];

    // Animate the tech cards when scrolling into view
    useGSAP(() => {
        gsap.fromTo(
            ".tech-card-ball",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top center",
                },
            }
        );
    });

    // Mouse move handler for interactive effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const cards = document.querySelectorAll(".tech-icon-interactive");
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const angle = Math.atan2(e.clientY - cardCenterY, e.clientX - cardCenterX);
                const distance = 15;

                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                gsap.to(card, {
                    x: x,
                    y: y,
                    duration: 0.6,
                    overwrite: "auto",
                });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div id="skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="How I Can Contribute"
                />

                <div ref={containerRef} className="flex flex-row flex-wrap justify-center gap-12 py-12">
                    {technologies.map((technology) => (
                        <div
                            key={technology.name}
                            className="tech-card-ball w-28 h-28 flex flex-col items-center justify-center"
                        >
                            <div className="tech-icon-container interactive">
                                <img
                                    src={technology.icon}
                                    alt={technology.name}
                                    className="tech-icon tech-icon-interactive"
                                />
                            </div>
                            <p className="mt-2 text-center text-sm font-medium">
                                {technology.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .tech-icon-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          position: relative;
        }

        .tech-icon {
          width: 70px;
          height: 70px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1));
        }

        /* INTERACTIVE: FLOAT + MOUSE TRACKING */
        .tech-icon-container.interactive .tech-icon {
          animation: floatUp 3s ease-in-out infinite;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .tech-icon-container.interactive:hover .tech-icon {
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) brightness(1.3);
        }

        .tech-card-ball {
          transition: transform 0.3s ease;
        }

        .tech-card-ball:hover {
          transform: scale(1.1);
        }
      `}</style>
        </div>
    );
};

export default TechStack;