
export type HeroAnimationsProps = {
    heroSection?: HTMLElement;
    video?: HTMLVideoElement;
    logo?: HTMLElement;
    heroShadow?: HTMLElement;
    arrowDown?: HTMLElement;
}

export type SectionsAnimationsProps = {
    main?: HTMLElement;
    container?: HTMLElement;
    sections?: HTMLElement[];
}

export type SpidermanAnimationsProps = {
    spidermanElement?: HTMLElement;
    hasAnimated?: boolean;
}

export type SectionsController = {
    // Variables de estado
    currentSection: number;
    isAnimating: boolean;
    isScrolling: boolean;
    sectionsLength: number;
    timeline: any;
    scrollTimeout: number;
    
    // Propiedades del DOM
    props: SectionsAnimationsProps;
    
    // Métodos de navegación
    getNearestSection: (progress: number) => number;
    goToSection: (index: number) => void;
    goToNearestSection: (direction: 'next' | 'prev' | 'current' | number) => void;
    
    // Métodos de control
    handleScroll: () => void;
    init: () => void;
    destroy: () => void;
    
    // Método para verificar si está inicializado
    isInitialized: () => boolean;
    
    // Método para detectar y animar elementos especiales
    checkSpecialAnimations: () => void;
}
