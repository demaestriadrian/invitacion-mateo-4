import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationOptions = {
    heroSection: HTMLElement;
    video: HTMLVideoElement;
    logo: HTMLElement;
    sombra: HTMLElement;
}

// Función para animar la sección "hero" con video y texto
export function animateHero({ heroSection, video, logo, sombra }: AnimationOptions): void {

    ScrollTrigger.create({
        trigger: heroSection,
        start: "50% top",
        end: "50% bottom",
        pinSpacing: false,
        onLeave: () => video.pause(),
        onLeaveBack: () => video.play(),
    });

    gsap.from(logo, {
        opacity: 0,
        y: -50, 
        duration: 5,
        delay: 5,
        onComplete: () => {
            gsap.killTweensOf(logo);

            gsap.to(logo, {
                opacity: 0,
                y: -50,
                scale: 0.8,
                duration: .7,
                scrollTrigger: {
                    trigger: heroSection,
                    toggleActions: "play none none reverse",
                    start: "center 20%",
                    end: "center 10%",
                },
            });
        }
    })

    gsap.fromTo(sombra,
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

    gsap.to(video, {
        scrollTrigger: {
            trigger: heroSection,
            start: "center 26%",
            end: "bottom top",
            scrub: true,
        },
        y: '+=300',
    });

}