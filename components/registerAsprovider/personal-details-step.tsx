"use client"

import type React from "react"
import { useState } from "react"
import type { PersonalDetails } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface PersonalDetailsStepProps {
  data: PersonalDetails
  onUpdate: (data: PersonalDetails) => void
  onNext: () => void
}

export function PersonalDetailsStep({
  data,
  onUpdate,
  onNext,
}: PersonalDetailsStepProps) {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (data.createPassword !== data.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    onNext()
  }

  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Create Account
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Please enter your basic details
        </p>
      </div>

      <div className="space-y-4">

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            required
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        {/* Create Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="createPassword">Create Password *</Label>
          <Input
            id="createPassword"
            type={showPassword ? "text" : "password"}
            required
            value={data.createPassword}
            onChange={(e) =>
              handleChange("createPassword", e.target.value)
            }
            placeholder="Enter password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            value={data.confirmPassword}
            onChange={(e) =>
              handleChange("confirmPassword", e.target.value)
            }
            placeholder="Re-enter password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-32">
          Next
        </Button>
      </div>
    </form>
  )
}
