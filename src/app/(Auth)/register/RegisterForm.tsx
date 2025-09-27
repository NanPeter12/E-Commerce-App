"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '_/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form'
import { Input } from '_/components/ui/input';
import { useForm } from 'react-hook-form'
import { schema } from './register.schema';
import { RegisterSchemaType } from './register.types';
import { handleRegister } from './register.actions';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';


export default function RegisterForm() {
    const router = useRouter(); 

    const RHFobject = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }
    });


    async function mySubmitHandler(data: RegisterSchemaType) {
       
        const responseOutput = await handleRegister(data); 

        if (responseOutput === true) {
           
            toast.success("Registration successful! Please log in.", {
                duration: 4000,
                position: "top-right",
            });

            RHFobject.reset();
            router.push('/login'); 

        } else {
            toast.error(responseOutput, {
                duration: 4000,
                position: "top-right",
            });
        }
    }


    return (
        <>

            <Form {...RHFobject} >

                <form onSubmit={RHFobject.handleSubmit(mySubmitHandler)}>
                    <FormField
                        control={RHFobject.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='mb-3'>

                                <FormLabel>User Name: </FormLabel>

                                <FormControl>
                                    <Input {...field} type="text" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />



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


                    <FormField
                        control={RHFobject.control}
                        name="rePassword"

                        render={({ field }) => (
                            <FormItem className='mb-3'>

                                <FormLabel>Re-enter password: </FormLabel>

                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={RHFobject.control}
                        name="phone"

                        render={({ field }) => (
                            <FormItem>

                                <FormLabel>Phone Number: </FormLabel>

                                <FormControl>
                                    <Input {...field} type="tel" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' className='bg-green-600 w-full mt-5 text-white p-3 rounded-lg hover:bg-green-700 transition-all cursor-pointer'>Register</Button>
                </form>


            </Form>
        </>
    )
}
