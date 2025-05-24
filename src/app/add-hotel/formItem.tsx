// app/add-listing/FormContext.tsx
"use client"
import { createContext, useContext, useState } from "react";

const FormContext = createContext<any>(null);

export const useFormData = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState({
    ownerDetails: {},
    propertyDetails: {},
    roomDetails: [],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
