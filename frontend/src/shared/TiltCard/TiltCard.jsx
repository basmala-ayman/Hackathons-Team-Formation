import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

function TiltCard({ children, className = "", options = {} }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node) return;

    VanillaTilt.init(node, {
      max: 10,
      speed: 400,
      glare: false,
      scale: 1.02,
      perspective: 1000,
      ...options,
    });

    return () => {
      node.vanillaTilt?.destroy();
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
}

export default TiltCard;