'use client'

import Link from "next/link";
import { useRouter } from "next/naviation";
import { WarbandBuilderContextProvider, useWarbandBuilderContext } from "../_components/multistep-form-context"
import Transition from "~/app/_components/Transition";

export function BuilderBreadcrumbs(){
  const formContext = useWarbandBuilderContext();

  return (
    <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      {formContext.warband?.name !== undefined && 
      <li className="inline-flex items-center gap-1.5">
        <Link className="{`link ${pathname === '/den/warband/step_one' ? 'text-foreground' : ''}`}" href="/den/warband/step_one">
          WARBAND | {formContext.warband?.name}
          </Link>
      </li>
      }
      {formContext.warband?.allegience !== undefined  && 
      <li className="inline-flex items-center gap-1.5">
        <Link className="transition-colors hover:text-foreground {`link ${pathname === '/den/warband/step_two' ? 'text-foreground' : ''}`}" href="/den/warband/step_two">
          ALLEGIENCE | {formContext.warband?.allegience}
        </Link>
      </li>
      }
      {formContext.warband?.den !== undefined  && 
      <li className="inline-flex items-center gap-1.5">
        <Link className="transition-colors hover:text-foreground {`link ${pathname === '/den/warband/step_two' ? 'text-foreground' : ''}`}" href="/den/warband/step_three">
          DEN | {formContext.warband?.den}
        </Link>
      </li>
      }
    </ol>
  )
}

export default function Layout({ children }) {
  return (
    <main>
      <WarbandBuilderContextProvider>
        <BuilderBreadcrumbs />
        <Transition>
          {children}
        </Transition>
      </WarbandBuilderContextProvider>
      <div className="h-36 md:h-0"></div>
    </main>
  )
}