"use client";
import React, { createContext, useState, ReactNode } from "react";

interface SearchInputContextType {
  place: string;
  date: Date[];
  guests: number;
  bedrooms: number;
  bathrooms: number;
  setPlace: (place: string) => void;
  setDate: (date: Date[]) => void;
  setGuests: (guests: number) => void;
  setBedrooms: (bedrooms: number) => void;
  setBathrooms: (bathrooms: number) => void;
}

const SearchInputContext = createContext<SearchInputContextType | undefined>(undefined);

const SearchInputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<Date[]>([]);
  const [guests, setGuests] = useState<number>(1);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);

  return (
    <SearchInputContext.Provider
      value={{ place, setPlace, date, setDate, guests, setGuests, bedrooms, setBedrooms, bathrooms, setBathrooms }}
    >
      {children}
    </SearchInputContext.Provider>
  );
};

export { SearchInputContext, SearchInputProvider };
