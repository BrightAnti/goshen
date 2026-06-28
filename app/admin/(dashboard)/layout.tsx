import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <AdminNav />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}















