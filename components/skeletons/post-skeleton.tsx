import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col space-x-4 py-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4 ps-6">
          <Skeleton className="h-12 w-12 rounded-full mb-4" />
          <Skeleton className="h-4 w-[175px] mb-4" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md mb-4" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-[200px] mb-4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </div>
  );
};
export default PostSkeleton;
