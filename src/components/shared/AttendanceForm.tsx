"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { getAllUsers } from "@/lib/actions/user.actions";
import { getAllSections } from "@/lib/actions/section.actions";

const schema = z.object({
  date: z.date(),
  sectionId: z.string(),
  records: z.array(z.object({
    userId: z.string(),
    status: z.enum(['Present', 'Absent', 'Late']),
  })),
});

export type AttendanceFormData = z.infer<typeof schema>;

const AttendanceForm = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchSections = async () => {
      const sectionsData = await getAllSections({});
      setSections(sectionsData.data);
    };
    fetchSections();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedSection) {
        const usersData = await getAllUsers({ userType: "student", sectionId: selectedSection });
        setUsers(usersData.data);
      }
    };
    fetchUsers();
  }, [selectedSection]);

  const form = useForm<AttendanceFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      sectionId: '',
      records: users.map(user => ({
        userId: user._id,
        status: 'Present',
      }))
    }
  });

  const onSubmit = data => {
    console.log("Attendance data:", data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <DatePicker selected={form.watch('date')} onChange={(date: Date) => form.setValue('date', date)} />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Class </FormLabel>
          <FormControl>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="input">
              <option value="">Selec Class</option>
              {sections.map(section => (
                <option key={section._id} value={section._id}>
                  {section.name} - {section.instructor?.lastName}
                </option>
              ))}
            </select>
          </FormControl>
        </FormItem>

        {users.map((user, index) => (
          <div key={user._id} className="flex items-center justify-between">
            <span>{user.firstName} {user.lastName}</span>
            <FormField control={form.control} name={`records.${index}.status`} render={({ field }) => (
              <FormControl>
                <select {...field} className="input">
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </FormControl>
            )} />
          </div>
        ))}

        <Button type="submit" className="mt-4">Submit Attendance</Button>
      </form>
    </Form>
  );
};

export default AttendanceForm;
