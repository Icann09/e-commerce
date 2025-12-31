import type { ReactNode } from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { getCurrentUser } from "@/lib/auth/actions";



  export const dynamic = "force-dynamic";


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();


  return (
    <div>      
      <ProfileHeader user={user}/>
      {children}
    </div>
  );
}
