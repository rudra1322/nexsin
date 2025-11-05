"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import "./CardNav.css";
import { useRouter } from "next/navigation";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface NavButton {
  label: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  href?: string;
}

export interface CardNavProps {
  items: CardNavItem[];
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  className?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  navButtons?: NavButton[];
  UploadAvatarComponent?: React.ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  items,
  className = "",
  buttonBgColor = "#111",
  buttonTextColor = "#fff",
  navButtons = [],
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search...",
  UploadAvatarComponent,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | undefined)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navigate = useRouter();
  const goToLoginPage = () => navigate.push("/login");

  /** Calculate expanded height for GSAP animation */
  const calculateHeight = useCallback((): number => {
    const navEl = navRef.current;
    if (!navEl) return 60;

    const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement | null;
    if (!contentEl) return 60;

    const oldStyles = {
      visibility: contentEl.style.visibility,
      pointerEvents: contentEl.style.pointerEvents,
      position: contentEl.style.position,
      height: contentEl.style.height,
    };

    contentEl.style.visibility = "visible";
    contentEl.style.pointerEvents = "auto";
    contentEl.style.position = "static";
    contentEl.style.height = "auto";

    const height = contentEl.scrollHeight + 60;
    Object.assign(contentEl.style, oldStyles);
    return height;
  }, []);

  /** Create GSAP open/close timeline */
  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const visibleCards = cardsRef.current.filter(Boolean);

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(visibleCards, { y: 20, autoAlpha: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, {
      height: calculateHeight(),
      overflow: "visible", // allow dropdowns to escape
      duration: 0.3,
      ease: "power3.out",
    });
    tl.to(
      visibleCards,
      { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.05 },
      "-=0.15"
    );

    return tl;
  }, [calculateHeight]);

  /** ✅ Fixed useLayoutEffect typing */
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      if (tl) tl.kill();
    };
  }, [createTimeline]);

  /** Toggle GSAP menu */
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  /** ✅ Correctly typed ref setter */
  const setCardRef = (i: number) => (el: HTMLDivElement | null): void => {
    cardsRef.current[i] = el ?? undefined;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? "open" : ""}`}>
        <div className="card-nav-top">
          {/* Hamburger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Logo placeholder */}
          <div className="logo-container"></div>

          {/* Search Bar */}
          {showSearch && (
            <form
              className="nav-search-form"
              onSubmit={handleSearchSubmit}
              style={{ marginRight: "-2rem" }}
            >
              <input
                type="text"
                className="nav-search-input"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          )}

          {/* Buttons + Avatar */}
          <div className="nav-buttons">
            {navButtons.map((btn, i) => (
              <button
                key={i}
                onClick={goToLoginPage}
                className="card-nav-cta-button"
                style={{
                  backgroundColor: btn.bgColor || buttonBgColor,
                  color: btn.textColor || buttonTextColor,
                  marginLeft: "0.5rem",
                }}
              >
                {btn.label}
              </button>
            ))}

            {/* ✅ Avatar Wrapper */}
            {UploadAvatarComponent && (
              <div
                style={{
                  pointerEvents: "auto",
                  position: "relative",
                  zIndex: 1000,
                  marginLeft: "0.5rem",
                }}
              >
                {UploadAvatarComponent}
              </div>
            )}
          </div>
        </div>

        {/* Cards Section */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={i}
                    className="nav-card-link"
                    href={lnk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GoArrowUpRight />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
