export type StructuredBankDetails = {
  accountHolderName: string;
  iban: string;
  bankName: string;
  swiftBic?: string;
};

export type OwnerProfilePayload = {
  name?: string;
  phone?: string;
  address?: string;
  nationality?: string;
  spokenLanguage?: string;
  gender?: string;
  bankDetails?: Partial<StructuredBankDetails> | string | Record<string, unknown>;
};

export type UserProfileLike = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  nationality?: string;
  spokenLanguage?: string;
  bankDetails?: unknown;
  ownerProfileCompletedAt?: Date | string | null;
  isProfileComplete?: boolean;
};

function hasText(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizeBankDetails(
  raw: unknown,
): StructuredBankDetails | null {
  if (!raw) return null;

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    return {
      accountHolderName: trimmed,
      iban: trimmed,
      bankName: trimmed,
    };
  }

  if (typeof raw === "object" && raw !== null) {
    const obj = raw as Record<string, unknown>;
    const accountHolderName = String(obj.accountHolderName ?? "").trim();
    const iban = String(obj.iban ?? "").trim();
    const bankName = String(obj.bankName ?? "").trim();
    const swiftBic = String(obj.swiftBic ?? "").trim();

    if (!accountHolderName && !iban && !bankName) return null;

    return {
      accountHolderName,
      iban,
      bankName,
      ...(swiftBic ? { swiftBic } : {}),
    };
  }

  return null;
}

export function isStructuredBankComplete(
  bank: StructuredBankDetails | null,
): boolean {
  if (!bank) return false;
  return (
    hasText(bank.accountHolderName) &&
    hasText(bank.iban) &&
    hasText(bank.bankName)
  );
}

export function validateOwnerProfilePayload(body: OwnerProfilePayload): {
  valid: boolean;
  errors: Record<string, string>;
  normalized: {
    name: string;
    phone: string;
    address: string;
    nationality: string;
    spokenLanguage: string;
    bankDetails: StructuredBankDetails;
  } | null;
} {
  const errors: Record<string, string> = {};

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const address = String(body.address ?? "").trim();
  const nationality = String(body.nationality ?? "").trim();
  const spokenLanguage = String(body.spokenLanguage ?? "English").trim();

  if (!name) errors.name = "Full name is required";
  if (!phone) errors.phone = "Phone number is required";
  if (!address) errors.address = "Address is required";
  if (!nationality) errors.nationality = "Nationality is required";

  const bank = normalizeBankDetails(body.bankDetails);
  if (!bank?.accountHolderName) {
    errors.accountHolderName = "Account holder name is required";
  }
  if (!bank?.iban) errors.iban = "IBAN is required";
  if (!bank?.bankName) errors.bankName = "Bank name is required";

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors, normalized: null };
  }

  return {
    valid: true,
    errors: {},
    normalized: {
      name,
      phone,
      address,
      nationality,
      spokenLanguage: spokenLanguage || "English",
      bankDetails: bank as StructuredBankDetails,
    },
  };
}

export function canMarkOwnerProfileComplete(user: UserProfileLike | null): boolean {
  if (!user) return false;

  const bank = normalizeBankDetails(user.bankDetails);
  return (
    hasText(user.name) &&
    hasText(user.email) &&
    hasText(user.phone) &&
    hasText(user.address) &&
    hasText(user.nationality) &&
    isStructuredBankComplete(bank)
  );
}

/** Short-term listing gate: owner must submit profile on Vacation Saga */
export function isShortTermOwnerProfileComplete(
  user: UserProfileLike | null | undefined,
): boolean {
  if (!user?.ownerProfileCompletedAt) return false;
  const d =
    user.ownerProfileCompletedAt instanceof Date
      ? user.ownerProfileCompletedAt
      : new Date(user.ownerProfileCompletedAt);
  return !Number.isNaN(d.getTime());
}

export function applyOwnerProfileCompletionState(user: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  nationality?: string;
  bankDetails?: unknown;
  isProfileComplete?: boolean;
  ownerProfileCompletedAt?: Date | null;
}): void {
  if (canMarkOwnerProfileComplete(user)) {
    user.isProfileComplete = true;
    user.ownerProfileCompletedAt = user.ownerProfileCompletedAt ?? new Date();
  } else {
    user.isProfileComplete = false;
    user.ownerProfileCompletedAt = null;
  }
}

export function formatBankSummary(
  bank: StructuredBankDetails | null,
): string {
  if (!bank) return "Not provided";
  const parts = [bank.accountHolderName, bank.iban, bank.bankName];
  if (bank.swiftBic) parts.push(bank.swiftBic);
  return parts.filter(Boolean).join(" · ");
}
