"use client";
import { SignIn, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SimpleUploadButton } from "~/components/simple-upload-button";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
    
    const router = useRouter();
    return (
        <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold border-b bg-zinc-90 text-black-80">
            <div>Soil</div>
            <div className="flex flex-row items-center gap-4">
                <SignedIn>
                    <SimpleUploadButton />
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal"/>
                </SignedOut>
            </div>
        </nav>
    )
  }