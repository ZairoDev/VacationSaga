"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import Input from "@/shared/Input";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Select from "@/shared/Select";

type OwnerCalendarStepProps = {
  propertyId: string;
  exportIcalUrl: string;
  existingLinks?: Record<string, string>;
  icalSkipped?: boolean;
  agreementsComplete: boolean;
  onSaved: () => void;
};

const PLATFORMS = ["Airbnb", "Booking.com", "Other"];

export function OwnerCalendarStep({
  propertyId,
  exportIcalUrl,
  existingLinks = {},
  icalSkipped = false,
  agreementsComplete,
  onSaved,
}: OwnerCalendarStepProps) {
  const [platform, setPlatform] = useState("Airbnb");
  const [url, setUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const hasLinks = Object.values(existingLinks).some((v) => v?.trim());
  const satisfied = hasLinks || icalSkipped;

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    setTestError(null);
    try {
      const res = await axios.post("/api/ical", { url });
      const count = res.data.blockedNightCount ?? 0;
      setTestResult(
        `Calendar link works — ${count} booked night${count === 1 ? "" : "s"} found.`,
      );
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Could not read that calendar URL";
      setTestError(msg);
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    if (!url.trim()) {
      setTestError("Paste your calendar link first");
      return;
    }
    setSaving(true);
    setTestError(null);
    try {
      await axios.post("/api/owner-onboarding/save-ical", {
        propertyId,
        platform,
        url: url.trim(),
      });
      toast.success("Calendar link saved");
      setUrl("");
      setTestResult(null);
      onSaved();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Could not save calendar link";
      setTestError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    setSkipping(true);
    try {
      await axios.post("/api/owner-onboarding/skip-ical", { propertyId });
      toast.success("You can add a calendar link later from this page or your account");
      onSaved();
    } catch {
      toast.error("Could not skip calendar step");
    } finally {
      setSkipping(false);
    }
  };

  const copyExportUrl = async () => {
    try {
      await navigator.clipboard.writeText(exportIcalUrl);
      toast.success("Export link copied");
    } catch {
      toast.error("Could not copy — select and copy the link manually");
    }
  };

  if (!agreementsComplete) {
    return (
      <p className="text-sm text-neutral-500">
        Accept both agreements above to set up your calendar.
      </p>
    );
  }

  if (satisfied && hasLinks) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 space-y-3">
        <p className="text-sm font-medium text-green-700 dark:text-green-400">
          Calendar connected
        </p>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
          {Object.entries(existingLinks).map(([key, value]) =>
            value?.trim() ? (
              <li key={key}>
                <span className="font-medium">{key}:</span>{" "}
                <span className="break-all">{value}</span>
              </li>
            ) : null,
          )}
        </ul>
        <p className="text-xs text-neutral-500">
          Vacation Saga export link (paste into Airbnb / Booking.com):{" "}
          <button
            type="button"
            onClick={() => void copyExportUrl()}
            className="text-primary-6000 underline"
          >
            Copy link
          </button>
        </p>
      </div>
    );
  }

  if (satisfied && icalSkipped && !hasLinks) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 space-y-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          You skipped the calendar step. We recommend adding a link later to avoid
          double bookings on other platforms.
        </p>
        <details className="text-sm">
          <summary className="cursor-pointer text-primary-6000 font-medium">
            Add calendar link now
          </summary>
          <div className="mt-3 space-y-3">
            <CalendarFormFields
              platform={platform}
              setPlatform={setPlatform}
              url={url}
              setUrl={setUrl}
              testResult={testResult}
              testError={testError}
              testing={testing}
              onTest={() => void handleTest()}
            />
            <div className="flex flex-wrap gap-2">
              <ButtonPrimary
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save calendar link"}
              </ButtonPrimary>
            </div>
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 space-y-4">
      <div>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Connect your Airbnb or Booking.com calendar so guests cannot book dates
          you already have reserved elsewhere. This step is{" "}
          <strong>optional</strong> — you can skip and add it later.
        </p>
      </div>

      <CalendarFormFields
        platform={platform}
        setPlatform={setPlatform}
        url={url}
        setUrl={setUrl}
        testResult={testResult}
        testError={testError}
        testing={testing}
        onTest={() => void handleTest()}
      />

      <div className="space-y-2">
        <Label>Export Vacation Saga bookings to other platforms</Label>
        <div className="flex gap-2">
          <Input
            readOnly
            value={exportIcalUrl}
            className="text-xs"
          />
          <button
            type="button"
            onClick={() => void copyExportUrl()}
            className="shrink-0 rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-neutral-500">
          Paste this into your Airbnb or Booking.com calendar import settings.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <ButtonPrimary
          type="button"
          onClick={() => void handleSave()}
          disabled={saving || !url.trim()}
        >
          {saving ? "Saving…" : "Save calendar link"}
        </ButtonPrimary>
        <button
          type="button"
          onClick={() => void handleSkip()}
          disabled={skipping}
          className="text-sm font-medium text-neutral-600 underline dark:text-neutral-400"
        >
          {skipping ? "Skipping…" : "Skip for now"}
        </button>
      </div>
    </div>
  );
}

function CalendarFormFields({
  platform,
  setPlatform,
  url,
  setUrl,
  testResult,
  testError,
  testing,
  onTest,
}: {
  platform: string;
  setPlatform: (v: string) => void;
  url: string;
  setUrl: (v: string) => void;
  testResult: string | null;
  testError: string | null;
  testing: boolean;
  onTest: () => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <Label>Platform</Label>
        <Select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Calendar import link (iCal URL)</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.airbnb.com/calendar/ical/..."
        />
        <p className="mt-1 text-xs text-neutral-500">
          In Airbnb: Listing → Availability → Connect calendars → Export calendar.
        </p>
      </div>
      <button
        type="button"
        onClick={onTest}
        disabled={testing || !url.trim()}
        className="text-sm font-medium text-primary-6000 underline disabled:opacity-50"
      >
        {testing ? "Testing…" : "Test link"}
      </button>
      {testResult && (
        <p className="text-sm text-green-600 dark:text-green-400">{testResult}</p>
      )}
      {testError && (
        <p className="text-sm text-red-600 dark:text-red-400">{testError}</p>
      )}
    </div>
  );
}
