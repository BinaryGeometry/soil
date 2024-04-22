/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React from "react";
import "~/styles/globals.css";
import dynamic from 'next/dynamic';
import MenuFooter from "~/components/game/FooterItem.tsx";
import MenuItem from "~/components/game/MenuItem.tsx";
import Sidebar from "~/components/game/Sidebar.tsx";

const HistoryClient = dynamic(() => import('./history-client'), {
  ssr: false,
})

const History = () => {

  const pageId = "History"

  return (
      <>
        <Sidebar pageId={pageId} />
        <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50">
          <HistoryClient />
        </div>
      </>
  )
}

export default History;