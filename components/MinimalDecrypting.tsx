"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SimpleDecryptedTextProps {
  text: string;
  speed?: number; // milliseconds between character changes
  delay?: number; // delay before starting animation
  className?: string;
  encryptedClassName?: string;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
}

export default function SimpleDecryptedText({
  text,
  speed = 30,
  delay = 0,
  className = "",
  encryptedClassName = "",
  triggerOnHover = false,
  triggerOnView = false,
}: SimpleDecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(!triggerOnHover && !triggerOnView);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef<number>(0);

  // Generate random character
  const getRandomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  // Encrypt text (scramble all characters)
  const encryptText = useCallback(() => {
    const encrypted = text
      .split('')
      .map(char => (char === ' ' ? ' ' : getRandomChar()))
      .join('');
    setDisplayText(encrypted);
  }, [text, getRandomChar]);

  // Decrypt text one character at a time
  const startDecryption = useCallback(() => {
    if (isAnimating || isDecrypted) return;
    
    setIsAnimating(true);
    currentIndexRef.current = 0;
    
    // Start with fully encrypted text
    encryptText();
    
    let iterations = 0;
    const maxIterationsPerChar = 3; // Number of random chars before revealing true char
    
    const animate = () => {
      if (currentIndexRef.current >= text.length) {
        // Animation complete
        if (animationRef.current) clearTimeout(animationRef.current);
        setIsAnimating(false);
        setIsDecrypted(true);
        setDisplayText(text);
        return;
      }
      
      const currentChar = text[currentIndexRef.current];
      
      if (currentChar === ' ') {
        // Skip spaces
        currentIndexRef.current++;
        animate();
        return;
      }
      
      if (iterations < maxIterationsPerChar) {
        // Show random character
        setDisplayText(prev => {
          const arr = prev.split('');
          arr[currentIndexRef.current] = getRandomChar();
          return arr.join('');
        });
        iterations++;
        animationRef.current = setTimeout(animate, speed);
      } else {
        // Reveal true character
        setDisplayText(prev => {
          const arr = prev.split('');
          arr[currentIndexRef.current] = currentChar;
          return arr.join('');
        });
        currentIndexRef.current++;
        iterations = 0;
        animationRef.current = setTimeout(animate, speed);
      }
    };
    
    // Start animation after delay
    setTimeout(() => {
      animate();
    }, delay);
  }, [text, speed, delay, isAnimating, isDecrypted, encryptText, getRandomChar]);

  // Reset to encrypted state
  const resetToEncrypted = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsAnimating(false);
    setIsDecrypted(false);
    currentIndexRef.current = 0;
    encryptText();
  }, [encryptText]);

  // Handle hover trigger
  useEffect(() => {
    if (triggerOnHover && containerRef.current) {
      const element = containerRef.current;
      const handleMouseEnter = () => {
        if (!isDecrypted && !isAnimating) {
          startDecryption();
        }
      };
      const handleMouseLeave = () => {
        if (isDecrypted || isAnimating) {
          resetToEncrypted();
        }
      };
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [triggerOnHover, isDecrypted, isAnimating, startDecryption, resetToEncrypted]);

  // Handle view trigger
  useEffect(() => {
    if (triggerOnView && containerRef.current && !isDecrypted && !isAnimating) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startDecryption();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(containerRef.current);
      
      return () => observer.disconnect();
    }
  }, [triggerOnView, isDecrypted, isAnimating, startDecryption]);

  // Auto-start animation
  useEffect(() => {
    if (!triggerOnHover && !triggerOnView && !isDecrypted && !isAnimating) {
      startDecryption();
    }
  }, [triggerOnHover, triggerOnView, isDecrypted, isAnimating, startDecryption]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.span
      ref={containerRef}
      className="inline-block whitespace-pre-wrap"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealed = !isAnimating && isDecrypted;
          const isSpace = char === ' ';
          
          if (isSpace) {
            return <span key={index}> </span>;
          }
          
          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
              style={{
                display: 'inline-block',
                transition: 'all 0.2s ease',
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}