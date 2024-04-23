'use client'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useAbly, useConnectionStateListener  } from "ably/react"
import { MouseEventHandler, MouseEvent, useState } from 'react'
import Logger, { LogEntry } from '~/components/game/Logger';
import SampleHeader from '~/components/game/SampleHeader';
import { Button } from '~/components/ui/button';

export default function GameModule({room}) {

  const client = new Ably.Realtime ({ authUrl: '/api/token', authMethod: 'POST' });

  const gameRoomChannel = `game-channel-${room}`;

  console.log('gameRoomChannel', gameRoomChannel)
  return (
    <AblyProvider client={ client }>
      <ChannelProvider channelName={gameRoomChannel}>
        <div className="h-full w-1/3 bg-zinc-200 bg-opacity-35 flex justify-center items-center">
            {/* <Button  size="lg" >play game</Button> */}
            {/* <PubSubMessages room={gameRoomChannel} talking=""/> */}
        </div>
        <div className="h-full w-1/3 flex justify-center items-center">
            <ConnectionStatus />
        </div>
        <div className="h-full w-1/3 bg-zinc-200 bg-opacity-35 flex justify-center items-center">
            {/* <Button  size="lg" >Play Friend</Button> */}
            {/* <Button  size="lg" >Play Stranger</Button> */}
            {/* <PubSubMessages room={gameRoomChannel} talking=""/> */}
        </div>
        
      </ChannelProvider>
    </AblyProvider>
  )
}

function PubSubMessages({room}) {

  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const { channel } = useChannel(room, (message: Ably.Message) => {
    setLogs(prev => [...prev, new LogEntry(`✉️ event name: ${message.name} text: ${message.data.text}`)])
  });
  
  const [messageText, setMessageText] = useState<string>('A message')

  const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    if(channel === null) return
    channel.publish('update-from-client', {text: `${messageText} @ ${new Date().toISOString()}`})
  }

  const publicFromServerHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    fetch('/api/publish', {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json',
        },
        'body': JSON.stringify({text: `${messageText} @ ${new Date().toISOString()}`})
    })
  }

  return (
    <>
      {/* <div className="flex flex-col justify-start items-start gap-4 h-[138px]"> */}
        <div className="font-manrope text-sm min-w-[113px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">Message text</span>
        </div>
        <input className="font-manrope px-3 rounded-md items-center text-base min-w-[720px] w-[752px] whitespace-nowrap text-zinc-800 text-opacity-100 leading-6 font-light h-12 border-zinc-300 border-solid border bg-neutral-100" value={messageText}  onChange={e => setMessageText(e.target.value)} />
        <div className="flex flex-row justify-start items-start gap-4 w-[368px]">
          <div className="flex justify-center items-center rounded-md w-44 h-10 bg-black">
            <div className="font-manrope text-base min-w-[136px] whitespace-nowrap text-white text-opacity-100 leading-4 font-medium">
              <button onClick={publicFromClientHandler}>Publish from Client</button>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-md w-44 h-10 bg-black">
            <div className="font-manrope text-base min-w-[136px] whitespace-nowrap text-white text-opacity-100 leading-4 font-medium">
              <button onClick={publicFromServerHandler}>Publish from Server</button>
            </div>
          </div>
        </div>
      {/* </div> */}
      <Logger logEntries={logs}  displayHeader={true}  />
    </>
  )
}

const ConnectionStatus = () => {
  
    const ably = useAbly();
    
    const [logs, setLogs] = useState<Array<LogEntry>>([])
    const [connectionState, setConnectionState] = useState('unknown')
  
    useConnectionStateListener((stateChange) => {
      setConnectionState(stateChange.current)
      setLogs(prev => [...prev, new LogEntry(`Connection state change: ${stateChange.previous} -> ${stateChange.current}`)])
    })
    
    const connectionToggle: MouseEventHandler =  (_event: MouseEvent<HTMLButtonElement>) => {
      if(connectionState === 'connected') {
        ably.connection.close()
      }
      else if(connectionState === 'closed') {
        ably.connection.connect()
      }
    }
  
    return (
      <>
          <div className="flex id border bg-white full-width">
            <div className="font-jetbrains-mono text-sm whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium full-width">
              connection status
              <span className="text-zinc-200 text-opacity-100">&nbsp;</span>
              =&nbsp;
              <span className="text-violet-400 text-opacity-100">
                {connectionState}
              </span>
                {/* <Logger logEntries={logs} displayHeader={true} /> */}
            </div>
          </div>
      </>
         
    )
  }