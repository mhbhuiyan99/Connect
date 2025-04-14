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
import { useRouter } from "next/navigation";

const formSchema = z
.object({
  username: z.string().min(1, 'Username is required').max(40),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must have at least 8 characters'),
  confirmPassword: z.string().min(1, 'Password confirmation is required'),
})
.refine((data) => data.password === data.confirmPassword,{
  path: ['confirmPassword'],
  message: 'Password do not match'
});

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values:z.infer<typeof formSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
    })

    if(response.ok){
      router.push('/sign-in')
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto w-full space-y-5">
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="name"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="confirm your password"
                    type = "password"
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
            Sign Up
          </Button>
        </div>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before: mr-4 before: block before: h-px before: flex-grow before: bg-stone-400 after:ml-4 after: block after:h-px after: flex-grow after: bg-stone-400">
        or
      </div>
      
      <GoogleSignInButton>
            Sign Up with Google
      </GoogleSignInButton>

      <p className="text-center text-sm text-gray-600 mt-2">
        If you have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href = '/sign-in'> Sign In </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
