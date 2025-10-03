import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import type { HeroAnimationsProps, SectionsAnimationsProps, SectionsController } from "./animations.d";

const HeroProps = {} as HeroAnimationsProps;
const SectionsProps = {} as SectionsAnimationsProps;

// Controlador de secciones que encapsula toda la lógica de navegación
const sectionsController: SectionsController = {
    // Variables de estado
    currentSection: 0,
    isAnimating: false,
    isScrolling: false,
    sectionsLength: 0,
    timeline: null,
    scrollTimeout: 0,
    
    // Propiedades del DOM
    props: {},
    
    // Método para verificar si está inicializado
    isInitialized() {
        return this.sectionsLength > 0 && this.timeline !== null;
    },
    
    // Función para detectar la sección más cercana basada en el progreso del scroll
    getNearestSection(progress: number): number {
        if (this.sectionsLength === 0) return 0;
        const sectionProgress = progress * (this.sectionsLength - 1);
        return Math.round(sectionProgress);
    },
    
    // Función para navegar a una sección específica
    goToSection(index: number) {
        if (this.isAnimating || !this.timeline || this.sectionsLength === 0) return;
        
        this.isAnimating = true;
        
        const progress = index / (this.sectionsLength - 1);
        const scrollTrigger = this.timeline.scrollTrigger;
        
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
                    this.isAnimating = false;
                }
            });
        }
    },
    
    // Función para navegar a la sección más cercana en una dirección específica
    goToNearestSection(direction: 'next' | 'prev' | 'current' | number = 'current') {
        if (this.isAnimating || this.sectionsLength === 0) return;
        
        let targetSection: number;
        
        if (typeof direction === 'number') {
            // Ir a una sección específica
            targetSection = Math.max(0, Math.min(direction, this.sectionsLength - 1));
        } else {
            switch (direction) {
                case 'next':
                    targetSection = Math.min(this.currentSection + 1, this.sectionsLength - 1);
                    break;
                case 'prev':
                    targetSection = Math.max(this.currentSection - 1, 0);
                    break;
                case 'current':
                default:
                    targetSection = this.currentSection;
                    break;
            }
        }
        
        this.goToSection(targetSection);
    },
    
    // Función para detectar cuando el scroll termina
    handleScroll() {
        this.isScrolling = true;
        clearTimeout(this.scrollTimeout);
        
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 150) as unknown as number;
    },
    
    // Método de inicialización
    init() {
        if (!this.props.main || !this.props.container || !this.props.sections) {
            throw new Error("Sections animation elements are not properly set.");
        }

        const { main, container, sections } = this.props;
        const numSections = sections.length;
        
        // Actualizar variables de estado
        this.sectionsLength = numSections;
        this.currentSection = 0;
        this.isAnimating = false;
        this.isScrolling = false;

        // Agregar detector de scroll
        window.addEventListener('scroll', () => this.handleScroll());

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
                        this.currentSection = this.getNearestSection(value);
                        return this.currentSection / (this.sectionsLength - 1);
                    },
                    duration: 0.5,
                    ease: "power2.inOut",
                    directional: false
                }
            },
        });

        // Guardar referencia al timeline
        this.timeline = tl;

        // Configuración del Observer para detectar swipes
        Observer.create({
            target: main,
            type: "touch",
            tolerance: 50,
            onRight: () => {
                if (!this.isAnimating && !this.isScrolling && this.currentSection > 0) {
                    this.goToNearestSection('prev');
                }
            },
            onLeft: () => {
                if (!this.isAnimating && !this.isScrolling && this.currentSection < this.sectionsLength - 1) {
                    this.goToNearestSection('next');
                }
            }
        });
    },
    
    // Método de destrucción/limpieza
    destroy() {
        window.removeEventListener('scroll', () => this.handleScroll());
        clearTimeout(this.scrollTimeout);
        this.timeline = null;
        this.sectionsLength = 0;
        this.currentSection = 0;
        this.isAnimating = false;
        this.isScrolling = false;
        this.props = {};
    }
};

// Variable global para acceso externo al controlador
let sectionsNavigator: ((direction: 'next' | 'prev' | 'current' | number) => void) | null = null;

export const setHeroAnimation = (props: HeroAnimationsProps) => Object.assign(HeroProps, props);

export const setSectionsAnimation = (props: SectionsAnimationsProps) => {
    Object.assign(SectionsProps, props);
    sectionsController.props = props;
};

// Función para acceder al controlador de secciones (útil para debugging o control externo)
export const getSectionsController = () => sectionsController;

export const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

    try {
        initSectionsAnimation(); // Primero inicializar las secciones para tener disponible el navigator
        initHeroAnimation();
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

    arrowDown.addEventListener("click", () => {
        // Usar la función unificada para ir a la primera sección (sección 0)
        if (sectionsNavigator) {
            sectionsNavigator(0);
        } else {
            // Fallback al comportamiento anterior si el navigator no está disponible
            gsap.to(window, {
                scrollTo: {
                    y: "#mainSection",
                    autoKill: false
                },
                duration: 1,
                ease: "power2.inOut"
            });
        }
    })

    video.play();
}

const initSectionsAnimation = () => {
    try {
        // Inicializar el controlador de secciones
        sectionsController.init();
        
        // Hacer la función de navegación disponible globalmente
        sectionsNavigator = sectionsController.goToNearestSection.bind(sectionsController);
        
        // Limpiar recursos cuando el componente se desmonte
        document.addEventListener('astro:unmount', () => {
            sectionsController.destroy();
            sectionsNavigator = null;
        });
        
    } catch (error) {
        console.error("Error initializing sections animation:", error);
        throw error;
    }
}
