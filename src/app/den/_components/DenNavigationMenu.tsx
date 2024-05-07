"use client"; // top to the file

import Link from "next/link";
import { usePathname } from "next/navigation";
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


const NavLinks = [
    { id: 1, name: 'Warbands', path: '/den/warband' },
    { id: 2, name: 'Characters', path: '/den/minis' },
]

export function DenNavigationMenu(){ 
    const den = 'burrow';
    const pathname = usePathname();
	const isActive = (path) => path === pathname;
    const activeCss = "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary";
    const normalCss = "flex h-7 items-center justify-center rounded-full text-center text-sm transition-colors hover:text-primary font-medium text-primary";

    return (
        <div className="top">

            <NavigationMenu className="size-full p-2">
                <NavigationMenuList className="mb-4 flex items-center">
                    {NavLinks.map((link) => {
                        return (
                            <NavigationMenuItem>
                                <Link
                                    href={link.path}
                                    className={isActive(link.path) ? activeCss : normalCss}
                                >
                                    {link.name}
                                </Link>
                            </NavigationMenuItem>	
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}