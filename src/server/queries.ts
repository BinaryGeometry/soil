import { db } from "~/server/db";
import "server-only";
import { auth } from "@clerk/nextjs";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getMyImages() {

    const user = auth()
    const userId = user.userId;
    if (!userId) throw new Error('error');
    
    const images = await db.query.images.findMany({
        where:(model, { eq }) => eq(model.userId, userId),
        orderBy:(model, { desc }) => desc(model.id)
    });
    return images;
}

export async function getImage(id: string) {

    const user = auth()
    const userId = user.userId;
    if (!userId) throw new Error('error');
    
    const image = await db.query.images.findFirst({
        where:(model, { eq }) => eq(model.id, id)
    });

    if (!image) throw new Error('image not found');

    if (image.userId !== user.userId) throw new Error('unauthorised');
    
    return image;
}

export async function deleteImage(id: string) {

    const user = auth()
    const userId = user.userId;
    if (!userId) throw new Error('error');
    
    // const image = await db.query.images.findFirst({
    //     where:(model, { eq }) => eq(model.id, id)
    // });

    // if (!image) throw new Error('image not found');

    // if (image.userId !== user.userId) throw new Error('unauthorised');

    await db
        .delete(images)
        .where(and(eq(images.id, id), eq(images.userId, user.userId)));

    revalidatePath("/")
    redirect("/")
    
    // return image;
}


export async function getMyMinis() {

    const user = auth()
    const userId = user.userId;
    if (!userId) throw new Error('error');
    
    const minis = await db.query.minis.findMany({
        where:(model, { eq }) => eq(model.userId, userId),
        orderBy:(model, { desc }) => desc(model.id),
        with: {
            image: true,
        },
    });
    return minis;
}
