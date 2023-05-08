import NoteSkeleton from "@/components/NoteSkeleton";

export default function Loading() {
  return (
    <div className="absolute inset-0 m-auto grid h-fit w-fit place-items-center gap-6">
      <NoteSkeleton />
    </div>
  );
}
