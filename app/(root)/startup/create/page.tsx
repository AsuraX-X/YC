import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const Create = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div>
      <section className="bg-primary h-fit pattern flex justify-center items-center py-10 px-8 ">
        <h1 className="heading">Submit your startup pitch</h1>
      </section>
      <StartupForm />
    </div>
  );
};

export default Create;
