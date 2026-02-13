"use client"

import type {
  PersonalDetails,
  ServiceDetails,
  Documents,
  BankDetails,
} from "@/types/provider"

import { Button } from "@/components/ui/button"

interface ReviewSubmitStepProps {
  personalDetails: PersonalDetails
  serviceDetails: ServiceDetails
  documents: Documents
  bankDetails: BankDetails
  gstNumber: string
  onBack: () => void
  onSubmit: (applicationId: string) => void
}

export function ReviewSubmitStep({
  personalDetails,
  serviceDetails,
  documents,
  bankDetails,
  gstNumber,
  onBack,
  onSubmit,
}: ReviewSubmitStepProps) {

  const handleSubmit = () => {
    const applicationId = `APP${Date.now()}`
    onSubmit(applicationId)
  }

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Review & Submit
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Please review your information before submitting
        </p>
      </div>

      {/* ================= PERSONAL DETAILS ================= */}
      <Section title="Personal Details">
        <InfoGrid>
          <InfoItem label="Full Name" value={personalDetails.name} />
          <InfoItem label="Email" value={personalDetails.email} />
        </InfoGrid>
      </Section>

      {/* ================= SERVICE DETAILS ================= */}
      <Section title="Service Details">
        <InfoGrid>
          <InfoItem label="Shop Name" value={serviceDetails.shopName} />
          <InfoItem label="Owner Name" value={serviceDetails.ownerName} />
          <InfoItem label="Start Year" value={serviceDetails.startYear} />
          <InfoItem label="Service Range" value={`${serviceDetails.serviceRange} KM`} />
          
          <InfoItem
            label="Categories"
            value={
              serviceDetails.category.length > 0
                ? serviceDetails.category.join(", ")
                : "Not Selected"
            }
            className="md:col-span-2"
          />

          {serviceDetails.customCategory.length > 0 && (
            <InfoItem
              label="Custom Categories"
              value={serviceDetails.customCategory.join(", ")}
              className="md:col-span-2"
            />
          )}
        </InfoGrid>
      </Section>

      {/* ================= GST ================= */}
      <Section title="GST Details">
        <InfoGrid>
          <InfoItem
            label="GST Number"
            value={gstNumber ? gstNumber : "Not Provided"}
          />
        </InfoGrid>
      </Section>

      {/* ================= BANK DETAILS ================= */}
      <Section title="Bank Details">
        <InfoGrid>
          <InfoItem
            label="Account Holder"
            value={bankDetails.accountHolderName}
          />
          <InfoItem
            label="Account Number"
            value={bankDetails.accountNumber}
          />
          <InfoItem
            label="IFSC Code"
            value={bankDetails.ifscCode}
          />
          <InfoItem
            label="Bank Name"
            value={bankDetails.bankName}
          />
        </InfoGrid>
      </Section>

      {/* ================= DOCUMENTS ================= */}
      <Section title="Documents Uploaded">
        <ul className="space-y-2 text-sm">
          <DocumentItem label="Owner Face Photo" file={documents.profilePhoto} />
          <DocumentItem label="Aadhaar Card" file={documents.aadhaarFront} />
          <DocumentItem label="PAN Card" file={documents.panCard} />
        </ul>
      </Section>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>

        <Button onClick={handleSubmit}>
          Submit Application
        </Button>
      </div>
    </div>
  )
}

/* ================= HELPERS ================= */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {title}
      </h3>
      {children}
    </div>
  )
}

function InfoGrid({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <dl className="grid gap-4 md:grid-cols-2">
      {children}
    </dl>
  )
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">
        {value}
      </dd>
    </div>
  )
}

function DocumentItem({
  label,
  file,
}: {
  label: string
  file: File | null
}) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-green-600">✔</span>
      {label}:
      <span className="text-gray-600">
        {file ? file.name : "Not Uploaded"}
      </span>
    </li>
  )
}
