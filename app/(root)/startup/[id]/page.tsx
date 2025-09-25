import { formatDate } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { Startup } from "@/sanity/types";
import React from "react";

const StartupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const qparams = { id };

  const { data: startup }: { data: Startup } = await sanityFetch({
    query: STARTUP_QUERY,
    params: qparams,
  });

  const {
    _createdAt,
    author,
    category,
    image,
    title,
    pitch,
    views,
    description,
  } = startup;

  console.log(formatDate(_createdAt));

  return (
    <div>
      <section className="bg-primary pattern h-fit min-h-80 flex items-center justify-center flex-col py-10 px-6">
        <p className="bg-secondary px-2 py-3.5 font-work-sans font-bold rounded-sm uppercase">
          <span className="border-black border-t-[10px] border-r-[10px] border-r-transparent" />
          {formatDate(_createdAt)}
          <span className="border-black border-l-[10px] border-b-[10px] border-l-transparent" />
        </p>
        <p className="heading">{title}</p>
        <p className="text-white font-medium text-xl text-center max-w-5xl">
          {description}
        </p>
      </section>
    </div>
  );
};

export default StartupPage;
