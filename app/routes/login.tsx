import { Form } from "@remix-run/react";
import { AuthStrategies } from "~/services/auth_strategies";
import type { AuthStrategy } from "~/services/auth.server";
import { Button, Container, Paper, PasswordInput, TextInput } from "@mantine/core";

interface SocialButtonProps {
  provider: AuthStrategy;
}

const LoginForm = ({ provider }: SocialButtonProps) => (
  <Paper>
    <Form action={`/auth/${provider}`} method="post">
      <TextInput label="Username" name="username" required />
      <PasswordInput label="Password" name="password" required />
      <Button type="submit">Login</Button>
    </Form>
  </Paper>
);

export default function LoginRoute() {
  return (<Container mt="lg">
    <LoginForm provider={AuthStrategies.FORM} />
  </Container>
  );
}