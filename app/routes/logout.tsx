import type { ActionFunctionArgs } from "@remix-run/node"
import { authenticator } from "~/services/auth.client";

export const clientAction = async ({ request }: ActionFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: "/" });
};