import { isShortTermOwnerProfileComplete } from "@/lib/owner-profile";

export type OnboardingStepKey =
  | "profileComplete"
  | "serviceAgreement"
  | "partnerAgreement"
  | "icalConfigured";

export interface OnboardingStep {
  key: OnboardingStepKey;
  label: string;
  complete: boolean;
  completedAt?: string | null;
}

type UserLike = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  nationality?: string;
  bankDetails?: unknown;
  isProfileComplete?: boolean;
  ownerProfileCompletedAt?: Date | string | null;
};

type PropertyLike = {
  _id?: unknown;
  VSID?: string;
  placeName?: string;
  propertyName?: string;
  isLive?: boolean;
  listingSource?: string;
  icalLinks?: Map<string, string> | Record<string, string>;
  ownerOnboarding?: {
    serviceAgreementAcceptedAt?: Date | string | null;
    partnerAgreementAcceptedAt?: Date | string | null;
    icalSkippedAt?: Date | string | null;
  };
};

function hasText(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isOwnerProfileComplete(user: UserLike | null | undefined): boolean {
  return isShortTermOwnerProfileComplete(user);
}

export function hasIcalLinks(property: PropertyLike | null | undefined): boolean {
  if (!property?.icalLinks) return false;
  const links = property.icalLinks;
  if (links instanceof Map) {
    return Array.from(links.values()).some((v) => hasText(v));
  }
  return Object.values(links).some((v) => hasText(v));
}

export function isIcalStepSatisfied(
  property: PropertyLike | null | undefined,
): boolean {
  if (hasIcalLinks(property)) return true;
  const skipped = property?.ownerOnboarding?.icalSkippedAt;
  if (!skipped) return false;
  const d = skipped instanceof Date ? skipped : new Date(skipped);
  return !Number.isNaN(d.getTime());
}

function toIso(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function computePropertyOnboardingSteps(
  user: UserLike | null,
  property: PropertyLike,
): OnboardingStep[] {
  const hasLinks = hasIcalLinks(property);
  const skipped = Boolean(property.ownerOnboarding?.icalSkippedAt);

  return [
    {
      key: "profileComplete",
      label: "Owner confirmed profile on VS",
      complete: isShortTermOwnerProfileComplete(user),
      completedAt: toIso(user?.ownerProfileCompletedAt ?? null),
    },
    {
      key: "serviceAgreement",
      label: "Service agreement accepted",
      complete: Boolean(property.ownerOnboarding?.serviceAgreementAcceptedAt),
      completedAt: toIso(property.ownerOnboarding?.serviceAgreementAcceptedAt),
    },
    {
      key: "partnerAgreement",
      label: "Partner agreement accepted",
      complete: Boolean(property.ownerOnboarding?.partnerAgreementAcceptedAt),
      completedAt: toIso(property.ownerOnboarding?.partnerAgreementAcceptedAt),
    },
    {
      key: "icalConfigured",
      label: hasLinks
        ? "Calendar link added"
        : skipped
          ? "Calendar skipped for now"
          : "Calendar link (optional)",
      complete: isIcalStepSatisfied(property),
      completedAt: hasLinks
        ? null
        : toIso(property.ownerOnboarding?.icalSkippedAt),
    },
  ];
}

export function isPropertyOnboardingComplete(
  user: UserLike | null,
  property: PropertyLike,
): boolean {
  return computePropertyOnboardingSteps(user, property).every((s) => s.complete);
}

/** Login redirect gate — profile + agreements only; iCal is optional */
export function ownerRequiresOnboarding(
  user: UserLike | null,
  properties: PropertyLike[],
): boolean {
  const pending = properties.filter(needsShortTermOwnerOnboarding);
  return pending.some((property) => {
    const steps = computePropertyOnboardingSteps(user, property);
    return steps.some(
      (s) =>
        s.key !== "icalConfigured" && !s.complete,
    );
  });
}

export function needsShortTermOwnerOnboarding(property: PropertyLike): boolean {
  return (
    property.listingSource === "short_term_owner_sheet" &&
    property.isLive !== true
  );
}
