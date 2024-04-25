import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from '~/services/auth.client';
import type { AuthStrategy } from "~/services/auth.client";

export const clientLoader = () => redirect('/login');

export const clientAction = async ({ request, params }: ActionFunctionArgs) => {
  // If the provider is not specified, redirect to the login page
  if (!params.provider) return redirect('/login');

  const provider = params.provider as AuthStrategy;

  return await authenticator.authenticate(provider, request, {
    successRedirect: "/app/",
  });
};