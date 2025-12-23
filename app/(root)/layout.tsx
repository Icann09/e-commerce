import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await nextHeaders();

  // ✅ Explicitly convert ReadonlyHeaders → Headers
  const reqHeaders = new Headers();
  h.forEach((value, key) => {
    reqHeaders.append(key, value);
  });

  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  return (
    <>
      <Navbar user={session?.user ?? null} />
      {children}
      <Footer />
    </>
  );
}
