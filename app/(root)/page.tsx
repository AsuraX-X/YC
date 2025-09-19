import React from "react";
import SearchForm from "../../components/SearchForm";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <>
      <section className="flex justify-center items-center bg-primary h-120  pattern flex-col px-6">
        <h1 className="heading">
          Pitch your Start Up,
          <br />
          Connect with interprenuers
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
      </section>
    </>
  );
};

export default Home;
