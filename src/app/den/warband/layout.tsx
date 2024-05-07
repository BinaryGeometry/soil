'use client'

import { WarbandBuilderContextProvider, useWarbandBuilderContext } from "../_components/multistep-form-context"

export function BuilderBreadcrumbs(){
  const formContext = useWarbandBuilderContext();

  return (
    <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      {formContext.warband?.name !== undefined && 
      <li className="inline-flex items-center gap-1.5">
        <a className="transition-colors hover:text-foreground" href="/">WARBAND | {formContext.warband?.name}</a>
        </li>
      }
      {formContext.warband?.allegience !== undefined  && 
      <li className="inline-flex items-center gap-1.5">
        <a className="transition-colors hover:text-foreground" href="/">ALLEGIENCE | {formContext.warband?.allegience}</a>
      </li>
      }
      {formContext.warband?.den !== undefined  && 
      <li className="inline-flex items-center gap-1.5">
        <a className="transition-colors hover:text-foreground" href="/">DEN | {formContext.warband?.den}</a>
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
        {children}
      </WarbandBuilderContextProvider>
      <div className="h-36 md:h-0"></div>
    </main>
  )
}