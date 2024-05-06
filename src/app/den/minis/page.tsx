

import { Mini, columns } from "./columns"
import { DataTable } from "~/components/ui/data-table"
import { getMyMinis } from  "~/server/queries" 

// async function getData(): Promise<Mini[]> {
//   // Fetch data from your API here.
//   const images = await getMyImages();
//   return minis;
//   // return [
//   //   {
//   //     name: "bromley",
//   //     cost: 100,
//   //     description: "pending",
//   //     species: "m@example.com",
//   //   },
//   //   // ...
//   // ]
// }


export default async function MinisPage() {
  const data = await getMyMinis()



  // console.log(data[0])
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}