"use client"

import { useEffect, useState } from "react"

export default function PrivacyPolicy() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const progress =
        (document.documentElement.scrollTop / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0B1426] text-gray-300 relative">

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-green-500 z-50 transition-all"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 border-b border-gray-700 pb-10">
          <h1 className="text-4xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Last Updated: March {new Date().getFullYear()}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-[#111C33] p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Table of Contents
          </h2>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-green-400">
            {privacySections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} className="hover:underline">
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-16 leading-relaxed">
          {privacySections.map((sec) => (
            <Section key={sec.id} id={sec.id} title={sec.title}>
              {sec.content}
            </Section>
          ))}
        </div>

        <div className="text-center pt-16 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Nexcyn. All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

/* ================= PRIVACY SECTIONS ================= */

const privacySections = [
  {
    id: "information-collected",
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          We collect personal information when you register, book services,
          or provide documents.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Name, email, phone number</li>
          <li>Aadhaar, PAN, GST (if applicable)</li>
          <li>Bank details (for professionals)</li>
          <li>Profile photo & face verification data</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>To verify identity and prevent fraud</li>
        <li>To process payments and commissions</li>
        <li>To connect users with service professionals</li>
        <li>To improve platform experience</li>
      </ul>
    ),
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing & Disclosure",
    content: (
      <>
        <p>
          We do not sell your personal data.
        </p>
        <p>
          Data may be shared with payment processors,
          verification partners, or legal authorities when required.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: (
      <p>
        We implement appropriate technical and organizational measures
        to protect your personal data from unauthorized access.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: (
      <p>
        We retain personal information as long as necessary
        for verification, compliance, and legal obligations.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies & Tracking",
    content: (
      <p>
        Our platform may use cookies and analytics tools
        to enhance user experience and monitor performance.
      </p>
    ),
  },
  {
    id: "user-rights",
    title: "7. Your Rights",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Request access to your personal data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion where legally permitted</li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time.
        Continued use of the platform implies acceptance.
      </p>
    ),
  },
  {
    id: "contact",
    title: "9. Contact Us",
    content: (
      <p className="text-green-400">
        support@nexcyn.com
      </p>
    ),
  },
]

/* ================= SECTION COMPONENT ================= */

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="space-y-4 scroll-mt-28">
      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>
      <div className="text-gray-300 space-y-4">
        {children}
      </div>
    </section>
  )
}
