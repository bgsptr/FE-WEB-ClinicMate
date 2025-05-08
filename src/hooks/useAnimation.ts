import { RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// useAnimation.ts
export const useAnimation = (sectionRef: RefObject<HTMLDivElement>) => {
    if (!sectionRef.current) return;
  
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200px",
          scrub: 1,
          pin: true,
        //   markers: true,
        },
      });
    }, sectionRef);
  
    return () => ctx.revert();
  };
  