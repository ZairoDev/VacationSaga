import { FormProvider } from "../formItem";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FormProvider>{children}</FormProvider>;
}