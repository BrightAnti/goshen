import { createServerClient } from "@/lib/supabase/server";
import { Staff } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import StaffList from "@/components/admin/StaffList";

async function getAllStaff() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("staff")
    .select("*")
    .order("order_index", { ascending: true });

  return (data as Staff[]) || [];
}

export default async function AdminStaffPage() {
  const staff = await getAllStaff();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-gray-600 mt-2">
          Manage staff and leadership profiles
        </p>
      </div>

      <Card>
        <StaffList staff={staff} />
      </Card>
    </div>
  );
}
