"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DetailSkeleton from "@/components/skeletons/detail-skeleton";
import { useMutation, useQuery } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GET_POST } from "@/graphql/queries";
import { CREATE_COMMNET } from "@/graphql/mutations";
import { getTodayFromDate } from "@/lib/utils";
import AppContainer from "@/layout/app-container";
import { Form, FormikProvider, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

type Comment = {
  author: {
    profilePic: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  content: string;
};
// ----------------------------------------------------------------------------

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const PostDetailView = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const id: any = params?.id;

  const { toast } = useToast();

  const { loading, data, refetch } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  const commentCount = data?.post?.comments.length;

  const [creteComment] = useMutation(CREATE_COMMNET);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => handleCreateComment(values),
  });

  const handleCreateComment = async (values: { comment: string }) => {
    try {
      await creteComment({
        variables: {
          postId: parseInt(id),
          content: values.comment,
          authorId: session?.user.id,
        },
      });
      refetch();
      formik.resetForm();

      toast({
        description: "Comment posted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Error: ${error}`,
      });
    }
  };

  return (
    <>
      <AppContainer title="Post Detail">
        {loading ? (
          <DetailSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{data?.post?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{data?.post?.content}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-6">
              <Separator />
              <div className="flex flex-row gap-2">
                <Badge variant="secondary">{data.post.category.name}</Badge>
                <Badge variant="secondary">
                  {"Created at " + getTodayFromDate(data.post.createdAt)}
                </Badge>
                <Badge variant="secondary">
                  {"Updated at " + getTodayFromDate(data.post.updatedAt)}
                </Badge>
              </div>
              <div className="border-2 border-gray-100 rounded-lg border-dashed flex flex-col p-4 gap-1">
                <span className="font-semibold text-sm">
                  {"Created by " +
                    data?.post?.author.firstName +
                    " " +
                    data?.post?.author.lastName}{" "}
                </span>

                <span className="text-xs text-gray-400">
                  {data?.post?.author.email}
                </span>
              </div>

              <Separator className="my-2" />
              <div className="grid gap-3 w-full">
                <FormikProvider value={formik}>
                  <Form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-3"
                  >
                    <Label htmlFor="description">
                      Comments ({commentCount})
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Type here..."
                      className="min-h-32"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">Post Comment</Button>
                    </div>{" "}
                  </Form>
                </FormikProvider>
                <Separator className="my-2" />
                {commentCount === 0 ? (
                  <div>No comment found.</div>
                ) : (
                  data?.post?.comments.map(
                    (comment: Comment, index: number) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row items-center gap-2">
                            {" "}
                            <Avatar>
                              <AvatarImage
                                src={
                                  comment?.author?.profilePic
                                    ? comment?.author?.profilePic
                                    : "/assets/images/user.png"
                                }
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-sm">
                              {comment.author.firstName +
                                " " +
                                comment.author.lastName}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {getTodayFromDate(comment.createdAt)}
                          </span>
                          <span>{comment.content}</span>
                        </div>
                        {commentCount !== index + 1 && <Separator />}
                      </React.Fragment>
                    )
                  )
                )}
              </div>
            </CardFooter>
          </Card>
        )}
      </AppContainer>
    </>
  );
};

export default PostDetailView;
