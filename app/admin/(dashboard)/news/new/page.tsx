import Card from "@/components/ui/Card";
import NewsForm from "@/components/admin/NewsForm";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MdArrowBack } from "react-icons/md";

export default function NewNewsPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/news">
          <Button variant="ghost" className="mb-4">
            <MdArrowBack className="mr-2" /> Back to News
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Create News Article
        </h1>
        <p className="text-gray-600 mt-2">
          Add a new news post to your website
        </p>
      </div>

      <Card>
        <NewsForm />
      </Card>
    </div>
  );
}
