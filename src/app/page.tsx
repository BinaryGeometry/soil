
// import { db } from "@vercel/postgres";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

import { desc } from "node_modules/drizzle-orm/expressions.cjs";

import { CreatePost } from "~/app/_components/create-post";
import { db } from "~/server/db";
import { api } from "~/trpc/server";



export const dynamic = "force-dynamic";

async function Images(){
  const images = await db.query.images.findMany({
    orderBy:(model, { desc }) => desc(model.id)
  });
  
  return (  
    <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div key={image.id +'-'+ index} className="w-1/2 p4 gap-4">
            <img src={image.url} alt={image.name} />
            <h2>{image.name}</h2>
          </div>
        ))}
      </div>
  )
}

export default async function Home() {


  return (
    <main className="">
      <SignedIn>
        <Images/>
        
      </SignedIn>
      <SignedOut>
        sign in
      </SignedOut>
        {/* <CrudShowcase /> */}

    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
