import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import type { HeroAnimationsProps, SectionsAnimationsProps } from "./animations.d";

const HeroProps = {} as HeroAnimationsProps;
const SectionsProps = {} as SectionsAnimationsProps;

export const setHeroAnimation = (props: HeroAnimationsProps) => Object.assign(HeroProps, props);

export const setSectionsAnimation = (props: SectionsAnimationsProps) => Object.assign(SectionsProps, props);

export const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

    try {
        initHeroAnimation();
        initSectionsAnimation();
    } catch (error) {
        console.error("Error initializing animations:", error);
    }
}

const initHeroAnimation = () => {
    if (!HeroProps.heroSection || !HeroProps.video || !HeroProps.logo || !HeroProps.heroShadow || !HeroProps.arrowDown)
        throw new Error("Hero animation elements are not properly set.");

    const { heroSection, video, logo, heroShadow, arrowDown } = HeroProps;


    // Control de reproducción del video al hacer scroll
    ScrollTrigger.create({
        trigger: heroSection,
        start: "50% top",
        end: "50% bottom",
        pinSpacing: false,
        onLeave: () => video.pause(),
        onLeaveBack: () => video.play(),
    });

    //Animación del logo 🕷️
    gsap.from(logo, {
        opacity: 0,
        sacale: 0.7,
        duration: 4,
        delay: 3.5,
        onComplete: () => {
            gsap.killTweensOf(logo);

            gsap.to(logo, {
                opacity: 0,
                y: -50,
                scale: 0.8,
                duration: .6,
                scrollTrigger: {
                    trigger: heroSection,
                    toggleActions: "play none reverse none",
                    start: "center top",
                    end: "center top",
                },
            });
        }
    })

    // Animación de la sombra al hacer scroll 🌑
    gsap.fromTo(heroShadow,
        {
            opacity: 0,
        },
        {
            scrollTrigger: {
                trigger: heroSection,
                start: "center 30%",
                end: "center top",
                scrub: true,
            },
            opacity: 1,
        }
    );

    // Animación del video al hacer scroll 🎥
    gsap.to(video, {
        scrollTrigger: {
            trigger: heroSection,
            start: "center 26%",
            end: "bottom top",
            scrub: true,
        },
        y: '+=300',
    });

    // Animación de la flecha ⬇️
    gsap.to(arrowDown, {
        opacity: .85,
        y: -50,
        duration: 5,
        delay: 7,
        onComplete: () => {
            gsap.killTweensOf(arrowDown);

            gsap.to(arrowDown, {
                scrollTrigger: {
                    trigger: heroSection,
                    start: "center 26%",
                    end: "bottom top",
                    scrub: true,
                },
                opacity: 0,
            });
        }
    });

    video.play();
}

const initSectionsAnimation = () => {
    if (!SectionsProps.main || !SectionsProps.container || !SectionsProps.sections)
        throw new Error("Sections animation elements are not properly set.");

    const { main, container, sections } = SectionsProps;
    const numSections = sections.length;
    // Variables de control
    let currentSection = 0;
    let isAnimating = false;
    let isScrolling = false;
    let scrollTimeout: number;

    // Función para detectar cuando el scroll termina
    const handleScroll = () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150) as unknown as number; // tiempo en ms para considerar que el scroll terminó
    };

    // Agregar detector de scroll
    window.addEventListener('scroll', handleScroll);

    container.style.width = `${numSections * 100}vw`;
    container.style.backgroundSize = `calc(115% / ${numSections}) auto`;

    const tl = gsap.to(container, {
        x: () => `-${container.scrollWidth - main.clientWidth}px`,
        ease: "none",
        scrollTrigger: {
            trigger: main,
            start: "top top",
            end: () => `+=${container.scrollWidth - main.clientWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
                snapTo: (value) => {
                    let progress = value * (sections.length - 1);
                    currentSection = Math.round(progress);
                    return currentSection / (sections.length - 1);
                },
                duration: 0.5,
                ease: "power2.inOut",
                directional: false
            }
        },
    });

    // Función para navegar a una sección específica
    function goToSection(index: number) {
        if (isAnimating) return; // Si está animando, no hacer nada
        
        isAnimating = true; // Activar el flag de animación
        
        const progress = index / (sections.length - 1);
        const scrollTrigger = tl.scrollTrigger;
        
        if (scrollTrigger) {
            const targetScroll = gsap.utils.mapRange(
                0, 
                1, 
                scrollTrigger.start, 
                scrollTrigger.end, 
                progress
            );
            
            gsap.to(window, {
                scrollTo: targetScroll,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    isAnimating = false; // Desactivar el flag cuando termina
                }
            });
        }
    }

    // Configuración del Observer para detectar swipes
    Observer.create({
        target: main,
        type: "touch",
        tolerance: 50,
        onRight: () => {
            if (!isAnimating && !isScrolling && currentSection > 0) {
                goToSection(currentSection - 1);
            }
        },
        onLeft: () => {
            if (!isAnimating && !isScrolling && currentSection < sections.length - 1) {
                goToSection(currentSection + 1);
            }
        }
    });

    // Limpiar el event listener cuando el componente se desmonte
    document.addEventListener('astro:unmount', () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
    });
}
