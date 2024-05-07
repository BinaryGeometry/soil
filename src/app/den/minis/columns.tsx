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


export function Pennie({cost}){
    return (
        <span className="bg-[#d4af37] text-black rounded-full p-1 ml-1 text-xs">{cost}p</span>
    )
}
export function StatPanel({stats}){
    
    const den = 'burrow';
    // console.log('stats!!!!!!', stats)
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
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Species",
        cell: ({row}) => {
            return ( <span>{row.original.species.species} ({row.original.species.size} {row.original.species.base}) <Pennie cost={row.original.species.cost}/></span> )    
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
            const skillList: any[] = [];
            row.original.species.skillsToBeasts?.forEach( (item) => skillList.push(item.skill) );
            row.original.skillsToMinis?.forEach( (item) => skillList.push(item.skill) );
            return (
                <div className="flex flex-col">
                    {skillList?.map((item, index) => (
                       <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">{item.name} {item.skilllevel}</div>
                    ))}
                </div>
                
            )
        }
    },
    {
        header: "Weapons",
        cell: ({row}) => {
            console.log('row.original.itemsToMinis', row.original.itemsToMinis)
            return (
                <div className="flex flex-col">
                    {row.original.itemsToMinis?.map((item, index) => (
                       item.item.group == 'weapon'
                       ? <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">
                        <i className="ra fa-fw ra-sword"></i>
                        {item.item.name} 
                        <Pennie cost={item.item.cost}/>
                        </div>
                        : null
                    ))}
                </div>
                
            )
        }
    },
    {
        header: "Armour",
        cell: ({row}) => {
            console.log('row.original.itemsToMinis', row.original.itemsToMinis)
            return (
                <div className="flex flex-col">
                    {row.original.itemsToMinis?.map((item, index) => (
                       item.item.group == 'armour'
                       ? <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">
                        <i className="ra fa-fw ra-sword"></i>
                        {item.item.name}
                        <Pennie cost={item.item.cost}/>
                        </div>
                        : null
                    ))}
                </div>
                
            )
        }
    },
    {
        header: "Items",
        cell: ({row}) => {
            console.log('row.original.itemsToMinis', row.original.itemsToMinis)
            return (
                <div className="flex flex-col">
                    {row.original.itemsToMinis?.map((item, index) => (
                       item.item.group == 'item'
                       ? <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">
                        <i className="ra fa-fw ra-sword"></i>
                        {item.item.name} 
                        <Pennie cost={item.item.cost}/>
                        </div>
                        : null
                    ))}
                </div>
            )
        }
    },
    {
        header: "Magic",
        cell: ({row}) => {
            console.log(row.original)
            return (
                <div className="flex flex-col rounded-sm text-white bg-green-500 mb-1 p-1">
                    <p>{row.original.magicList}</p>
                    {row.original.magicToMinis?.map((magic, index) => (
                        <div>
                        
                            
                            <div className="rounded-sm text-white bg-gray-500 mb-1 p-1">
                                {magic.magic.name} 
                                <Pennie cost={magic.magic.cost}/>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    },
    {
        header: "Total Cost",
        cell: ({row}) => {
            let runningTotal = row.original.species.cost;
            row.original.itemsToMinis?.forEach( (item) => {
                if(!isNaN(item.item.cost))
                    runningTotal += item.item.cost;
            })
            row.original.magicToMinis?.forEach( (spell) => {
                if(!isNaN(spell.magic.cost))
                    runningTotal += spell.magic.cost;
            })
            return ( <div><Pennie cost={runningTotal}/></div> )    
        },
    },
]