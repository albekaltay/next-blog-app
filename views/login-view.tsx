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
import { useRouter } from "next/navigation";
import { SignInResponse, signIn } from "next-auth/react";
import { Form, FormikProvider, useFormik } from "formik";
import { useToast } from "@/components/ui/use-toast";

// ----------------------------------------------------------------------

const LoginView = () => {
  const router = useRouter();

  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result: any = await signIn("credentials", {
      redirect: false,
      ...values,
    });
    console.log(result);

    if (result.ok) {
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        description: "Credentials do not match!",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </Form>
        </FormikProvider>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginView;
