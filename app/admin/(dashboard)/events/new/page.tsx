import Card from "@/components/ui/Card";
import EventForm from "@/components/admin/EventForm";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MdArrowBack } from "react-icons/md";

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/events">
          <Button variant="ghost" className="mb-4">
            <MdArrowBack className="mr-2" /> Back to Events
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create Event</h1>
        <p className="text-gray-600 mt-2">Add a new event to your calendar</p>
      </div>

      <Card>
        <EventForm />
      </Card>
    </div>
  );
}
