"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Form, FormikProvider, useFormik } from "formik";
import { CREATE_USER } from "@/graphql/mutations";
import { useToast } from "@/components/ui/use-toast";

// ----------------------------------------------------------------------------

type FormikValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterView = () => {
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      await createUser({ variables: { ...values } });
      const result: any = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.ok) {
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          description: `Error: ${result.error}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Error: ${error}`,
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="Firs Name"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </Form>
        </FormikProvider>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/auth/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterView;
