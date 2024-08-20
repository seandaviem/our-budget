import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Image } from "@mantine/core";
import classes from "./css/Header.module.css"

export default function HeaderLogo() {
    return (
        <div className={classes.logo}>
            <Link href="/">
                <Image 
                    component={NextImage} 
                    src='/our-budget-logo.svg' 
                    alt="Our Budget Logo" 
                    width={0} 
                    height={0}
                    className={classes.logoImg}  
                />
            </Link>
        </div>
    )
}