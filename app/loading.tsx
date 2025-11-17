import LoadingSpinner, {
  LoadingPulse,
} from "@/components/animations/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-6 text-gray-600 animate-pulse">
          Loading amazing content...
        </p>
      </div>
    </div>
  );
}
