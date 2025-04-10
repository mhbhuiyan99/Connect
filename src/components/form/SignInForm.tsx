"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must have at least 8 characters'),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values:z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto w-full space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="example@mbstu.ac.bd"
                    {...field} 
                  />
                </FormControl>
                {/*
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  */}
                <FormMessage />
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
                  <Input 
                    placeholder="Enter your password" 
                    type = 'password'
                    {...field} 
                  />
                </FormControl>
                {/*
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full margin-top-6 bg-red-800" type="submit">
            Sign In
          </Button>
        </div>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before: h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after: flex-grow after: bg-stone-400">
        or
      </div>
      <GoogleSignInButton>
            Sign In with Google
      </GoogleSignInButton>

      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href = '/sign-up'> Sign Up </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
