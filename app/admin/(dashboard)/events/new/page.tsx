import Card from "@/components/ui/Card";
import EventForm from "@/components/admin/EventForm";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MdArrowBack } from "react-icons/md";

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-4">
        <Link href="/admin/news">
          <Button variant="ghost" size="sm" className="mb-3">
            <MdArrowBack className="mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create Event</h1>
      </div>

      <Card padding="sm">
        <EventForm />
      </Card>
    </div>
  );
}
