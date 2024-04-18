"use client";
import { SignIn, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
    
    const router = useRouter();
    return (
        <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold border-b">
            <div>Soil</div>
            <div className="flex flex-row">
                <SignedIn>
                    <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
                        router.refresh();
                    }}/>
                    <UserButton /></SignedIn>
                <SignedOut><SignInButton mode="modal"/></SignedOut>
            </div>
        </nav>
    )
  }