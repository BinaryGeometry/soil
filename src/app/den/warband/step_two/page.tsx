'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useWarbandBuilderContext } from "../../_components/multistep-form-context"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter();
    // YOU NEED TO IMPORT THE CONTEXT FIRST 
    const formContext = useWarbandBuilderContext()
  
    // STEP 1: Defining the form schema👇🏽
    const newUserFormSchema= z.object({
      allegience: z.string().min(3, 'at least 3 characteres'),
    //   password: z.string().min(3, 'at least 3 characteres'),
     
    })
  
    // STEP 2: Defining your form.
    const stepTwoForm = useForm<z.infer<typeof newUserFormSchema>>({
      resolver: zodResolver(newUserFormSchema),
      mode: 'onChange',
      defaultValues: {
        // email: formContext.user.email,
        // password: formContext.user.password,
      },
    })
  
    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof newUserFormSchema>) {
      formContext.updateWarbandData(values)
  
      router.push('/den/warband/step_three/')
    }
  
    const prevStep = () => {
      router.back()
    }
    
    return(<Form {...stepTwoForm}>
       <form
        onSubmit={stepTwoForm.handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow space-y-8'>
        <FormField
         name='allegience'
         control={stepTwoForm.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel>Allegience</FormLabel>
           <FormMessage />
           <FormControl>
            <Input {...field} />
           </FormControl>
           <FormDescription className='text-gray-600'>
            What is your allegience
           </FormDescription>
          </FormItem>
         )}
        />
        {/* <FormField
         name='lastname'
         control={stepTwoForm.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel>Lastname</FormLabel>
           <FormMessage />
           <FormControl>
            <Input {...field} />
           </FormControl>
          </FormItem>
         )}
        /> */}
        <div className='py-10 space-x-8'>
         <Button type='button' onClick={prevStep}>Prev</Button>  
         <Button type='submit'>Next</Button>
        </div>
       </form>
      </Form>)
  
  }