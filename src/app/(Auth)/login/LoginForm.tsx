"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '_/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form'
import { Input } from '_/components/ui/input';
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { LoginSchemaType } from './login.types';
import { loginSchema } from './login.schema';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';


export default function LoginForm() {

    const router = useRouter();

    const RHFobject = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });


    async function mySubmitHandler(data: LoginSchemaType) {
        try {
            const response = await signIn("credentials", {
                ...data, redirect: false, callbackUrl: "/"   
            });
            console.log("signIn response", response);

            if (response?.ok) {
                toast.success("Login successful!", {
                    duration: 3000,
                    position: "top-right",
                });

                RHFobject.reset();

                router.replace("/");

            } else {
                toast.error("Email or Password are Incorrect", {
                    duration: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.", {
                duration: 3000,
                position: "top-right",
            });
        }
    }


    return (
        <>

            <Form {...RHFobject} >

                <form onSubmit={RHFobject.handleSubmit(mySubmitHandler)} className='w-full md:w-3/4  mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg  '>

                    <FormField
                        control={RHFobject.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='mb-3'>

                                <FormLabel>User email: </FormLabel>

                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={RHFobject.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='mb-3'>

                                <FormLabel>User password: </FormLabel>

                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <Button type='submit' className='bg-green-600 w-full mt-5 text-white p-3 rounded-lg hover:bg-green-700 transition-all cursor-pointer'>Login</Button>

                    <Link href={"/forgotpassword"}>
                        <Button
                            type="button"
                            className="bg-blue-600 w-full mt-5 text-white p-3 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                        >
                            Forgot Password
                        </Button>
                    </Link>


                </form>


            </Form>
        </>
    )
}
