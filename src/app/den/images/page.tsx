import Link from "next/link";
import { getMyImages } from  "~/server/queries"
import Image from "next/image";
import { SimpleUploadButton } from "~/components/simple-upload-button";
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

export default async function ImagesPage() {

    return (
      <main className="">
        <SimpleUploadButton />
        <Images/>
        {/* <CrudShowcase /> */}
      </main>
    );
  }
