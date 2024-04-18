// import { db } from "@vercel/postgres";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

const mockUrls = [
  "https://utfs.io/f/467815b0-4f4e-407c-aa77-ca0cd84839b2-88ge2x.png",
  "https://utfs.io/f/41ab4315-c074-448b-92a1-b258013c0de7-iookbu.png",
];

export const dynamic = "force-dynamic";

const mockImages = mockUrls.map((url, index)=> ({
  id: index + 1,
  url,
}));



export default async function Home() {

  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {/* {posts.map((post, index) => {
        })} */}

        {mockImages.map((image, index) => (
          <div key={image.id +'-'+ index} className="w-1/2 p4 gap-4">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
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
