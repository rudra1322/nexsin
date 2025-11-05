"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Wrench, MapPin, CalendarDays, Clock, Camera, Shield, ArrowLeft } from "lucide-react"

const ALL_SERVICES = [
  "Cooler Repair",
  "Laptop Repair",
  "Car Mechanic",
  "Plumber",
  "Electrician",
  "AC Service",
  "Carpenter",
  "Painter",
]

function unslugify(slug: string) {
  const name = slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\s+/g, " ")
    .trim()
  // Title case
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default function BookServicePage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const defaultService = useMemo(() => {
    if (!params?.slug) return ""
    const guess = unslugify(params.slug)
    // match to known list if possible
    const found = ALL_SERVICES.find(
      (s) => s.toLowerCase().replace(/&/g, "and") === guess.toLowerCase().replace(/&/g, "and"),
    )
    return found || guess
  }, [params.slug])

  const [service, setService] = useState(defaultService)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pin, setPin] = useState("")
  const [date, setDate] = useState("")
  const [timeWindow, setTimeWindow] = useState("any")
  const [urgent, setUrgent] = useState(false)
  const [desc, setDesc] = useState("")
  const [budget, setBudget] = useState("")
  const [agree, setAgree] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!service || !name || !phone || !address || !city || !pin || !date || !agree) {
      setError(
        "Please fill all required fields: service, name, phone, address, city, PIN, preferred date, and accept terms.",
      )
      return
    }
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setSuccess("Your request has been submitted! We'll match you with a verified pro shortly.")
    setTimeout(() => router.push("/"), 1200)
  }

  return (
    <main className="min-h-screen bg-[#0D1117]">
      {/* Top bar */}
      {/* <header className="bg-[#0D1117] border-b border-[#3b82f6]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-[#007BFF]" />
            <span className="text-xl sm:text-2xl font-bold text-white">FixMate</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#E3F2FD] text-[#007BFF] text-xs sm:text-sm">Secure booking</Badge>
          </div>
        </div>
      </header> */}

      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-[#93c5fd] hover:underline touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                Create Account
              </h1>
              <p className="text-[#cbd5e1] mt-2 text-sm sm:text-base">
                Fill in the details below to get eligible for sevices
              </p>
            </div>

            <Card className="bg-black border-0 shadow-xl bg-white">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-[#343A40] text-lg sm:text-xl">Your details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form className="space-y-6 sm:space-y-8" onSubmit={onSubmit} noValidate>
                  {/* Service selection and date/time */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"> */}
                    {/* <div>
                      <Label htmlFor="service" className="text-[#343A40] text-sm sm:text-base">
                        Service needed *
                      </Label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="mt-2 w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] bg-white px-3 text-sm sm:text-base"
                        required
                      >
                        <option value="">Select service</option>
                        {ALL_SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                        {!ALL_SERVICES.includes(service) && service && <option value={service}>{service}</option>}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-[#343A40] text-sm sm:text-base">
                        Preferred date *
                      </Label>
                      <div className="relative mt-2">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6C757D]" />
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="pl-9 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="timeWindow" className="text-[#343A40] text-sm sm:text-base">
                        Time window
                      </Label>
                      <div className="relative mt-2">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6C757D]" />
                        <select
                          id="timeWindow"
                          value={timeWindow}
                          onChange={(e) => setTimeWindow(e.target.value)}
                          className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] bg-white pl-9 pr-3 text-sm sm:text-base"
                        >
                          <option value="any">Anytime</option>
                          <option value="9-12">Morning (9am–12pm)</option>
                          <option value="12-3">Afternoon (12pm–3pm)</option>
                          <option value="3-6">Evening (3pm–6pm)</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 md:mt-8">
                      <Checkbox id="urgent" checked={urgent} onCheckedChange={() => setUrgent(Boolean())} />
                      <Label htmlFor="urgent" className="text-[#343A40] text-sm sm:text-base">
                        This is urgent
                      </Label>
                    </div>
                  </div>

                  {/* Problem description */}
                  {/* <div>
                    <Label htmlFor="desc" className="text-[#343A40] text-sm sm:text-base">
                      Describe the problem (min 20 chars)
                    </Label>
                    <textarea
                      id="desc"
                      rows={4}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Example: Kitchen sink is leaking under the basin. Started yesterday, water shuts off fine."
                      className="mt-2 w-full rounded-xl border-2 border-gray-200 focus:border-[#007BFF] p-3 sm:p-4 resize-none text-sm sm:text-base"
                    />
                    <p className="text-xs sm:text-sm text-[#6C757D] mt-1">
                      More details help us match the right pro faster.
                    </p>
                  </div>

                  {/* Budget and photos */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="budget" className="text-[#343A40] text-sm sm:text-base">
                        Estimated budget (optional)
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        min="0"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g. 1500"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label className="text-[#343A40] text-sm sm:text-base">Add photos (optional)</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center hover:border-[#007BFF] touch-manipulation">
                        <div className="flex items-center justify-center gap-2 text-[#6C757D] text-xs sm:text-sm">
                          <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                          Upload JPG/PNG up to 5MB each
                        </div>
                        <input type="file" accept="image/*" multiple className="hidden" />
                      </div>
                    </div>
                  </div> */} 

                  {/* Contact and address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[#343A40] text-sm sm:text-base">
                        Full name *
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[#343A40] text-sm sm:text-base">
                        Phone number *
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#343A40] text-sm sm:text-base">
                        Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-[#343A40] text-sm sm:text-base">
                        Address line *
                      </Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House/Flat, Street"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-[#343A40] text-sm sm:text-base">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[#343A40] text-sm sm:text-base">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="mt-2 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pin" className="text-[#343A40] text-sm sm:text-base">
                        PIN code *
                      </Label>
                      <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6C757D]" />
                        <Input
                          id="pin"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          placeholder="e.g. 110001"
                          className="pl-9 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>


                  {/* Actions */}
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{error}</div>
                  )}
                  {success && (
                    <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                      {success}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 sm:h-12 rounded-xl bg-[#00C49A] hover:bg-[#00B894] text-white text-sm sm:text-base font-medium"
                    >
                      {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/#services")}
                      className="h-11 sm:h-12 rounded-xl border-[#007BFF] text-[#007BFF] hover:bg-[#E3F2FD] bg-transparent text-sm sm:text-base"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </main>
  )
}
