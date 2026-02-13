"use client"

import { useState } from "react"
import type { Documents } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DocumentUploadStepProps {
  documents: Documents
  gstNumber: string
  onUpdateDocuments: (docs: Documents) => void
  onUpdateGst: (gst: string) => void
  onNext: () => void
  onBack: () => void
}

export function DocumentUploadStep({
  documents,
  gstNumber,
  onUpdateDocuments,
  onUpdateGst,
  onNext,
  onBack,
}: DocumentUploadStepProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleFileChange = (field: keyof Documents, file: File | null) => {
    onUpdateDocuments({ ...documents, [field]: file })
  }

  const requiredDocumentsUploaded =
    documents.profilePhoto &&
    documents.aadhaarFront &&
    documents.panCard

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Identity Verification
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload required documents for verification
        </p>
      </div>

      {/* ================= FACE CAPTURE ================= */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Owner Face Verification *
        </h3>

        <FileUploadField
          label="Upload Owner Face Photo"
          file={documents.profilePhoto}
          onChange={(file) => handleFileChange("profilePhoto", file)}
          accept="image/*"
        />
      </div>

      {/* ================= AADHAAR ================= */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Aadhaar Card *
        </h3>

        <FileUploadField
          label="Upload Aadhaar Card (Front)"
          file={documents.aadhaarFront}
          onChange={(file) => handleFileChange("aadhaarFront", file)}
        />
      </div>

      {/* ================= PAN ================= */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          PAN Card *
        </h3>

        <FileUploadField
          label="Upload PAN Card"
          file={documents.panCard}
          onChange={(file) => handleFileChange("panCard", file)}
        />
      </div>

      {/* ================= GST (OPTIONAL) ================= */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          GST Details (Optional)
        </h3>

        <div className="space-y-2">
          <Label>GST Number (If Available)</Label>
          <Input
            value={gstNumber}
            onChange={(e) =>
              onUpdateGst(e.target.value.toUpperCase())
            }
            placeholder="22ABCDE1234F1Z5"
          />
        </div>
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>

        <Button
          type="submit"
          disabled={!requiredDocumentsUploaded}
        >
          Next
        </Button>
      </div>

    </form>
  )
}

/* ================= REUSABLE FILE COMPONENT ================= */

function FileUploadField({
  label,
  file,
  onChange,
  accept = "image/*,.pdf",
}: {
  label: string
  file: File | null
  onChange: (file: File | null) => void
  accept?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="cursor-pointer"
      />

      {file && (
        <p className="text-sm text-green-600 mt-1">
          ✓ {file.name}
        </p>
      )}
    </div>
  )
}
