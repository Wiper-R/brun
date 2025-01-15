"use client";
import { useForm } from "react-hook-form";
import { getUser, signin, signup } from "../actions";
import { SignupSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { name: "", password: "", email: "", username: "" },
  });
  async function onSubmit(data: SignupSchema) {
    const result = await signup(data);
    if (result.success) {
      toast.success("Signup successful redirecting to login");
      router.push("/signin");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div className="flex items-center flex-col">
      <h3 className="text-3xl font-bold my-10">Social Media</h3>
      <Card className="max-w-[400px] mx-auto w-full shadow-lg">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
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
              <Button type="submit">Signup</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
