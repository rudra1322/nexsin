"use client";

import {
  Building,
  Layers,
  Globe,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Mail,
} from "lucide-react";

const COLORS = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",

  primary: "#2563EB",
  green: "#22C55E",
  purple: "#7C3AED",
  amber: "#F59E0B",

  text: "#0F172A",
  textSoft: "#475569",
};

export default function AboutCompanyPage() {
  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>

      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "7rem 1.5rem",
          background:
            "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 50%, #F8FAFC 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: COLORS.primary, fontWeight: 600 }}>
            About Our Company
          </p>

          <h1 style={{ fontSize: "3.6rem", fontWeight: 800, marginTop: 14 }}>
            Building Technology{" "}
            <span style={{ color: COLORS.primary }}>People Trust</span>
          </h1>

          <p
            style={{
              marginTop: 24,
              maxWidth: 760,
              fontSize: "1.15rem",
              color: COLORS.textSoft,
              lineHeight: 1.8,
            }}
          >
            We are a product-focused technology company helping organizations
            design, build, and scale reliable digital systems with clarity and
            confidence.
          </p>
        </div>
      </section>

      {/* ================= SNAPSHOT ================= */}
      <section style={{ padding: "4.5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}
        >
          {[
            { label: "Founded", value: "2023", color: COLORS.primary },
            { label: "Team", value: "20+ Experts", color: COLORS.green },
            { label: "Clients", value: "Global", color: COLORS.purple },
            { label: "Focus", value: "Scalable Systems", color: COLORS.amber },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                padding: 26,
                borderRadius: 16,
              }}
            >
              <p style={{ fontSize: "0.85rem", color: item.color }}>
                {item.label}
              </p>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700 }}>
            Our <span style={{ color: COLORS.primary }}>Story</span>
          </h2>

          <p style={{ marginTop: 24, color: COLORS.textSoft, lineHeight: 1.9 }}>
            Our journey started with a simple belief — most software failures
            happen not because of bad technology, but because of unclear
            thinking. We focus on building systems that last.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section
        style={{
          padding: "6rem 1.5rem",
          background: "#EFF6FF",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700 }}>
            What We <span style={{ color: COLORS.purple }}>Do</span>
          </h2>

          <div
            style={{
              marginTop: 42,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                icon: Layers,
                title: "Product Engineering",
                desc: "Scalable, maintainable product systems.",
                tint: "#EEF2FF",
              },
              {
                icon: Globe,
                title: "Platform Architecture",
                desc: "Secure and performance-first design.",
                tint: "#ECFDF5",
              },
              {
                icon: ShieldCheck,
                title: "Reliability & Security",
                desc: "Trust built into every layer.",
                tint: "#FFFBEB",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: item.tint,
                    padding: 28,
                    borderRadius: 18,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <Icon size={36} color={COLORS.primary} />
                  <h3 style={{ marginTop: 16, fontSize: "1.4rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ marginTop: 8, color: COLORS.textSoft }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section
        style={{
          padding: "6rem 1.5rem",
          background:
            "linear-gradient(135deg, #F1F5F9 0%, #F8FAFC 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700 }}>
            Trust & <span style={{ color: COLORS.green }}>Scale</span>
          </h2>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {[
              { icon: Handshake, text: "Long-term partnerships" },
              { icon: TrendingUp, text: "Systems built to scale" },
              { icon: Building, text: "Enterprise-ready solutions" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: COLORS.card,
                    padding: 26,
                    borderRadius: 16,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <Icon size={30} color={COLORS.green} />
                  <p style={{ marginTop: 14 }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.6rem", fontWeight: 700 }}>
          Let’s Work Together
        </h2>
        <p style={{ marginTop: 16, color: COLORS.textSoft }}>
          Interested in partnerships or collaboration?
        </p>

        <a
          href="mailto:hello@company.com"
          style={{
            marginTop: 28,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: COLORS.primary,
            color: "#fff",
            padding: "16px 42px",
            borderRadius: 16,
            fontWeight: 600,
          }}
        >
          <Mail size={18} /> hello@company.com
        </a>
      </section>
    </div>
  );
}
