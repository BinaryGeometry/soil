import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { auth, clerkClient, getAuth } from "@clerk/nextjs/server"

const f = createUploadthing();

import { useAuth } from '@clerk/nextjs';
 
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => { // This code runs on your server before upload
      // console.log('eh',req)
      const { userId } = getAuth(req);
      console.log('USER', userId);
      
      if (!userId) throw new UploadThingError("Unauthorized");
      

      // if(fullUserData?.privateMetadata?.["can-upload"] !== true)
      //   throw new UploadThingError("user does not have permissions");


      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => { // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata);
 
      console.log("file url", file.url);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;