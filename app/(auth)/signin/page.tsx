"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signin } from "../../../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const form = useForm<SigninSchema>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { password: "", username_email: "" },
  });
  async function onSubmit(data: SigninSchema) {
    const result = await signin(data);
    if (result.success) {
      toast.success("Login successful, redirecting...");
      router.push("/");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div className="flex items-center flex-col py-10">
      <Card className="max-w-[400px] mx-auto w-full shadow-lg">
        <CardHeader>
          <CardTitle>Signin</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email / Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Signin</Button>
              <div className="text-xs ml-auto">
                Don't have an account? <Link href="/signup">Create</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
