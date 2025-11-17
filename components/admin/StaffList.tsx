"use client";

import { Staff } from "@/lib/types/database";
import Button from "@/components/ui/Button";
import { MdAdd } from "react-icons/md";

export default function StaffList({ staff }: { staff: Staff[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Staff Members ({staff.length})</h2>
        <Button variant="primary" size="sm">
          <MdAdd className="mr-2" /> Add Staff Member
        </Button>
      </div>

      {staff.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No staff members yet. Add your first staff member!
        </p>
      ) : (
        <div className="space-y-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  {member.department && (
                    <p className="text-sm text-gray-500">{member.department}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}













