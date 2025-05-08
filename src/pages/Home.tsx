import { useEffect, useRef } from "react";
import { useAnimation } from "../hooks/useAnimation";

// Home.tsx
export const Home = () => {
    const momRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const cleanup = useAnimation(momRef);
      return cleanup;
    }, []);
  
    return (
      <div>
        <div ref={momRef} className="bg-blue-100 w-full h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Scroll Me</h1>
        </div>
        <div className="bg-green-100 w-full h-[200vh] flex items-center justify-center">
          <p>The Courage to Reveal Yourself Will Stir People's Hearts.</p>
        </div>
      </div>
    );
  };
  