import LoginForm from "@/components/admin/LoginForm";
import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-700 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-primary-100">
            Sign in to manage your school website
          </p>
        </div>

        <Card>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}













