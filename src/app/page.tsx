import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

const mockUrls = [
  "https://utfs.io/f/467815b0-4f4e-407c-aa77-ca0cd84839b2-88ge2x.png",
  "https://utfs.io/f/41ab4315-c074-448b-92a1-b258013c0de7-iookbu.png",
];

const mockImages = mockUrls.map((url, index)=> ({
  id: index + 1,
  url,
}));



export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="">
      <div className="flex flex-wrap">
        {([, ...mockImages, ...mockImages, ...mockImages]).map((image) => (
          <div key={image.id} className="w-1/2 p4 gap-4">
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
