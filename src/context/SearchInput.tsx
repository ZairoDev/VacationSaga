"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useAsync } from "react-use";


interface SearchInputContextType {
  place: string;
  date: Date[];
  guests: number;
  setPlace: (place: string) => void;
  setDate: (date: Date[]) => void;
  setGuests: (guests: number) => void;
}

const SearchInputContext = createContext<SearchInputContextType | undefined>(undefined)

const SearchInputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const dt = new Date(Date.now());
	const [place, setPlace] = useState<string>("");
	const [date, setDate] = useState<Date[]>([]);
	const [guests, setGuests] = useState<number>(1);

  return (
    <SearchInputContext.Provider value={{place, setPlace, date, setDate, guests, setGuests}}>{children}</SearchInputContext.Provider>
  );
};

export { SearchInputContext, SearchInputProvider };
