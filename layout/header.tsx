"use client";
// next
import Link from "next/link";
//
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// icon
import { User } from "lucide-react";
// next-auth
import { signOut, useSession } from "next-auth/react";

// ----------------------------------------------------------------------

export default function Header() {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut();
  };
  return (
    <header className="sticky top-0 z-50 transition-all bg-slate-950  h-16 flex items-center w-full">
      <nav className="container flex justify-between items-center">
        <Link href={"/"}>
          <span className="text-2xl font-bold text-white">Popupsmart Blog</span>
        </Link>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-lg h-[35px] w-[35px]"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
