import ToastProvider from "@/components/ui/ToastProvider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <ToastProvider />
    </div>
  );
}
