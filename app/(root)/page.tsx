export const metadata = {
  title: "Home | Startup Pitch",
}
import React from "react";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const Home = async ({searchParams} : {searchParams: Promise<{query?: string}>}) => {
  const query = (await searchParams).query;
  const params = {search: query || null};
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">
        Pitch Your Startup, <br />
        Connect with Entrepreneurs
      </h1>
      <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
      </p>
      <SearchForm query="Search Startups"/>
    </section>

    <section className="section_container">
    <p className="text-30-semibold">
        {query ? `Search Results for "${query}"` : "All Starups"}
    </p>
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post:  StartupTypeCard, index: number) =>(
          <StartupCard key={post?._id} post={post}/>
        ))
      ) : (
        <p className="text-20-semibold">No posts found</p>
      )}
    </ul>

  </section>
  <SanityLive />
  </>
  );
};

export default Home;
