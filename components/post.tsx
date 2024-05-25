import React from "react";
import { Separator } from "./ui/separator";
import { Ellipsis, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DELETE_POST } from "@/graphql/mutations";
import { getTodayFromDate } from "@/lib/utils";

// ----------------------------------------------------------------------------

interface PostProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  commentCount: number;
  profilePic: string;
}

// ----------------------------------------------------------------------------

const Post = ({
  id,
  title,
  content,
  createdAt,
  author,
  commentCount,
  profilePic,
}: PostProps) => {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id },
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost();
      router.refresh();
      toast({
        description: "Post deleted successfully",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: err.toString(),
      });
    }
  };

  return (
    <div className="gap-2 ">
      <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all w-full">
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-2 mb-2">
              <Avatar>
                <AvatarImage
                  src={profilePic ? profilePic : "/assets/images/user.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="font-semibold">{author}</div>
            </div>
            <div className="ml-auto text-xs">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-lg"
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`post-detail/${id}`}>
                    <DropdownMenuItem>Detail</DropdownMenuItem>
                  </Link>
                  <Link href={`/edit-post/${id}`}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Link href={`post-detail/${id}`}>
            <div className="text-xs font-medium cursor-pointer">{title}</div>
          </Link>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {content}
        </div>
        <Separator className="my-1" />
        <div className="flex flex-row justify-between items-center w-full ">
          <div className="flex flex-row  gap-4">
            <Link href={`post-detail/${id}`}>
              <div className="flex flex-row items-center gap-2">
                <span>
                  <MessageCircle className="h-4 w-4" />{" "}
                </span>
                <span className="text-xs font-normal">{commentCount}</span>
              </div>
            </Link>
          </div>
          <span className="text-gray-400"> {getTodayFromDate(createdAt)} </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
