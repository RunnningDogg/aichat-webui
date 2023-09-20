import React, { useEffect, useRef, useState } from "react";

interface FadeInComponentProps {
  children?: React.ReactNode;
}

function FadeInComponent({ children }: FadeInComponentProps) {
  const [visible, setVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  // useEffect to check if domRef is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting);
        }
      });
    });
    observer.observe(domRef.current!);
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${visible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}

export default FadeInComponent;
