"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth.provider";
import { UpdateUserSchema } from "@/types";
import { useForm } from "react-hook-form";
import { updateUser } from "../actions";

export default function UserSettingss() {
  const {
    auth: { user },
  } = useAuth();
  const form = useForm({
    defaultValues: { name: user?.name || "", username: user?.username || "" },
  });
  const { refetch } = useAuth();
  async function onSubmit() {
    const values: UpdateUserSchema = {};
    var anyDirty: boolean = false;
    Object.keys(form.formState.dirtyFields).forEach((field) => {
      anyDirty = true;
      const f = field as keyof UpdateUserSchema;
      values[f] = form.getValues(f);
    });
    if (!anyDirty) {
      return;
    }
    await updateUser(values);
    refetch();
  }
  return (
    <form
      className="gap-4 flex flex-col mt-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <FormField
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
      <Button type="submit">Update User</Button>
    </form>
  );
}
