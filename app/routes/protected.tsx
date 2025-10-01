import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '~/auth.server' // Adjust the path as necessary
import { authClient } from '~/lib/auth-client'
import type { Route } from "./+types/protected";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
        throw redirect("/signIn")
    } 
    throw redirect("/chat")
}

export async function action({ request }: ActionFunctionArgs) {
    return auth.handler(request)
}

export default function Protected({ loaderData }: Route.ComponentProps) {
    return <div>Why are you here?</div>
}