"use client";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { CREATE_POST, EDIT_POST } from "@/graphql/mutations";
import { GET_CATEGORIES, GET_POST_TO_FORM } from "@/graphql/queries";

// ----------------------------------------------------------------------------

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  categoryId: Yup.string().required("Category is required"),
});

const AddEditForm = () => {
  const params = useParams();
  const id: any = params?.id;
  const { data: singlePostData } = useQuery(GET_POST_TO_FORM, {
    variables: { postId: id },
  });
  const [createPost] = useMutation(CREATE_POST);
  const [editPost] = useMutation(EDIT_POST);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      title: singlePostData ? singlePostData?.post.title : "",
      content: singlePostData ? singlePostData?.post.content : "",
      categoryId: singlePostData ? singlePostData?.post.category.id : "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (id) {
          await editPost({
            variables: {
              ...values,
              postId: parseInt(id),
              categoryId: parseInt(values.categoryId),
            },
          });
          toast({ description: "Post edited successfully." });
        } else {
          await createPost({
            variables: {
              ...values,
              authorId: session?.user.id,
              categoryId: parseInt(values.categoryId),
            },
          });
          toast({ description: "Post created successfully." });
        }
        router.push("/");
      } catch (error) {
        toast({
          variant: "destructive",
          description: `Error: ${error}`,
        });
      }
    },
  });

  return (
    <>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader></CardHeader>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <CardContent className="flex flex-col gap-4 lg:gap-0">
              <div className="flex flex-col lg:flex-row lg:mb-4">
                <div className="lg:basis-2/6 basis-12">
                  <div className="text-md font-semibold mb-1">Details</div>
                  <p className="text-sm lg:block hidden">Title, content...</p>
                </div>

                <div className="lg:basis-4/6  basis-12 grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      className="w-full"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      className="min-h-32"
                      onChange={formik.handleChange}
                      value={formik.values.content}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:basis-2/6 basis-12">
                  <div className="text-md font-semibold mb-1">Properties</div>
                  <p className="text-sm lg:block hidden">
                    Additional functions and attributes...
                  </p>
                </div>

                <div className="lg:basis-4/6  basis-12 grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) =>
                        formik.setFieldValue("categoryId", value)
                      }
                      value={formik.values.categoryId}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categoriesData?.categories.map(
                            (category: { id: string; name: string }) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t px-6 py-4">
              <Button>{id ? "Edit Post" : "Add Post"} </Button>
            </CardFooter>
          </Form>
        </FormikProvider>
      </Card>
    </>
  );
};

export default AddEditForm;
