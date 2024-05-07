'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useWarbandBuilderContext } from "../../_components/multistep-form-context"
import { useRouter } from "next/navigation"

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

export default function Page(){
    const router = useRouter();
    // YOU NEED TO IMPORT THE CONTEXT FIRST 
    const formContext = useWarbandBuilderContext();

    console.log('formContext', formContext)
  
    // STEP 1: Defining the form schema👇🏽
    const newUserFormSchema= z.object({
      name: z.string().min(3, 'at least 3 characteres'),
        //   lastname: z.string().min(3, 'at least 3 characteres'), 
    })
  
    // STEP 2: Defining your form.
    const stepOneForm = useForm<z.infer<typeof newUserFormSchema>>({
      resolver: zodResolver(newUserFormSchema),
      mode: 'onChange',
      defaultValues: {
        name: formContext.warband?.name,
        // lastname: formContext.user.descripcion,
      },
    })
  
    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof newUserFormSchema>) {
      formContext.updateWarbandData(values)
  
      router.push('/den/warband/step_two/')
    }
    
    return(<Form {...stepOneForm}>
       <form
        onSubmit={stepOneForm.handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow space-y-8'>
        <FormField
         name='name'
         control={stepOneForm.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel>Warband</FormLabel>
           <FormMessage />
           <FormControl>
            <Input {...field} />
           </FormControl>
           <FormDescription className='text-gray-600'>
            Every legend needs a catchy name.
           </FormDescription>
          </FormItem>
         )}
        />
        <div className='py-10 space-x-8'>
         <Button type='submit'>Next</Button>
        </div>
       </form>
      </Form>)
  
}