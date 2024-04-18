import Image from "next/image";
import { getImage } from "~/server/queries";
import { Modal } from "~/components/modal";

export default async function FullPageImageView(props: { id: number }){

    // const idAsNumber = Number(id);
    
    // if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

    const image = await getImage(props.id);

    return (
        
        <div>
            <Image
            className="w-96"
            src={image.url} 
            alt={image.name} 
            width={480} 
            height={480} 
            style={{objectFit:"contain"}}
            />
        
        </div>
    );
}