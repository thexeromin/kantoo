import { useNavigate, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup
} from "@/components/ui/field";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { authService } from "@/services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { mutateAsync: signup, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast.error("Login Failed", {
        description: error.message,
        position: "top-center"
      });
    }
  });

  async function onSubmit(data: LoginInput) {
    signup(data);
  }

  const { errors } = form.formState;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="w-full max-w-lg p-8 sm:p-10 overflow-hidden rounded-2xl border bg-card shadow-xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className="space-y-5">
              <Field className="space-y-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="h-11 bg-background"
                  {...form.register("email")}
                />
                {errors.email && (
                  <FieldError className="text-sm text-destructive">
                    {errors.email.message}
                  </FieldError>
                )}
              </Field>

              <Field className="space-y-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  className="h-11 bg-background"
                  {...form.register("password")}
                />
                {errors.password && (
                  <FieldError className="text-sm text-destructive">
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>
            </FieldGroup>

            <div className="grid grid-cols-2 gap-3">
              <Button
                className="w-full h-11 text-base font-medium"
                type="submit"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log in
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-11 text-sm font-medium border-dashed"
                onClick={() => {
                  form.setValue("email", "bob@example.com");
                  form.setValue("password", "hashed_password_here");
                  form.handleSubmit(onSubmit)();
                }}
              >
                Login as Test
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
