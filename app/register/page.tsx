"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (phone.length < 10) {
      alert("Enter a valid phone number");
      return;
    }

    setLoading(true);

    // 🔗 Call your backend / Firebase / Twilio here
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter 6-digit OTP");
      return;
    }

    setLoading(true);

    // 🔗 Verify OTP from backend
    setTimeout(() => {
      setLoading(false);
      alert("✅ Registration successful!");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Register
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {step === "phone"
            ? "Enter your mobile number to get OTP"
            : "Enter the OTP sent to your number"}
        </p>

        {step === "phone" && (
          <>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
              <span className="text-gray-600 mr-2">+91</span>
              <input
                type="tel"
                placeholder="Mobile number"
                className="w-full outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-500 transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full border rounded-lg px-4 py-3 text-center tracking-widest text-lg mb-4 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-500 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setStep("phone")}
              className="w-full mt-3 text-sm text-gray-500 hover:underline"
            >
              Change phone number
            </button>
          </>
        )}
      </div>
    </div>
  );
}
