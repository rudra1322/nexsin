"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Clock,
  Layers,
  HeartHandshake,
  Users,
  GraduationCap,
  Target,
  CheckCircle,
  Briefcase,
  Mail,
  Loader2,
} from "lucide-react";

/* ======================================================
   SHARED STYLES (FIXED COLORS – THEME INDEPENDENT)
====================================================== */
const COLORS = {
  bg: "#0A0D17",
  sectionDark: "#020617",
  card: "#0F172A",
  border: "#1E293B",
  primary: "#38BDF8",
  text: "#FFFFFF",
  textMuted: "#94A3B8",
  textSoft: "#CBD5E1",
};

/* ======================================================
   REUSABLE BUTTON WITH SPINNER
====================================================== */
function ActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => Promise<void> | void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    await onClick();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        backgroundColor: COLORS.primary,
        color: "#020617",
        padding: "14px 32px",
        borderRadius: 14,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {label}
    </button>
  );
}

/* ======================================================
   MAIN CAREERS PAGE
====================================================== */
export default function CareersPage() {
  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>

      {/* ======================================================
         HERO SECTION
      ====================================================== */}
      <section
        style={{
          padding: "8rem 1.5rem",
          background:
            "radial-gradient(circle at top, #1E293B 0%, #0A0D17 60%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "3.8rem", fontWeight: 800 }}>
            Careers at{" "}
            <span style={{ color: COLORS.primary }}>Our Company</span>
          </h1>

          <p
            style={{
              marginTop: 32,
              fontSize: "1.25rem",
              color: COLORS.textSoft,
              lineHeight: 1.9,
              maxWidth: 820,
              marginInline: "auto",
            }}
          >
            We are building large-scale, production-grade products that solve
            real problems for real users. Our teams focus on ownership,
            sustainability, and long-term impact rather than short-term wins.
          </p>

          <p style={{ marginTop: 20, color: COLORS.textMuted }}>
            Remote-first · Product-led · Engineering-driven
          </p>

          <div
            style={{
              marginTop: 48,
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <ActionButton label="View Open Roles" />
            <a
              href="#about"
              style={{
                border: `1px solid ${COLORS.border}`,
                padding: "14px 32px",
                borderRadius: 14,
                color: COLORS.textSoft,
                fontWeight: 600,
              }}
            >
              Learn About Us
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
         ABOUT COMPANY
      ====================================================== */}
      <section id="about" style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700, textAlign: "center" }}>
            About Our Company
          </h2>

          <p style={{ marginTop: 28, color: COLORS.textSoft, lineHeight: 1.9 }}>
            Our Company was founded with a simple idea: build software that is
            reliable, maintainable, and genuinely useful. We believe that great
            products are built by teams who care deeply about quality,
            collaboration, and user experience.
          </p>

          <p style={{ marginTop: 18, color: COLORS.textMuted, lineHeight: 1.9 }}>
            We operate as a flat, transparent organization where engineers,
            designers, and product managers work closely together. Decisions are
            documented, feedback is encouraged, and ownership is clearly defined.
          </p>
        </div>
      </section>

      {/* ======================================================
         VALUES
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem", backgroundColor: COLORS.sectionDark }}>
        <h2 style={{ textAlign: "center", fontSize: "2.6rem", fontWeight: 700 }}>
          Our Core Values
        </h2>

        <div
          style={{
            marginTop: 64,
            maxWidth: 1200,
            marginInline: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 28,
          }}
        >
          {[
            {
              icon: Target,
              title: "Clarity & Focus",
              desc:
                "We prioritize clear goals, clear ownership, and clear communication at every level.",
            },
            {
              icon: Layers,
              title: "Engineering Excellence",
              desc:
                "Clean architecture, readable code, and maintainability are non-negotiable.",
            },
            {
              icon: Users,
              title: "Collaboration",
              desc:
                "We work as one team. Strong opinions are welcome, but humility is expected.",
            },
            {
              icon: HeartHandshake,
              title: "Trust & Respect",
              desc:
                "We trust our people and respect their time, ideas, and boundaries.",
            },
          ].map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 18,
                  padding: 28,
                }}
              >
                <Icon size={36} color={COLORS.primary} />
                <h3 style={{ marginTop: 18, fontSize: "1.5rem", fontWeight: 600 }}>
                  {v.title}
                </h3>
                <p style={{ marginTop: 10, color: COLORS.textMuted }}>
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================
         WHAT WE BUILD
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700, textAlign: "center" }}>
            What We Build
          </h2>

          <ul
            style={{
              marginTop: 36,
              color: COLORS.textMuted,
              lineHeight: 2,
              paddingLeft: 20,
            }}
          >
            <li>High-traffic web platforms used by thousands of users daily</li>
            <li>Modern frontend systems with strong accessibility standards</li>
            <li>Backend services optimized for performance and security</li>
            <li>Internal tooling that improves productivity and reliability</li>
            <li>APIs and integrations designed for long-term scalability</li>
          </ul>
        </div>
      </section>

      {/* ======================================================
         OPEN ROLES
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem", backgroundColor: COLORS.sectionDark }}>
        <h2 style={{ textAlign: "center", fontSize: "2.6rem", fontWeight: 700 }}>
          Open Positions
        </h2>

        <div
          style={{
            marginTop: 64,
            maxWidth: 900,
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {[
            {
              role: "Senior Frontend Engineer",
              location: "Remote",
              type: "Full-time",
              stack: "Next.js, TypeScript, Tailwind",
            },
            {
              role: "Backend Engineer",
              location: "Remote / Bangalore",
              type: "Full-time",
              stack: "Node.js / Go, PostgreSQL",
            },
            {
              role: "Product Designer",
              location: "Remote",
              type: "Contract",
              stack: "Figma, Design Systems",
            },
          ].map((job, i) => (
            <div
              key={i}
              style={{
                backgroundColor: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 20,
                padding: 32,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 600 }}>
                  {job.role}
                </h3>
                <p style={{ color: COLORS.textMuted, marginTop: 8 }}>
                  <MapPin size={14} /> {job.location} · {job.type}
                </p>
                <p style={{ color: "#64748B", marginTop: 8 }}>
                  Tech Stack: {job.stack}
                </p>
              </div>

              <ActionButton label="Apply Now" />
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================
         LEARNING & GROWTH
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700, textAlign: "center" }}>
            Learning & Career Growth
          </h2>

          <p style={{ marginTop: 28, color: COLORS.textSoft, lineHeight: 1.9 }}>
            We believe growth should be intentional. Our engineers and designers
            are supported through mentorship, structured feedback, and clear
            progression paths.
          </p>

          <ul
            style={{
              marginTop: 24,
              color: COLORS.textMuted,
              lineHeight: 2,
              paddingLeft: 20,
            }}
          >
            <li>Dedicated learning and certification budget</li>
            <li>Clear promotion criteria and career ladders</li>
            <li>Regular 1-on-1s and performance reviews</li>
            <li>Leadership and individual contributor tracks</li>
          </ul>
        </div>
      </section>

      {/* ======================================================
         INTERNS & FRESHERS
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem", backgroundColor: COLORS.sectionDark }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700, textAlign: "center" }}>
            Interns & Fresh Graduates
          </h2>

          <p style={{ marginTop: 28, color: COLORS.textMuted, lineHeight: 1.9 }}>
            We actively hire interns and fresh graduates who show strong
            fundamentals, curiosity, and a willingness to learn. Our internship
            program focuses on real-world exposure and mentorship.
          </p>
        </div>
      </section>

      {/* ======================================================
         FAQ
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700, textAlign: "center" }}>
            Careers FAQ
          </h2>

          <div style={{ marginTop: 40, color: COLORS.textMuted, lineHeight: 2 }}>
            <p><strong>Q:</strong> Is remote work supported?</p>
            <p>A: Yes, most roles are remote-friendly.</p>

            <p><strong>Q:</strong> Do you offer flexible working hours?</p>
            <p>A: Yes, we focus on outcomes, not hours.</p>

            <p><strong>Q:</strong> How long does the hiring process take?</p>
            <p>A: Typically 1–2 weeks from initial screening.</p>
          </div>
        </div>
      </section>

      {/* ======================================================
         FINAL CTA
      ====================================================== */}
      <section style={{ padding: "7rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.6rem", fontWeight: 700 }}>
          Ready to Build With Us?
        </h2>
        <p style={{ color: COLORS.textMuted, marginTop: 18 }}>
          Send your resume and portfolio to
        </p>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
          <ActionButton label="careers@company.com" />
        </div>
      </section>
    </div>
  );
}
