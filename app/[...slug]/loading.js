import { Skeleton } from "../../components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-black" />
        <Skeleton className="h-4 w-[200px] bg-black" />
      </div>
    </div>
  );
}
