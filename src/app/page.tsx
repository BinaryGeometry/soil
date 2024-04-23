
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
import { Button } from "~/components/ui/button";
import { Children } from "react";
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
    <>
      <SignedIn>
        <main className="h-screen w-screen bg-cover">
          <Image src="https://utfs.io/f/8e368fb4-7753-47c7-b927-65a61ed2ca28-n3j07l.jpg"
          width={4000} height={400}></Image>
          
          {/* <CrudShowcase /> */}
        </main>
      </SignedIn>
      <SignedOut>
        <main className="bg-[url('/thegreasygoblin.files.burrows_badgers_01.jpg')] h-[calc(100vh-74px)] p-10 w-screen bg-cover content-center">
          <div className="h-full size-full bg-zinc-300  bg-opacity-85 border-solid border-2 border-zinc-500 overflow-hidden rounded-[50px] flex">
            <div className="h-full w-1/3 bg-zinc-200 bg-opacity-35 flex justify-center items-center">

              <Button  size="lg" >play game</Button>
            </div>
            <div className="h-full w-1/3 flex justify-center items-center">
                <Image src="/slogans-run.png" alt="badgers and burrows logo" width={300} height={200} />
            </div>
            <div className="h-full w-1/3 bg-zinc-200 bg-opacity-35 flex justify-center items-center">

              <Button  size="lg" >Play Friend</Button>
              <Button  size="lg" >Play Stranger</Button>
            </div>
          </div>
        </main>
      </SignedOut>
    </>

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
