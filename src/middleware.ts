import { authMiddleware, withClerkMiddleware } from "@clerk/nextjs";
import { createRouteMatcher } from "node_modules/@clerk/nextjs/dist/types/server/authMiddleware";

// import { withClerkMiddleware } from "@clerk/nextjs";
// import { createRouteMatcher } from "node_modules/@clerk/nextjs/dist/types/server/authMiddleware";

export default authMiddleware({
    publicRoutes: ["/", "/contact", "/api/uploadthing"]
});

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// export default withClerkMiddleware((auth, request) =? {
//     if (isProtectedRoute)
// })

export const config = {  
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};