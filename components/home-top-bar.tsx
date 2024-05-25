import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter, PlusCircle } from "lucide-react";
import Link from "next/link";
import { GET_CATEGORIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

// ----------------------------------------------------------------------------

interface HomeTopBarProps {
  onSelectedCategory: (categoryId: number) => void;
  onReset: () => void;
}

// ----------------------------------------------------------------------------

const HomeTopBar = ({ onSelectedCategory, onReset }: HomeTopBarProps) => {
  const { data } = useQuery(GET_CATEGORIES);
  return (
    <div className="flex items-center ">
      <span className="text-md font-bold">Posts</span>
      <div className="ml-auto flex items-center gap-2">
        <Button onClick={onReset} variant={"outline"}>
          Reset
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-lg px-16 gap-2"
            >
              <span>
                <Filter className="h-4 w-4" />
              </span>
              <span> by Category</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {data?.categories.map((category: { id: number; name: string }) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onSelectedCategory(category.id)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href={"/add-post"}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Post
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeTopBar;
