import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '~/auth.server' // Adjust the path as necessary


export async function loader(request: LoaderFunctionArgs["request"]) {
  const session = await auth.api.getSession({ headers: request.headers });
  console.log("SESSION: ", session)
    if (!session?.user) {
    return new Response(null, { status: 401 }); // unauthorized
  }
    return new Response(JSON.stringify({ user: session.user }));
}

export async function action({ request }: ActionFunctionArgs) {
    return auth.handler(request)
}




