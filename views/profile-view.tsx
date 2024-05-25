/* eslint-disable @next/next/no-img-element */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import PostDetailController from "@/layout/app-controller";
import { Button } from "@/components/ui/button";
import { Mail, Pencil } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Form, FormikProvider, useFormik } from "formik";
import { GET_USER } from "@/graphql/queries";
import { EDIT_PROFILE_PIC } from "@/graphql/mutations";
import AppContainer from "@/layout/app-container";
import ProfileSkeleton from "@/components/skeletons/profile-skeleton";

// ----------------------------------------------------------------------------

const ProfileView = () => {
  const { toast } = useToast();

  const { data: sessions } = useSession();

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: { userId: sessions?.user.id },
  });
  const router = useRouter();

  const [editProfilePic] = useMutation(EDIT_PROFILE_PIC);

  const formik = useFormik({
    initialValues: {
      profilePic: data ? data?.user.profilePic : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => handleEditProfilePic(values),
  });

  const handleEditProfilePic = async (values: { profilePic: string }) => {
    try {
      await editProfilePic({
        variables: {
          userId: data.user.id,
          profilePic: values.profilePic,
        },
      });
      toast({
        description: "Profile photo edited successfully",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Error: ${error}`,
      });
    }
  };

  return (
    <>
      <AppContainer title="Profile">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <Card x-chunk="dashboard-07-chunk-0">
            <CardContent className="flex flex-row px-4 py-6 gap-6 items-center">
              <div className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-gray-100 rounded-full absolute right-[-7px] top-[-7px] p-2 border-2 border-slate-900 cursor-pointer">
                      <Pencil className="h-3 w-3" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <FormikProvider value={formik}>
                      <Form onSubmit={formik.handleSubmit}>
                        <DialogHeader>
                          <DialogTitle>Edit profile photo</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Img Adress
                            </Label>
                            <Input
                              id="profilePic"
                              // defaultValue="Pedro Duarte"
                              value={formik.values.profilePic}
                              onChange={formik.handleChange}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </Form>
                    </FormikProvider>
                  </DialogContent>
                </Dialog>
                <img
                  height={90}
                  width={90}
                  src={
                    data?.user?.profilePic
                      ? data?.user?.profilePic
                      : "/assets/images/user.png"
                  }
                  alt="Profile Picture"
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-md mb-1">
                  {data?.user?.firstName + " " + data?.user?.lastName}
                </div>
                <p className="flex flex-row text-sm text-gray-400 gap-2 items-center">
                  <span>
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>{data?.user?.email}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </AppContainer>
    </>
  );
};

export default ProfileView;
