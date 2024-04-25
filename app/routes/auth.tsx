import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.client";

export const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
};