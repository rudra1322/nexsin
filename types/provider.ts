// ======================================================
// SERVICE CATEGORIES
// ======================================================

export type ServiceCategory =
  | "electrician"
  | "plumber"
  | "carpenter"
  | "painter"
  | "cleaner"
  | "appliance-repair"
  | "pest-control"
  | "other"


// ======================================================
// APPLICATION STATUS
// ======================================================

export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "under-review"


// ======================================================
// PERSONAL DETAILS
// ======================================================

export interface PersonalDetails {
  name: string
  email: string
  createPassword: string
  confirmPassword: string
}


// ======================================================
// SERVICE DETAILS (MULTI-SELECT CATEGORY)
// ======================================================

export interface ServiceDetails {
  shopName: string
  ownerName: string
  startYear: string
  category: ServiceCategory[]
  customCategory: string[]   // 👈 NEW
  serviceRange: string
}



// ======================================================
// DOCUMENTS (FILE STATE)
// ======================================================

export interface Documents {
  aadhaarFront: File | null
  aadhaarBack: File | null
  panCard: File | null
  bankProof: File | null
  profilePhoto: File | null
}


// ======================================================
// BANK DETAILS
// ======================================================

export interface BankDetails {
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  bankName: string
}


// ======================================================
// FULL PROVIDER APPLICATION STRUCTURE
// ======================================================

export interface ProviderApplication {
  id: string
  personalDetails: PersonalDetails
  serviceDetails: ServiceDetails
  documents: {
    aadhaarFront: string
    aadhaarBack: string
    panCard: string
    bankProof: string
    profilePhoto: string
  }
  bankDetails: BankDetails
  status: ApplicationStatus
  submittedAt: Date
  reviewedAt?: Date
  reviewNotes?: string
}
