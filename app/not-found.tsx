import Link from "next/link";
import Button from "@/components/ui/Button";
import { MdHome } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or deleted.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <MdHome className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
