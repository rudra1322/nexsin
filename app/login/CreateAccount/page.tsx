"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";


const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CreateAccountPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullname: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  


  // New states for alert dialog
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
    show: boolean;
  }>({
    type: "success",
    title: "",
    message: "",
    show: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", api: "" });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!form.identifier.trim()) newErrors.identifier = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters required";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agree) newErrors.agree = "You must accept Terms & Conditions";

    return newErrors;
  };

  const showAlert = (type: "success" | "error", title: string, message: string) => {
    setAlert({ type, title, message, show: true });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  // 🔥 PRODUCTION HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/users/auth`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.identifier,
          password: form.password,
          provider: "local",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      localStorage.setItem("token",data.token)

      // ✅ SUCCESS - Show beautiful success dialog
      showAlert(
        "success",
        "Account Created Successfully!",
        "Welcome aboard! Redirecting you to your dashboard..."
      );

      // Auto redirect after showing success message
      setTimeout(() => {
        router.replace("/home");
        
        
      }, 1800);

    } catch (err: any) {
      // ❌ ERROR - Show professional error dialog
      showAlert(
        "error",
        "Registration Failed",
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div className="hidden md:block space-y-6">
          <h1 className="text-4xl font-bold text-white">
            Book Trusted Services
          </h1>
          <p className="text-gray-400">
            Create your account to connect with professionals.
          </p>
        </div>

        {/* FORM */}
        <div className="w-full max-w-md mx-auto bg-[#111C33] p-8 rounded-2xl">
          <h2 className="text-white text-2xl mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              name="fullname"
              placeholder="Full Name"
              value={form.fullname}
              error={errors.fullname}
              onChange={handleChange}
            />
            <InputField
              name="identifier"
              placeholder="Email"
              value={form.identifier}
              error={errors.identifier}
              onChange={handleChange}
            />
            <PasswordField
              name="password"
              placeholder="Password"
              value={form.password}
              error={errors.password}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              onChange={handleChange}
            />
            <PasswordField
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handleChange}
            />

            {/* TERMS */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <span>I accept the Terms & Conditions</span>
            </div>
            {errors.agree && <p className="text-red-400 text-sm">{errors.agree}</p>}

            {/* API ERROR (kept as fallback) */}
            {errors.api && <p className="text-red-400 text-sm text-center">{errors.api}</p>}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3.5 rounded-xl text-white font-medium disabled:opacity-70"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-400 hover:underline cursor-pointer"
                onClick={() => router.replace("/login")}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* ALERT DIALOG - Big Tech Style */}
      {alert.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111C33] border border-gray-800 rounded-3xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                {alert.type === "success" ? (
                  <div className="w-10 h-10 bg-green-500/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="text-green-500" size={28} />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-500/10 rounded-2xl flex items-center justify-center">
                    <AlertCircle className="text-red-500" size={28} />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">{alert.title}</h3>
              </div>
              <button
                onClick={closeAlert}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-gray-300 text-[15px]">
              {alert.message}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-800 flex justify-end">
              <button
                onClick={closeAlert}
                className={`px-8 py-2.5 rounded-2xl font-medium transition-all ${
                  alert.type === "success"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {alert.type === "success" ? "Continue" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */
function InputField({ name, placeholder, value, error, onChange }: any) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3.5 rounded-xl bg-[#0B1426] text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition-colors"
      />
      {error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
    </div>
  );
}

function PasswordField({ name, placeholder, value, error, show, toggle, onChange }: any) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3.5 rounded-xl bg-[#0B1426] text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition-colors"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
      {error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
    </div>
  );
}