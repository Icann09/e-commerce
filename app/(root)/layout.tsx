import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { getCurrentUser } from "@/lib/auth/actions";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <>
      <Navbar user={user ?? null} />
      {children}
      <Footer />
    </>
  );
}

