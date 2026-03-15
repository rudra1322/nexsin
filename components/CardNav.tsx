"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  logo?: React.ReactNode;
}

const CardNav: React.FC<CardNavProps> = ({
  items,
  className = "",
  buttonBgColor = "#6366f1",
  buttonTextColor = "#fff",
  navButtons = [],
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search...",
  UploadAvatarComponent,
  logo,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Flare Focus State
  const [isMobile, setIsMobile] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | undefined)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navigate = useRouter();
  const goToLoginPage = () => navigate.push("/login");

  // Handle scroll effect and responsive detection
  useEffect(() => {
    const handleScroll = () => {
      // Logic for the Flare scroll transition - triggers after 40px of scroll
      setIsScrolled(window.scrollY > 40);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /** Calculate expanded height for GSAP animation */
  const calculateHeight = useCallback((): number => {
    const navEl = navRef.current;
    if (!navEl) return 60;

    const contentEl = navEl.querySelector(
      ".card-nav-content",
    ) as HTMLElement | null;
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
      overflow: "visible",
      duration: 0.3,
      ease: "power3.out",
    });
    tl.to(
      visibleCards,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.2,
        stagger: 0.08,
        ease: "back.out(1.2)",
      }, // Flare Bounce
      "-=0.15",
    );

    return tl;
  }, [calculateHeight]);

  /** Fixed useLayoutEffect typing */
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

  /** Correctly typed ref setter */
  const setCardRef =
    (i: number) =>
    (el: HTMLDivElement | null): void => {
      cardsRef.current[i] = el ?? undefined;
    };

  // Styles object
  const styles = {
    wrapper: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      // Transition from 0 padding (top of page) to floating padding
      padding: isScrolled ? (isMobile ? "0.5rem" : "1.2rem") : "0rem",
      pointerEvents: "none" as const,
      transition: "padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    container: {
      // Transition from 100% width to floating pill width
      maxWidth: isScrolled ? "1100px" : "100%",
      margin: "0 auto",
      pointerEvents: "auto" as const,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: isScrolled ? "translateY(0rem)" : "translateY(0)",
      width:
        isSearchFocused && !isMobile ? "100%" : isScrolled ? "94%" : "100%",
      backgroundColor: "transparent", // Fixed typo and made always transparent
    },
    nav: {
      position: "relative" as const,
      // Combined and fixed the typo for backdropFilter
      backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",

      // Background matches background when not scrolled
      background: isScrolled ? "rgba(255, 255, 255, 0.12)" : "transparent",

      // Transition from sharp edges to pill-shaped radius
      borderRadius: isScrolled ? (isMobile ? "14px" : "50px") : "0px",

      // Hide border when not scrolled to match background perfectly
      border: isScrolled
        ? "1px solid rgba(255, 255, 255, 0.2)"
        : "1px solid transparent",

      // Shadow only when scrolled (set alpha to 0.1 or 0.2 to actually see it)
      boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",

      overflow: "hidden",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      flexDirection: "column" as const,
      height: isExpanded ? undefined : "64px",
    },
    navOpen: {
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0)",
    },
    topSection: {
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isScrolled ? "0 1.5rem" : "0 2.5rem",
      zIndex: 2,
      transition: "padding 0.4s ease",
    },
    logoContainer: {
      flex: isSearchFocused ? 0 : 1,
      opacity: isSearchFocused ? 0 : 1,
      display: isSearchFocused && !isMobile ? "none" : "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease",
    },
    logo: {
      height: isMobile ? "26px" : "32px",
      width: "auto",
    },
    defaultLogo: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: 700,
      fontSize: "1.25rem",
      color: "#fff",
    },
    logoIcon: {
      fontSize: "1.5rem",
      filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))",
    },
    logoText: {
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    hamburger: {
      display: isSearchFocused ? "none" : "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      gap: "6px",
      cursor: "pointer",
      zIndex: 2000,
      transition: "0.2s ease",
      padding: "8px",
    },
    hamburgerLine: {
      width: "28px",
      height: "2px",
      backgroundColor: "#fff",
      transition: "transform 0.25s ease, opacity 0.2s ease",
      transformOrigin: "center",
    },
    hamburgerLineOpenFirst: {
      transform: "translateY(6px) rotate(45deg)",
    },
    hamburgerLineOpenLast: {
      transform: "translateY(-6px) rotate(-45deg)",
    },
    ctaButton: {
      backgroundColor: buttonBgColor,
      color: buttonTextColor,
      border: "none",
      borderRadius: "0.5rem",
      padding: isMobile ? "0 0.75rem" : "0 1rem",
      height: isMobile ? "42px" : "50px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontSize: isMobile ? "14px" : "inherit",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "absolute" as const,
      top: "64px",
      left: 0,
      right: 0,
      padding: isMobile ? "0.75rem" : "0.75rem 1rem",
      display: "flex",
      gap: "12px",
      flexWrap: "wrap" as const,
      justifyContent: "center",
      alignItems: "flex-start",
      visibility: isExpanded ? ("visible" as const) : ("hidden" as const),
      opacity: isExpanded ? 1 : 0,
      transform: isExpanded ? "translateY(0)" : "translateY(-10px)",
      pointerEvents: isExpanded ? ("auto" as const) : ("none" as const),
      transition: "all 0.3s ease",
      background: isMobile ? "rgba(0, 0, 0, 0.6)" : "transparent",
      borderRadius: isMobile ? "0 0 12px 12px" : "0",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
    },
    card: {
      flex: isMobile ? "1 1 auto" : "1 1 220px",
      width: isMobile ? "100%" : "auto",
      borderRadius: "13px",
      padding: "12px 16px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      backdropFilter: "blur(15px) saturate(180%)",
      WebkitBackdropFilter: "blur(15px) saturate(180%)",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.25s ease, background 0.25s ease",
    },
    cardHover: {
      transform: "translateY(-3px)",
      background: "rgba(255, 255, 255, 0.15)",
    },
    cardLabel: {
      fontWeight: 600,
      fontSize: isMobile ? "16px" : "18px",
      color: "#fff",
    },
    cardLinks: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column" as const,
      gap: "4px",
    },
    cardLink: {
      fontSize: isMobile ? "14px" : "15px",
      textDecoration: "none",
      color: "#ddd",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      padding: "4px",
      borderRadius: "4px",
    },
    searchForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      flex: isSearchFocused ? "1" : "0 1 200px",
      maxWidth: isSearchFocused ? "100%" : "200px",
      marginRight: isMobile ? "0" : "1rem",
    },
    searchInput: {
      padding: "10px 18px 10px 40px",
      borderRadius: "50px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backgroundColor: isSearchFocused
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.08)",
      color: "#fff",
      width: "100%",
      fontSize: isMobile ? "13px" : "14px",
      outline: "none",
      transition: "all 0.3s ease",
      boxShadow: isSearchFocused ? "0 0 15px rgba(59, 130, 246, 0.3)" : "none",
    },
    navButtons: {
      display: isSearchFocused ? "none" : "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginLeft: "0.5rem",
    },
    avatarWrapper: {
      pointerEvents: "auto" as const,
      position: "relative" as const,
      zIndex: 1000,
      marginLeft: "0.5rem",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginLeft: "auto",
      flex: isSearchFocused ? 1 : "initial",
    },
  };

  return (
    <div style={styles.wrapper} className={className}>
      <div style={styles.container}>
        <nav
          ref={navRef}
          style={{
            ...styles.nav,
            ...(isExpanded ? styles.navOpen : {}),
          }}
        >
          <div style={styles.topSection}>
            {/* Hamburger */}
            <div
              style={styles.hamburger}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              tabIndex={0}
            >
              <div
                style={{
                  ...styles.hamburgerLine,
                  ...(isHamburgerOpen ? styles.hamburgerLineOpenFirst : {}),
                }}
              />
              <div
                style={{
                  ...styles.hamburgerLine,
                  ...(isHamburgerOpen ? styles.hamburgerLineOpenLast : {}),
                }}
              />
            </div>

            {/* Logo */}
            <div style={styles.logoContainer}>
              {logo || (
                <div style={styles.defaultLogo}>
                  <span style={styles.logoIcon}>⚡</span>
                  <span style={styles.logoText}>Flare</span>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div style={styles.rightSection}>
              {/* Search */}
              {showSearch && (
                <form style={styles.searchForm} onSubmit={handleSearchSubmit}>
                  <div style={{ position: "relative", width: "100%" }}>
                    <FiSearch
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: isSearchFocused ? "#3b82f6" : "#fff",
                        transition: "0.3s",
                      }}
                    />
                    <input
                      type="text"
                      style={styles.searchInput}
                      placeholder={searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </div>
                </form>
              )}

              {/* Buttons */}
              <div style={styles.navButtons}>
                {navButtons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.onClick || goToLoginPage}
                    style={styles.ctaButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#333";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = buttonBgColor;
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Avatar */}
              {UploadAvatarComponent && (
                <div style={styles.avatarWrapper}>{UploadAvatarComponent}</div>
              )}
            </div>
          </div>

          {/* Cards Content */}
          <div
            className="card-nav-content"
            style={styles.content}
            aria-hidden={!isExpanded}
          >
            {items?.map((item, idx) => (
              <div
                key={idx}
                ref={setCardRef(idx)}
                style={{
                  ...styles.card,
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.08)";
                }}
              >
                <div style={styles.cardLabel}>{item.label}</div>
                <div style={styles.cardLinks}>
                  {item.links?.map((lnk, i) => (
                    <Link
                      key={i}
                      href={lnk.href}
                      style={styles.cardLink}
                      onClick={() => {
                        setIsHamburgerOpen(false);
                        setIsExpanded(false);
                        tlRef.current?.reverse();
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.8";
                        e.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <GoArrowUpRight />
                      {lnk.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CardNav;
