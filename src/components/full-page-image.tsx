// import Image from "next/image";
import { getImage } from "~/server/queries";
import { Modal } from "~/components/modal";

export default async function FullPageImageView(props: { id: string }){

    const image = await getImage(props.id);

    return (
        
        <div className="flex w-full h-full min-w-0">
            <div className="flex flex-shrink justify-center items-center">
                <img className="object-contain flex-shrink" src={image.url} alt={image.name} />
            </div>

            <div className="flex w-48 flex-shrink-0 flex-col border-l">
                <div className="text-xl font-bold">{image.name}</div>
            </div>
        
        </div>
    );
}