"use client"
 
import { ColumnDef, createColumnHelper, flexRender } from "@tanstack/react-table"
import Image from "next/image";
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Image = {
    url: string;
}

export type Mini = {
    image: Image; 
    name: string;
    description: string;
    species: string;
    cost: number;
    // items: arrayOutputType,
    // imageId: integer('imageId').notNull().references(() => images.id),
    // name: string
    // species: number
    // image:
    // cost
}

const columnHelper = createColumnHelper()

flexRender
export const columns: ColumnDef<any>[] = [
    {
        header: "Image",
        cell: ({row}) => {
            // console.log(row.original.image.url) // theres the crux
            return ( <Image src={row.original.image.url} width={75} height={75} alt="" className="" /> )    
        },
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Description",
        accessorKey: "description",
    },
    {
        header: "Cost",
        accessorKey: "cost",
    },
    {
        header: "Species",
        accessorKey: "species",
    },
]