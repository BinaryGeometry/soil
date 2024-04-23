/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React from "react";
import "~/styles/globals.css";
import dynamic from 'next/dynamic';
import Sidebar from "~/components/game/Sidebar";
import { Button } from "~/components/ui/button";
import Image from "next/image";
// import GameModule from "../game-module";

const GameModule = dynamic(() => import('../game-module'), {
  ssr: false,
})

export default async function GamePage( {
    params: { id: gameId },
}: {
    params: { id: string };
}) {

    const idAsNumber = Number(gameId);

  const pageId="PubSubChannels"

  return (
      <>
        {/* <Sidebar pageId={pageId} /> */}
        {/* <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50"> */}

          
                <GameModule room={idAsNumber} />
                
        {/* </div> */}
      </>
  )
}

// export default GamePage;