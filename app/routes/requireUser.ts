import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '~/auth.server' // Adjust the path as necessary
import { authClient } from '~/lib/auth-client'


export async function requireUser(request: LoaderFunctionArgs["request"]) {
  const session = await auth.api.getSession({ headers: request.headers });
  console.log("SESSION: ", session)
  if (!session?.user) throw redirect("/signIn");
  return session.user;
}


