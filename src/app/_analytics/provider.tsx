// app/providers.js
'use client'
import { useAuth } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export function CSPostHogProvider({ children }) {

    return <PostHogProvider client={posthog}><PostHogAuthWrapper>{children}</PostHogAuthWrapper></PostHogProvider>
    
}

function PostHogAuthWrapper({children}: { children: ReactHTML.ReactNode}) {

    const auth = useAuth();
    // const userInfo = userInf

    useEffect(()=> {
        if (auth.userId) {
            posthog.identify(auth.userId, {});

        } else if (!auth.isSignedIn) {
            posthog.reset()
        }
    }, [ auth]);

    return  children
}