"use client"
 
import { ColumnDef, createColumnHelper, flexRender } from "@tanstack/react-table"
import Image from "next/image";
 
export type Image = {
    url: string;
}

export type Warband = {
    // image: Image; 
    name: string;
    den: string;
    allegience: string;
    pennies: number;
}

const columnHelper = createColumnHelper();

export function Pennie({cost}){
    return (
        <span className="bg-[#d4af37] text-black rounded-full p-1 ml-1 text-xs">{cost}p</span>
    )
}


flexRender
export const columns: ColumnDef<any>[] = [
    // {
    //     header: "Image",
    //     cell: ({row}) => {
    //         return ( <Image src={row.original.image.url} width={75} height={75} alt="" className="" /> )    
    //     },
    // },
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Allegience",
        accessorKey: "allegience",
    },
    {
        header: "Den",
        accessorKey: "den",
    },
    {
        header: "Pennies",
        cell: ({row}) => {
            return ( <span><Pennie cost={row.original.pennies} /></span> )    
        },
    },
    // {
    //     header: "Stat Line",
    //     cell: ({row}) => {
    //         return (
    //             <StatPanel stats={row.original.species} />
    //         )
    //     }
    // },
    // {
    //     header: "Skills",
    //     cell: ({row}) => {
    //         const skillList: any[] = [];
    //         row.original.species.skillsToBeasts?.forEach( (item) => skillList.push(item.skill) );
    //         row.original.skillsToMinis?.forEach( (item) => skillList.push(item.skill) );
    //         return (
    //             <div className="flex flex-col">
    //                 {skillList?.map((item, index) => (
    //                    <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">{item.name} {item.skilllevel}</div>
    //                 ))}
    //             </div>
                
    //         )
    //     }
    
]