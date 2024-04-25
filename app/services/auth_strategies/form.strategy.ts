// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import type { User } from "~/services/auth.server";
import { FormStrategy } from "remix-auth-form";

export const formStrategy = new FormStrategy<User>(
  async ({ form, context }) => {
    // handle if the form is submitted with the username "admin" and the password "admin", if so, return the user object
    // otherwise, fail the authentication
    if (form.get("username") === "admin" && form.get("password") === "admin") {

      return {
        id: "1",
        username: "admin",
        email: "",
      };
    }

    return {};
  },
);
