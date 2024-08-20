import React from "react";
import {
    Group,
    Box,
    useMantineTheme,
} from "@mantine/core";
import classes from "./css/Header.module.css";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import HeaderLogo from "./HeaderLogo";

export default function SignedOutNav() {

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <HeaderLogo />

                    <Group>
                        <SignInButton />
                    </Group>

                </Group>
            </header>
        </Box>
    );
}