import { Spinner } from "./spinner";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Spinner className="w-5 h-5" />
      <span className="text-gray-600">Loading...</span>
    </div>
  );
}
