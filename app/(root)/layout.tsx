import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth/actions";
import ClientProviders from "@/components/ClientProvider";


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
      <ClientProviders />
      <Footer />
    </>
  );
}

