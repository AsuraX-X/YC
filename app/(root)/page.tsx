import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Slug } from "sanity";

interface author {
  id: number;
  name: string;
  image: string;
  bio: string;
}
export interface post {
  _createdAt: Date;
  name: string;
  _id: number;
  slug: Slug;
  author: author;
  views: number;
  description: string;
  category: string;
  image: string;
  title: string;
}

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const posts: post[] = await client.fetch(STARTUPS_QUERY);

  return (
    <>
      <section className="flex justify-center items-center bg-primary h-screen sm:h-fit py-8 min-h-135  pattern flex-col px-6">
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
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3  gap-5">
          {posts.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p>No startups found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
