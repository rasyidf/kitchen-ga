import { Button, Container, Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Kitchen Scheduler App" },
    { name: "description", content: "Welcome to the Kitchen Scheduler App" },
  ];
};

export default function Index() {
  return (
    <Container mt={200} >
      <Title order={1}>Welcome to the Kitchen Scheduler App</Title>
      <p>
        This is a genetic algorithm scheduler for kitchen staff. The scheduler
        will optimize the weekly schedule for kitchen staff based on the
        availability of staff and the requirements of the kitchen.
      </p>
      <Button component={NavLink} to="/engine">Engine</Button>
    </Container>
  );
}
