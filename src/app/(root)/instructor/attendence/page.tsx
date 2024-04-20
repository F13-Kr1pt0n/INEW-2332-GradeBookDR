import React from 'react';
import AttendanceForm from "@/components/shared/AttendanceForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TakeAttendance = () => {
    const { sessionClaims } = auth();

    if (sessionClaims?.metadata.role !== "admin") {
      redirect("/");
      return null; 
  }

  return (
    <>
      <section className="bg-primary-50 py-5">
        <h3 className="text-center">Take Attendance</h3>
      </section>
      <div className="container mx-auto my-8 p-4">
        <AttendanceForm />
      </div>
    </>
  );
};

export default TakeAttendance; // Ensure this line is correct
