import Card from "@/components/ui/Card";

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage site settings and configurations
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Site Information</h2>
          <p className="text-gray-600">
            Configure your site name, logo, and other basic settings through
            environment variables.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-600">
            Update contact details in the pages table for the contact page.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
          <p className="text-gray-600">
            Meta tags and SEO configurations are managed through Next SEO in the
            layout files.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Email Configuration</h2>
          <p className="text-gray-600">
            Email settings are configured through environment variables for
            security.
          </p>
        </Card>
      </div>
    </div>
  );
}
