import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
