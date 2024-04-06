"use client"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { assignmentFormSchema } from "../../lib/validator"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { assignmentDefaultValues } from "@/constants";

type AssignmentFormProps = {
  type: "Create" | "Update"; // Type can be either Create or Update by instructor
};

// Define the AssignmentForm component
const AssignmentForm = ({ type }: AssignmentFormProps) => {
  const initialValues = assignmentDefaultValues;
//def Values
  const form = useForm<z.infer<typeof assignmentFormSchema>>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: initialValues,
  });

  // Define the submit handler
  async function onSubmit(values: z.infer<typeof assignmentFormSchema>) {
    if (type === "Create") { 
      try {
        console.log("Assignment created:", values);
        form.reset(); 
      } catch (error) {
        console.error("Error creating assignment:", error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 px-28 py-5">
          {/* Form fields */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Assignment Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
             control={form.control}
             name="dueTime"
             render={({ field }) => (
               <FormItem className="w-full">
                 {/* Add label for the due date field */}
                 <FormLabel htmlFor="dueTime">Due Date</FormLabel>
                 <FormControl>
                   <DatePicker
                     selected={field.value}
                     onChange={(date: Date) => field.onChange(date)}
                     showTimeSelect
                     timeFormat="HH:mm"
                     timeIntervals={15}
                     timeCaption="Time"
                     dateFormat="MM/dd/yyyy HH:mm"
                   />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Description"
                    {...field}
                    className="w-full h-32 resize-none border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPoints"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="description">Maximum Poitns</FormLabel>
                <FormControl>
                  <Input placeholder="Maximum Points" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Assignment`}
        </Button>
      </form>
    </Form>
  );
};

export default AssignmentForm;
