'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useWarbandBuilderContext } from "../../_components/multistep-form-context"
import { redirect } from "next/navigation"

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
    const newUserFormSchema = z.object({
      den: z.string().min(1, 'at least 1 character'),
    })
  
    // STEP 2: Defining your form.
    const stepThreeForm = useForm<z.infer<typeof newUserFormSchema>>({
      resolver: zodResolver(newUserFormSchema),
      mode: 'onChange',
      defaultValues: {
        // age: formContext.user.age,
      },
    })
  
    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof newUserFormSchema>) {
        formContext.updateWarbandData(values)
        
      // add your code here to send the data to the server
    }
  
    const prevStep = () => {
      router.back()
    }
    
    return(<Form {...stepThreeForm}>
       <form
        onSubmit={stepThreeForm.handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow space-y-8'>
        <FormField
         name='den'
         control={stepThreeForm.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel>Den</FormLabel>
           <FormMessage />
           <FormControl>
            <Input {...field} />
           </FormControl>
           <FormDescription className='text-gray-600'>
            Choose a den
           </FormDescription>
          </FormItem>
         )}
        />
        <div className='py-10 space-x-8'>
         <Button type='button' onClick={prevStep}>Prev</Button>  
         <Button type='submit'>Done</Button>
        </div>
       </form>
      </Form>)
  
  }