"use client";

import type {
  PersonalDetails,
  ServiceDetails,
  Documents,
  BankDetails,
} from "@/types/provider";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReviewSubmitStepProps {
  personalDetails: PersonalDetails;
  serviceDetails: ServiceDetails;
  documents: Documents;
  bankDetails: BankDetails;
  gstNumber: string;
  onBack: () => void;
  onSubmit: (applicationId: string) => void;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Generate application ID with strong randomness
    const timestamp = Date.now();
    const randomBytes = crypto.getRandomValues(new Uint8Array(6));
    const randomSuffix = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    const applicationId = `APP-${timestamp}-${randomSuffix}`;

    // Simulate API call delay (remove in real implementation)
    setTimeout(() => {
      onSubmit(applicationId);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please review your information before submitting your application
        </p>
      </div>

      {/* PERSONAL DETAILS */}
      <Section title="Personal Details">
        <InfoGrid>
          <InfoItem label="Full Name" value={personalDetails.name || "Not Provided"} />
          <InfoItem label="Email" value={personalDetails.email || "Not Provided"} />
        </InfoGrid>
      </Section>

      {/* SERVICE DETAILS */}
      <Section title="Service Details">
        <InfoGrid>
          <InfoItem label="Shop Name" value={serviceDetails.shopName || "Not Provided"} />
          <InfoItem label="Owner Name" value={serviceDetails.ownerName || "Not Provided"} />
          <InfoItem label="Start Year" value={serviceDetails.startYear || "Not Provided"} />
          <InfoItem
            label="Service Range"
            value={
              serviceDetails.serviceRange
                ? `${serviceDetails.serviceRange} KM`
                : "Not Provided"
            }
          />

          <InfoItem
            label="Categories"
            value={
              serviceDetails.category?.length
                ? serviceDetails.category.join(", ")
                : "Not Selected"
            }
            className="md:col-span-2"
          />

          {serviceDetails.customCategory?.length ? (
            <InfoItem
              label="Custom Categories"
              value={serviceDetails.customCategory.join(", ")}
              className="md:col-span-2"
            />
          ) : null}
        </InfoGrid>
      </Section>

      {/* GST DETAILS */}
      <Section title="GST Details">
        <InfoGrid>
          <InfoItem label="GST Number" value={gstNumber || "Not Provided"} />
        </InfoGrid>
      </Section>

      {/* BANK DETAILS */}
      <Section title="Bank Details">
        <InfoGrid>
          <InfoItem
            label="Account Holder"
            value={bankDetails.accountHolderName || "Not Provided"}
          />
          <InfoItem
            label="Account Number"
            value={
              bankDetails.accountNumber
                ? maskAccountNumber(bankDetails.accountNumber)
                : "Not Provided"
            }
          />
          <InfoItem label="IFSC Code" value={bankDetails.ifscCode || "Not Provided"} />
          <InfoItem label="Bank Name" value={bankDetails.bankName || "Not Provided"} />
        </InfoGrid>
      </Section>

      {/* DOCUMENTS */}
      <Section title="Documents Uploaded">
        <ul className="space-y-3 text-sm">
          <DocumentItem label="Owner Face Photo" file={documents.profilePhoto} />
          <DocumentItem label="Aadhaar Card" file={documents.aadhaarFront} />
          <DocumentItem label="PAN Card" file={documents.panCard} />
        </ul>
      </Section>

      <div className="flex justify-between pt-6 border-t">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          disabled={isSubmitting}
        >
          Back
        </Button>

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting Application..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}

/* ====================== HELPER COMPONENTS ====================== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <dl className="grid gap-x-6 gap-y-5 md:grid-cols-2">{children}</dl>;
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-gray-900 break-all">
        {value}
      </dd>
    </div>
  );
}

function DocumentItem({ label, file }: { label: string; file: File | null | undefined }) {
  const fileName = file?.name || "Not Uploaded";

  return (
    <li className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
      <span className="text-green-600 text-xl">✓</span>
      <div>
        <span className="font-medium text-gray-700">{label}</span>
        <p className="text-sm text-gray-600 mt-0.5">{fileName}</p>
      </div>
    </li>
  );
}

function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber || accountNumber.length < 4) return "••••";
  const lastFour = accountNumber.slice(-4);
  return `••••••••${lastFour}`;
}

