"use client"; // top to the file

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "~/components/ui/navigation-menu"


export function DenNavigationMenu(){
    const den = 'burrow';
    return (
        <>

            <NavigationMenu className="size-full p-2">
            <NavigationMenuList className="mb-4 flex items-center">
                <NavigationMenuItem>
                    <Link href="/den/minis" className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary">Minis</Link>
                {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger> */}
                {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
            */}
                </NavigationMenuItem> 
                <NavigationMenuItem>
                    <Link href="/den/items">Items</Link>
                {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger> */}
                {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
            */}
                </NavigationMenuItem> 
                <NavigationMenuItem>
                    <Link href="/den/warband">Warband</Link>
                {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger> */}
                {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
            */}
                </NavigationMenuItem> 
            </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}