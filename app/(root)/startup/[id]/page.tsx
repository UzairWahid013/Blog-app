export const metadata = {
  title: "Detail | Startup Pitch",
}
import React from "react";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link  from "next/link";
import Image  from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View";
import markdownit  from 'markdown-it';

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  console.log("post", post?.title);
  console.log("post.image", post?.image); // Debug image URL
  console.log("post.author", post?.author); // Debug author data
  
  if (!post) return notFound();
  
  const parsedContent = md.render(post?.pitch || "");
  
  // Check if the image URL contains problematic domains
  const isProblematicImage = post?.image && post.image.includes('teachablecdn.com');
  
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>

      <section className="section_container">
        {/* Conditional image rendering to handle problematic URLs */}
        {post?.image ? (
          isProblematicImage ? (
            // Use regular img tag for problematic URLs
            <img 
              src={post.image}
              alt="thumbnail"
              className="w-full h-auto rounded-xl"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          ) : (
            // Use Next.js Image for safe URLs
            <Image 
              src={post.image}
              alt="thumbnail"
              className="w-full h-auto rounded-xl"
              height={500}  
              width={500}      
            />
          )
        ) : (
          // Fallback placeholder when no image
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
                
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            {post?.author?._id ? (
              <Link
                href={`/user/${post.author._id}`}
                className="flex gap-2 items-center"
              >
                <Image 
                  src={post?.author?.image || "https://avatars.githubusercontent.com/u/74147338?v=4&size=64"} 
                  alt="author avatar" 
                  width={48} 
                  height={48} 
                  className="rounded-full" 
                />
                <div>
                  <p className="text-20-medium">{post?.author?.name || "Anonymous"}</p>
                  <p className="text-26-medium !text-black-300">@{post?.author?.username}</p>
                </div>
              </Link>
            ) : (
              // Fallback when no author data
              <div className="flex gap-2 items-center">
                <Image 
                  src="https://avatars.githubusercontent.com/u/74147338?v=4&size=64" 
                  alt="default avatar" 
                  width={48} 
                  height={48} 
                  className="rounded-full" 
                />
                <div>
                  <p className="text-20-medium">Anonymous</p>
                  <p className="text-26-medium !text-black-300">@anonymous</p>
                </div>
              </div>
            )}
            <div className="bg-black text-white px-4 py-2 rounded-full font-medium">
              {post?.category || "Uncategorized"}
            </div>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article className="prose max-w-4xl break-all" dangerouslySetInnerHTML={{ __html: parsedContent}} />
          ) : (
            <p className="no-result">No Details Provided</p>
          )}
        </div>
        <hr className="divider" />

        <Suspense fallback={<Skeleton className="view_skeleton"/> }>
          <View id={id}/>
        </Suspense>
      </section>
    </>
  );
};

export default page;