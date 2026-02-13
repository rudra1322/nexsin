"use client"

import { useEffect, useState } from "react"

export default function TermsAndConditions() {
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

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 border-b border-gray-700 pb-10">
          <h1 className="text-4xl font-bold text-white">
            Terms & Conditions
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
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-blue-400">
            {sections.map((sec) => (
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

          {sections.map((sec) => (
            <Section key={sec.id} id={sec.id} title={sec.title}>
              {sec.content}
            </Section>
          ))}

        </div>

        {/* Back to Top */}
        <div className="text-center pt-16 border-t border-gray-700">
          <a
            href="#top"
            className="text-blue-400 hover:underline text-sm"
          >
            ↑ Back to Top
          </a>

          <p className="text-xs text-gray-500 mt-6">
            © {new Date().getFullYear()} Nexcyn. All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

/* ================= SECTIONS DATA ================= */

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to <strong>Nexcyn</strong>, a digital platform connecting
          users with verified service professionals.
        </p>
        <p>
          By using our platform, you agree to comply with these Terms.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: (
      <p>
        You must be at least 18 years old to use our services.
        All information provided must be accurate.
      </p>
    ),
  },
  {
    id: "verification",
    title: "3. Identity Verification",
    content: (
      <>
        <p>
          We may require Aadhaar, PAN, GST, bank proof, or facial verification.
        </p>
        <p>
          False documents may result in permanent account termination.
        </p>
      </>
    ),
  },
  {
    id: "user-responsibility",
    title: "4. User Responsibilities",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Provide accurate booking details.</li>
        <li>Ensure safe service access.</li>
        <li>Make payments as agreed.</li>
      </ul>
    ),
  },
  {
    id: "provider-responsibility",
    title: "5. Service Professional Responsibilities",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Provide valid credentials.</li>
        <li>Deliver services professionally.</li>
        <li>Comply with applicable laws.</li>
      </ul>
    ),
  },
  {
    id: "payments",
    title: "6. Payments & Commission",
    content: (
      <>
        <p>
          Payments must be processed through authorized methods.
        </p>
        <p>
          Nexcyn may charge commission from service professionals.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content: (
      <p>
        Nexcyn acts only as an intermediary and is not liable
        for disputes or damages between users and professionals.
      </p>
    ),
  },
  {
    id: "termination",
    title: "8. Suspension & Termination",
    content: (
      <p>
        Accounts violating policies may be suspended or terminated
        without prior notice.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "9. Privacy",
    content: (
      <p>
        Use of the platform is governed by our Privacy Policy.
      </p>
    ),
  },
  {
    id: "law",
    title: "10. Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of India.
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
