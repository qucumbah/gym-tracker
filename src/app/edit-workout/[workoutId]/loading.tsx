import { pageTitle } from "./pageTitle";
import LoadingHeart from "@/components/LoadingHeart";

export const metadata = {
  title: pageTitle,
};

export default function Loading() {
  return (
    <div className="grid place-items-center content-center justify-center">
      <span className="absolute -translate-y-2">Loading...</span>
      <LoadingHeart />
    </div>
  );
}
