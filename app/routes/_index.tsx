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
      <Title order={1}>
        Selamat datang di Aplikasi Penjadwalan Shift Dapur
      </Title>
      <p>
        Aplikasi ini membantu Anda dalam menentukan jadwal shift karyawan dapur
        dengan mudah dan cepat.
      </p>
      <Button component={NavLink} to="/app/">Mulai</Button>
    </Container>
  );
}
