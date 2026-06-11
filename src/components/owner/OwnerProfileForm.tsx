"use client";

import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import type { StructuredBankDetails } from "@/lib/owner-profile";
import { normalizeBankDetails } from "@/lib/owner-profile";

export type OwnerProfileFormValues = {
  name: string;
  phone: string;
  address: string;
  nationality: string;
  spokenLanguage: string;
  gender: string;
  bankDetails: StructuredBankDetails;
};

type OwnerProfileFormProps = {
  values: OwnerProfileFormValues;
  onChange: (values: OwnerProfileFormValues) => void;
  errors?: Record<string, string>;
  onSubmit: () => void;
  submitting?: boolean;
  submitLabel?: string;
  readOnlyEmail?: string;
};

export function emptyOwnerProfileFormValues(): OwnerProfileFormValues {
  return {
    name: "",
    phone: "",
    address: "",
    nationality: "",
    spokenLanguage: "English",
    gender: "Male",
    bankDetails: {
      accountHolderName: "",
      iban: "",
      bankName: "",
      swiftBic: "",
    },
  };
}

export function ownerProfileFromUser(user: {
  name?: string;
  phone?: string | null;
  address?: string;
  nationality?: string;
  spokenLanguage?: string;
  gender?: string;
  email?: string;
  bankDetails?: unknown;
}): OwnerProfileFormValues {
  const bank = normalizeBankDetails(user.bankDetails);
  return {
    name: user.name ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    nationality: user.nationality ?? "",
    spokenLanguage: user.spokenLanguage ?? "English",
    gender: user.gender ?? "Male",
    bankDetails: {
      accountHolderName: bank?.accountHolderName ?? "",
      iban: bank?.iban ?? "",
      bankName: bank?.bankName ?? "",
      swiftBic: bank?.swiftBic ?? "",
    },
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function OwnerProfileForm({
  values,
  onChange,
  errors = {},
  onSubmit,
  submitting = false,
  submitLabel = "Save profile",
  readOnlyEmail,
}: OwnerProfileFormProps) {
  const setBank = (patch: Partial<StructuredBankDetails>) => {
    onChange({
      ...values,
      bankDetails: { ...values.bankDetails, ...patch },
    });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Personal details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Full name</Label>
            <Input
              className="mt-1.5"
              value={values.name}
              onChange={(e) => onChange({ ...values, name: e.target.value })}
            />
            <FieldError message={errors.name} />
          </div>
          <div>
            <Label>Nationality</Label>
            <Input
              className="mt-1.5"
              value={values.nationality}
              onChange={(e) =>
                onChange({ ...values, nationality: e.target.value })
              }
            />
            <FieldError message={errors.nationality} />
          </div>
          <div>
            <Label>Language</Label>
            <Input
              className="mt-1.5"
              value={values.spokenLanguage}
              onChange={(e) =>
                onChange({ ...values, spokenLanguage: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              className="mt-1.5"
              value={values.gender}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onChange({ ...values, gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {readOnlyEmail && (
            <div className="sm:col-span-2">
              <Label>Email</Label>
              <Input className="mt-1.5" value={readOnlyEmail} disabled />
            </div>
          )}
          <div>
            <Label>Phone</Label>
            <Input
              className="mt-1.5"
              value={values.phone}
              onChange={(e) => onChange({ ...values, phone: e.target.value })}
            />
            <FieldError message={errors.phone} />
          </div>
          <div className="sm:col-span-2">
            <Label>Address</Label>
            <Input
              className="mt-1.5"
              value={values.address}
              onChange={(e) => onChange({ ...values, address: e.target.value })}
            />
            <FieldError message={errors.address} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30 p-5">
        <div>
          <h3 className="text-lg font-semibold">Payout details</h3>
          <p className="text-sm text-neutral-500 mt-1">
            Required so we can pay you for bookings. This information is kept
            secure and is required before your listing can go live.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Account holder name</Label>
            <Input
              className="mt-1.5"
              value={values.bankDetails.accountHolderName}
              onChange={(e) => setBank({ accountHolderName: e.target.value })}
            />
            <FieldError message={errors.accountHolderName} />
          </div>
          <div>
            <Label>IBAN</Label>
            <Input
              className="mt-1.5"
              value={values.bankDetails.iban}
              onChange={(e) => setBank({ iban: e.target.value })}
            />
            <FieldError message={errors.iban} />
          </div>
          <div>
            <Label>Bank name</Label>
            <Input
              className="mt-1.5"
              value={values.bankDetails.bankName}
              onChange={(e) => setBank({ bankName: e.target.value })}
            />
            <FieldError message={errors.bankName} />
          </div>
          <div className="sm:col-span-2">
            <Label>SWIFT / BIC (optional)</Label>
            <Input
              className="mt-1.5"
              value={values.bankDetails.swiftBic ?? ""}
              onChange={(e) => setBank({ swiftBic: e.target.value })}
            />
          </div>
        </div>
      </section>

      <ButtonPrimary onClick={onSubmit} disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </ButtonPrimary>
    </div>
  );
}
