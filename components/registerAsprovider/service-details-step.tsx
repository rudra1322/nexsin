"use client"

import type React from "react"
import { useState } from "react"
import type { ServiceDetails, ServiceCategory } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ServiceDetailsStepProps {
  data: ServiceDetails
  onUpdate: (data: ServiceDetails) => void
  onNext: () => void
  onBack: () => void
}

const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "carpenter", label: "Carpenter" },
  { value: "painter", label: "Painter" },
  { value: "cleaner", label: "Cleaner" },
  { value: "appliance-repair", label: "Appliance Repair" },
  { value: "pest-control", label: "Pest Control" },
  { value: "other", label: "Other" },
]

export function ServiceDetailsStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: ServiceDetailsStepProps) {

  const [newCustom, setNewCustom] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (data.category.length === 0) {
      alert("Please select at least one category")
      return
    }

    onNext()
  }

  const handleChange = (field: keyof ServiceDetails, value: any) => {
    onUpdate({ ...data, [field]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Service Details
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Tell us about your business
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Shop Name */}
        <div className="space-y-2">
          <Label htmlFor="shopName">Shop Name *</Label>
          <Input
            id="shopName"
            required
            value={data.shopName}
            onChange={(e) => handleChange("shopName", e.target.value)}
            placeholder="ABC Electricals"
          />
        </div>

        {/* Owner Name */}
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name *</Label>
          <Input
            id="ownerName"
            required
            value={data.ownerName}
            onChange={(e) => handleChange("ownerName", e.target.value)}
            placeholder="Ramesh Kumar"
          />
        </div>

        {/* Start Year */}
        <div className="space-y-2">
          <Label htmlFor="startYear">Year of Start Work *</Label>
          <Input
            id="startYear"
            type="number"
            required
            min="1900"
            max={new Date().getFullYear()}
            value={data.startYear}
            onChange={(e) => handleChange("startYear", e.target.value)}
            placeholder="2018"
          />
        </div>

        {/* Service Range */}
        <div className="space-y-2">
          <Label htmlFor="serviceRange">Service Range (KM) *</Label>
          <Input
            id="serviceRange"
            type="number"
            required
            min="1"
            value={data.serviceRange}
            onChange={(e) =>
              handleChange("serviceRange", e.target.value)
            }
            placeholder="10"
          />
        </div>

        {/* Categories */}
        <div className="space-y-4 md:col-span-2">
          <Label>Service Categories *</Label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {serviceCategories.map((cat) => {
              const isSelected = data.category.includes(cat.value)

              return (
                <label
                  key={cat.value}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all
                    ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 hover:border-indigo-400"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        handleChange(
                          "category",
                          data.category.filter(
                            (c) => c !== cat.value
                          )
                        )
                      } else {
                        handleChange("category", [
                          ...data.category,
                          cat.value,
                        ])
                      }
                    }}
                    className="accent-indigo-600"
                  />
                  {cat.label}
                </label>
              )
            })}
          </div>

          {/* Show Custom Input if Other Selected */}
          {data.category.includes("other") && (
            <div className="mt-4 space-y-3">
              <Label>Add Custom Service</Label>

              <div className="flex gap-2">
                <Input
                  placeholder="Enter custom service"
                  value={newCustom}
                  onChange={(e) => setNewCustom(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (
                      newCustom.trim() &&
                      !data.customCategory.includes(
                        newCustom.trim()
                      )
                    ) {
                      handleChange("customCategory", [
                        ...data.customCategory,
                        newCustom.trim(),
                      ])
                      setNewCustom("")
                    }
                  }}
                >
                  Add
                </Button>
              </div>

              {/* Custom Category Badges */}
              {data.customCategory.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.customCategory.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      ✔ {item}
                      <button
                        type="button"
                        onClick={() =>
                          handleChange(
                            "customCategory",
                            data.customCategory.filter(
                              (c) => c !== item
                            )
                          )
                        }
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {data.category.length === 0 && (
            <p className="text-sm text-red-600">
              Please select at least one category
            </p>
          )}
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          size="lg"
        >
          Back
        </Button>

        <Button
          type="submit"
          size="lg"
          className="min-w-32"
          disabled={data.category.length === 0}
        >
          Next
        </Button>
      </div>

    </form>
  )
}
