"use client"

import React from "react";
import {
    Group,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    MenuItem,
    Menu,
    MenuTarget,
    Center,
    Collapse,
    UnstyledButton,
    MenuDropdown,
} from "@mantine/core";
import classes from "./css/Header.module.css";
import Link from "next/link";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@/helpers/hooks/useDisclosure"
import { IconChevronDown } from "@tabler/icons-react"
import HeaderLogo from "./HeaderLogo";

interface MenuLink {
    link: string;
    label: string;
    links: Array<MenuLink>;
}

interface MobileDropdownProps {
    link: MenuLink;
    subMenuItems: Array<React.JSX.Element>;
    linksOpened: boolean;
    toggleLinks: () => void;
}

const links = [
    {
        link: "/activities",
        label: "Activities",
        links: [
            { link: "/activities/add-activity", label: "Add Activity" },
        ],
    },
    { link: "/manage/categories", label: "Categories" },
    { link: "/manage/payment-methods", label: "Payment Methods" },
    { link: "/dashboard", label: "Dashboard" },
];

export default function SignedInNav() {
    const pathname = usePathname();

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    const desktopItems = links.map((link) => {
        const subMenuItems = link.links?.map((item) => (
            <MenuItem key={item.link} component={Link} href={item.link}>{item.label}</MenuItem>
        ));

        if (subMenuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{exitDuration: 0}} withinPortal>
                    <MenuTarget>
                        <Link
                            href={link.link}
                            className={classes.link}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={1.5} />
                            </Center>
                        </Link>
                    </MenuTarget>
                    <MenuDropdown>{subMenuItems}</MenuDropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className={classes.link}
            >
                {link.label}
            </Link>
        );
    });

    const mobileItems = links.map((link) => {
        const subMenuItems = link.links?.map((item) => (
            <Link key={item.label} href={item.link} className={`${classes.link} ${classes.subLink}`}>{item.label}</Link>
        ));

        if (subMenuItems as React.JSX.Element[]) {
            return (
                <MobileDropdown 
                    key={link.label}
                    link={link as MenuLink}
                    subMenuItems={subMenuItems as React.JSX.Element[]}
                    linksOpened={linksOpened}
                    toggleLinks={toggleLinks}
                />
            );
        }

        return (
            <Link key={link.label} href={link.link} className={classes.link}>{link.label}</Link>
        )
    });

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <HeaderLogo />

                    <Group h="100%" gap={0} visibleFrom="md">
                        {desktopItems}
                    </Group>

                    <Group className={classes.loginSection} visibleFrom="md">
                        <OrganizationSwitcher 
                            afterCreateOrganizationUrl='/'
                            afterSelectOrganizationUrl={pathname}
                            afterSelectPersonalUrl={pathname}
                            appearance={{
                                elements: {
                                    organizationSwitcherTrigger: 'text-white',
                                    organizationSwitcherTriggerIcon: 'text-white'
                                }
                            }}
                        />
                        <UserButton />
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="md"
                    />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title={<HeaderLogo />}
                hiddenFrom="md"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />
                        {mobileItems}
                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <OrganizationSwitcher 
                            afterCreateOrganizationUrl='/'
                            afterSelectOrganizationUrl={pathname}
                            afterSelectPersonalUrl={pathname}
                            appearance={{
                                elements: {
                                    organizationSwitcherTrigger: 'text-white',
                                    organizationSwitcherTriggerIcon: 'text-white'
                                }
                            }}
                        />
                        <UserButton />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

function MobileDropdown({link, subMenuItems, linksOpened, toggleLinks}: MobileDropdownProps) {
    return (
        <>
            <UnstyledButton className='w-full' onClick={toggleLinks}>
                <Center inline>
                    <Box component={Link} className={classes.link} href={link.link} mr={5}>
                        <span>{link.label}</span>
                        <IconChevronDown size="0.9rem" stroke={1.5} />
                    </Box>
                </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{subMenuItems}</Collapse>
        </>
    );
}