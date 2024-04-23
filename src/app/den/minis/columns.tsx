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

const columnHelper = createColumnHelper();


export function StatPanel({stats}){
    
    const den = 'burrow';
    console.log('stats!!!!!!', stats)
    return (
        <div className="flex">
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">M</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.m}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">S</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.s}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">B</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.b}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">R</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.r}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">N</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.n}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">C</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.c}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">A</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.a}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 border-r-0 text-center p-1">F</div>
                <div className="border-solid border-2 border-r-0 text-center p-1">{stats.f}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-2 border-b-0 text-center p-1">P</div>
                <div className="border-solid border-2 text-center p-1">{stats.p}</div>
            </div>
        </div>
    )
}

flexRender
export const columns: ColumnDef<any>[] = [
    {
        header: "Image",
        cell: ({row}) => {
            return ( <Image src={row.original.image.url} width={75} height={75} alt="" className="" /> )    
        },
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Species",
        cell: ({row}) => {
            return ( <span>{row.original.species.species} ({row.original.species.size} {row.original.species.base})</span> )    
        },
    },
    {
        header: "Stat Line",
        cell: ({row}) => {
            return (
                <StatPanel stats={row.original.species} />
            )
        }
    },
    {
        header: "Skills",
        cell: ({row}) => {

            return (
                <div className="flex flex-col">
                    {row.original.species.skills?.map((skill, index) => (
                       <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">{skill}</div>
                    ))}
                </div>
                
            )
        }
    },
    {
        header: "Cost",
        cell: ({row}) => {
            return ( <div>{row.original.species.cost}p</div> )    
        },
    },
]