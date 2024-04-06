import AssignmentForm from "@/components/shared/AssignmentForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreateAssignment = () => {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
    return null; 
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Assignment</h3>
      </section>

      <div className="wrapper my-8">
        <AssignmentForm type="Create" />
      </div>
    </>
  );
};

export default CreateAssignment;
