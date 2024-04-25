import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { AppShell, Burger, Group, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MetaFunction } from "@remix-run/node";
import { Form, Link, Outlet } from "@remix-run/react";


const NavItems = [{
    title: 'Home',
    to: '/app/'
}, {
    title: 'Data',
    children: [{
        title: 'Persons',
        to: '/app/persons'
    }, {
        title: 'Tasks',
        to: '/app/tasks'
    }]
}, {
    title: 'Generator',
    to: '/app/generator'
},
{
    title: 'Report',
    to: '/app/report'
}];

export const meta: MetaFunction = () => {
    return [
        { title: 'Piket Dapur GA' },
        { name: 'description', content: 'Atur Jadwal Piket Dapur dengan Mudah' },
    ];
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

    return null;
};


export default function Layout() {

    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Title order={4}>Piket Dapur GA</Title>
                </Group>

            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section grow>
                    {NavItems.map((item) => (
                        item.children ? (
                            <NavLink key={item.title} label={item.title}>
                                {item.children?.map((child) => (
                                    <NavLink key={child.title} label={child.title} component={Link} to={child.to} />
                                ))}

                            </NavLink>
                        ) : (
                            <NavLink key={item.title} label={item.title} component={Link} to={item.to} />
                        )
                    ))}</AppShell.Section>

                <AppShell.Section>
                    <Form method="post" action="/logout">
                        <NavLink label="Logout" component={"button"} type="submit" />
                    </Form>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}