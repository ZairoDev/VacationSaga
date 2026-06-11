"use client";

import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import {
  OwnerProfileForm,
  emptyOwnerProfileFormValues,
  ownerProfileFromUser,
  type OwnerProfileFormValues,
} from "@/components/owner/OwnerProfileForm";
import { OwnerCalendarStep } from "@/components/owner/OwnerCalendarStep";
import { formatBankSummary } from "@/lib/owner-profile";

type OnboardingStep = {
  key: string;
  label: string;
  complete: boolean;
  completedAt?: string | null;
};

type OnboardingProperty = {
  propertyId: string;
  vsid: string;
  name: string;
  commonId?: string;
  icalLinks?: Record<string, string>;
  icalSkippedAt?: string | null;
  exportIcalUrl?: string;
  steps: OnboardingStep[];
  complete: boolean;
};

export default function OwnerOnboardingPage() {
  const { user, loading: authLoading, fetchUserDetails } = useAuth();
  const [properties, setProperties] = useState<OnboardingProperty[]>([]);
  const [ownerProfileCompletedAt, setOwnerProfileCompletedAt] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [accepting, setAccepting] = useState<string | null>(null);
  const [profile, setProfile] = useState<OwnerProfileFormValues>(
    emptyOwnerProfileFormValues(),
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/owner-onboarding/status");
      setProperties(res.data.properties ?? []);
      setOwnerProfileCompletedAt(res.data.ownerProfileCompletedAt ?? null);
    } catch {
      toast.error("Could not load onboarding status");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setProfile(ownerProfileFromUser(user));
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      void loadStatus();
    }
  }, [authLoading, loadStatus]);

  const profileComplete = Boolean(ownerProfileCompletedAt);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setFieldErrors({});
    try {
      const res = await axios.post("/api/owner-onboarding/complete-profile", {
        ...profile,
        bankDetails: profile.bankDetails,
      });
      toast.success("Profile saved — you can continue with agreements");
      setOwnerProfileCompletedAt(res.data.ownerProfileCompletedAt ?? null);
      await fetchUserDetails();
      await loadStatus();
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { errors?: Record<string, string> } } })
        ?.response?.data;
      if (data?.errors) setFieldErrors(data.errors);
      toast.error("Please complete all required fields");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAccept = async (
    propertyId: string,
    type: "service" | "partner",
  ) => {
    setAccepting(`${propertyId}-${type}`);
    try {
      await axios.post("/api/owner-onboarding/accept-agreement", {
        propertyId,
        type,
      });
      toast.success(
        type === "service"
          ? "Service agreement accepted"
          : "Partner agreement accepted",
      );
      await loadStatus();
    } catch {
      toast.error("Could not save agreement");
    } finally {
      setAccepting(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container py-16 text-center text-neutral-500">
        Loading onboarding…
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="container max-w-2xl py-16 space-y-4">
        <h1 className="text-2xl font-semibold">Owner onboarding</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          You have no properties waiting for onboarding, or everything is already
          complete.
        </p>
        <Link href="/author" className="text-primary-6000 underline">
          Go to your dashboard
        </Link>
      </div>
    );
  }

  const bankSummary = formatBankSummary(profile.bankDetails);

  return (
    <div className="container max-w-3xl py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Complete your listing</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Your property is registered but not yet public. Complete each step
          below — our team will publish it after verification.
        </p>
        <div className="mt-6 flex gap-2 text-xs font-medium">
          {["Profile", "Agreements", "Calendar"].map((label, i) => {
            const done =
              (i === 0 && profileComplete) ||
              (i === 1 &&
                properties.some((p) =>
                  p.steps
                    .filter((s) => s.key.includes("Agreement"))
                    .every((s) => s.complete),
                )) ||
              (i === 2 &&
                properties.every((p) =>
                  p.steps.find((s) => s.key === "icalConfigured")?.complete,
                ));
            return (
              <span
                key={label}
                className={`rounded-full px-3 py-1 border ${
                  done
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : "border-neutral-300 text-neutral-500"
                }`}
              >
                {done ? "✓ " : `${i + 1}. `}
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-4">
        <h2 className="text-xl font-semibold">Step 1 — Your profile & payout details</h2>
        {profileComplete ? (
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-4 space-y-2">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              Profile confirmed
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Payout: {bankSummary}
            </p>
            <Link href="/account" className="text-sm text-primary-6000 underline">
              Edit profile
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              We need your contact details and bank information for payouts before
              your listing can go live.
            </p>
            <OwnerProfileForm
              values={profile}
              onChange={setProfile}
              errors={fieldErrors}
              onSubmit={() => void handleSaveProfile()}
              submitting={savingProfile}
              submitLabel="Save and continue"
              readOnlyEmail={user?.email}
            />
          </>
        )}
      </section>

      {properties.map((property) => (
        <section
          key={property.propertyId}
          className={`rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-4 ${
            !profileComplete ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <h2 className="text-xl font-semibold">
            {property.name}{" "}
            <span className="text-sm font-normal text-neutral-500">
              (VSID {property.vsid})
            </span>
          </h2>
          {!profileComplete && (
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Complete your profile above before accepting agreements or adding
              calendar links.
            </p>
          )}

          <ul className="space-y-3">
            {property.steps
              .filter(
                (s) =>
                  s.key !== "profileComplete" && s.key !== "icalConfigured",
              )
              .map((step) => (
                <li
                  key={step.key}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 px-4 py-3"
                >
                  <span
                    className={
                      step.complete
                        ? "text-green-700 dark:text-green-400"
                        : "text-neutral-700 dark:text-neutral-300"
                    }
                  >
                    {step.complete ? "✓ " : "○ "}
                    {step.label}
                  </span>

                  {profileComplete && !step.complete && step.key === "serviceAgreement" && (
                    <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                      <Link
                        href="/termsandconditions"
                        target="_blank"
                        className="text-sm text-primary-6000 underline"
                      >
                        Read service terms
                      </Link>
                      <button
                        type="button"
                        className="text-sm font-medium text-primary-6000 underline"
                        disabled={accepting === `${property.propertyId}-service`}
                        onClick={() =>
                          void handleAccept(property.propertyId, "service")
                        }
                      >
                        I accept
                      </button>
                    </div>
                  )}

                  {profileComplete && !step.complete && step.key === "partnerAgreement" && (
                    <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                      <Link
                        href="/termsandconditions"
                        target="_blank"
                        className="text-sm text-primary-6000 underline"
                      >
                        Read partner terms
                      </Link>
                      <button
                        type="button"
                        className="text-sm font-medium text-primary-6000 underline"
                        disabled={accepting === `${property.propertyId}-partner`}
                        onClick={() =>
                          void handleAccept(property.propertyId, "partner")
                        }
                      >
                        I accept
                      </button>
                    </div>
                  )}

                </li>
              ))}
          </ul>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Step 3 — Calendar (optional)</h3>
            <OwnerCalendarStep
              propertyId={property.propertyId}
              exportIcalUrl={
                property.exportIcalUrl ??
                `https://www.vacationsaga.com/api/ical/${property.propertyId}`
              }
              existingLinks={property.icalLinks}
              icalSkipped={Boolean(property.icalSkippedAt)}
              agreementsComplete={property.steps
                .filter((s) => s.key.includes("Agreement"))
                .every((s) => s.complete)}
              onSaved={() => void loadStatus()}
            />
          </div>

          {property.complete ? (
            <p className="text-green-600 text-sm font-medium">
              All steps complete. Our team will review and publish your listing
              soon.
            </p>
          ) : (
            <p className="text-sm text-neutral-500">
              Finish all steps above, then refresh this page.
            </p>
          )}

          <button
            type="button"
            onClick={() => void loadStatus()}
            className="text-sm text-primary-6000 underline pointer-events-auto"
          >
            Refresh status
          </button>
        </section>
      ))}

      <Link href="/author" className="inline-block text-primary-6000 underline">
        Back to owner dashboard
      </Link>
    </div>
  );
}
