import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { StartUpCardType } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const md = markdownit();

export const experimental_ppr = true;

const StartupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const startup: StartUpCardType = await client.fetch(STARTUP_QUERY, { id });

  if (!startup) return notFound();

  const {
    _createdAt,
    category,
    image,
    title,
    pitch,
    views,
    description,
    author,
  } = startup;

  const { _id, name, image: AuthorImage, username } = author || {};

  const rpitch = md.render(pitch || "");

  console.log(rpitch);

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
      <section className="flex flex-col sm:px-8 px-4 sm:py-12 py-6 ">
        <div className="overflow-hidden w-full h-[50vh] sm:h-screen rounded-2xl flex relative">
          {image && (
            <Image
              src={image}
              fill
              alt={title || "Startup image"}
              className="object-cover"
            />
          )}
        </div>
        <div className="mt-10 sm:px-35 ">
          <div className="flex justify-between  items-center ">
            <div className="flex items-center justify-center gap-2">
              <Link href={`user/${_id}`}>
                <div>
                  {AuthorImage && (
                    <Image
                      src={AuthorImage}
                      alt="Authors Image"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-[20px] text-black">{name}</p>
                  <p className="font-medium text-[16px] text-black/75">
                    @{username}
                  </p>
                </div>
              </Link>
            </div>
            <div className="bg-primary-100 rounded-full px-4 py-2 text-center w-fit">
              {category}
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <h3 className="text-[30px] font-bold text-black">Pitch Details</h3>
            {rpitch ? (
              <article
                className=" prose min-w-full font-family-work-sans text-justify"
                dangerouslySetInnerHTML={{ __html: rpitch }}
              ></article>
            ) : (
              <p className="text-black-100 text-sm font-normal">
                No details provided
              </p>
            )}
          </div>
        </div>
      </section>
      <section>{/* TODO: EDITOR SELECTED STARTUPS */}</section>
      <Suspense
        fallback={
          <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
        }
      ></Suspense>
    </div>
  );
};
export default StartupPage;
