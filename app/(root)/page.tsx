import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export interface post {
  _createdAt: Date;
  views: number;
  author: { _id: number; name: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
}

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;

  const posts: post[] = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Micheal Scott" },
      _id: 1,
      description: "This is a description",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Office",
      title: "The Office",
    },
  ];

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
