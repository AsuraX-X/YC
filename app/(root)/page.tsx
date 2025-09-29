import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartUpCardType } from "@/sanity/types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;

  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: startups } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <>
      <section className="flex justify-center items-center bg-primary h-screen sm:h-fit py-10  pattern flex-col px-8">
        <h1 className="heading">
          Pitch your Start Up,
          <br />
          Connect with entrepreneurs
        </h1>
        <p className="text-white font-medium text-2xl text-center">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="px-6 py-10">
        <p className=" text-3xl font-medium">
          {query ? `Search results for ${query}` : "All StartUps"}
        </p>
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3  gap-5">
          {startups.length > 0 ? (
            startups.map((startup: StartUpCardType) => (
              <StartupCard key={startup._id} startup={startup} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </div>
      </section>
      <SanityLive />
    </>
  );
};

export default Home;
