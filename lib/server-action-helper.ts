// Credits: https://www.seekhcode.me/blog/server-actions-pattern/ (Written by me ofcourse :))
import { z, ZodError, ZodSchema } from "zod";

type ServerActionReturnType<T> =
  | { success: true; data: T }
  | { success: false; message: string; status: number };

export class ApiError extends Error {
  status: number;
  constructor({ message, status = 500 }: { message: string; status?: number }) {
    super(message);
    this.status = status;
  }
}

export const serverActionWrapper = <T extends ZodSchema, R>({
  schema,
  callback,
}: {
  schema: T;
  callback: (input: z.infer<T>) => Promise<R>;
}) => {
  return async (input: z.infer<T>): Promise<ServerActionReturnType<R>> => {
    try {
      const validatedInput = await schema.parseAsync(input);
      const data = await callback(validatedInput);
      return { success: true, data };
    } catch (e) {
      let status = 400;
      let message = "An error occurred.";
      if (e instanceof ZodError) {
        message = e.errors
          .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
          .join("\n");
      } else if (e instanceof ApiError) {
        message = e.message;
        status = e.status;
      } else {
        console.error(e);
        status = 500;
      }
      return { success: false, message: message, status };
    }
  };
};
