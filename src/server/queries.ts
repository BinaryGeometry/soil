import { db } from "~/server/db";
import "server-only";
import { auth } from "@clerk/nextjs";

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