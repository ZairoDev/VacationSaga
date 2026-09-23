export interface GuestsObject {
  // Short-stay / flight guest pickers
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
  // Monthly / rooms filters (HeroSearchForm)
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export type StaySearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];
