import { Skeleton } from "./ui/skeleton";

export default function NoteSkeleton() {
  return (
    <div className="flex h-[176px] w-72 flex-col gap-3 rounded-md border p-5 text-center opacity-100">
      <div className="flex items-start justify-between">
        <Skeleton className="h-[20px] w-[20px]" />
        <Skeleton className="h-[20px] w-[20px]" />
      </div>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-7 w-full" />

      <div className="flex items-end justify-between">
        <Skeleton className="h-4 w-[65px]" />
        <Skeleton className="h-[20px] w-[20px]" />
      </div>
    </div>
  );
}
