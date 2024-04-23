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
        <div>

        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/den/minis">Minis</Link>
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
        </div>
    )
}