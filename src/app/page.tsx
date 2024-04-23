
// import { db } from "@vercel/postgres";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

import { desc } from "node_modules/drizzle-orm/expressions.cjs";

import { CreatePost } from "~/app/_components/create-post";
import { db } from "~/server/db";
import { api } from "~/trpc/server";


export const dynamic = "force-dynamic";


import { getMyImages } from  "~/server/queries"
import Image from "next/image";
async function Images(){

  const images = await getMyImages();

  return (  
    <div className="flex flex-wrap gap-4 p-4 justify-center">
        {/* {([,...images,...images,...images,...images]).map((image, index) => ( */}
        {images.map((image, index) => (
          <div key={image.id +'-'+ index} className="w-48 h-48 flex-col">
            <Link href={`/img/${image.id}`}>
              <Image src={image.url} alt={image.name} width={480} height={480} style={{objectFit:"contain"}}/>
            </Link>
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
