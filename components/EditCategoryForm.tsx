"use client"

import { useForm } from "@/helpers/hooks/useForm";
import { ItemsObjType } from "./CategoryListingPage/CategoryListingPage";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActionIcon, Avatar, Drawer, TextInput } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@/helpers/hooks/useDisclosure";
import { getIconMap } from "@/helpers/getIconMap";

const IconPicker = dynamic(() => import("@/components/IconPicker"));

interface EditCategoryFormProps<T> {
    category: ItemsObjType<T>;
}

export default function EditCategoryForm<T>({ category }: EditCategoryFormProps<T>) {

    const iconMap = useMemo(() => getIconMap(), []);

    const { fields, updateForm } = useForm({
        id: category.id,
        icon: '',
        name: category.name,
    });
    const usedInputRef = useRef(false);
    const [disableButton, setDisableButton] = useState(true);
    const [drawerOpened, drawer] = useDisclosure(false);

    useEffect(() => {
        if (drawerOpened) {
            drawer.close();
        }
    }, [fields.icon])

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });

        if (!usedInputRef.current) {
            usedInputRef.current = true;
            setDisableButton(false);
        }
    }

    const handleIconSelect = useCallback((name: string) => {
        updateForm({ key: 'icon', value: name });
    }, []);

    return (
        <>
            <div className="categoryForm">
                <Avatar
                    color="blue"
                    radius="xl"
                >
                    <ActionIcon size="xl" color="blue" variant="filled" radius="xl" onClick={drawer.open}>
                        {fields.icon ? React.createElement(iconMap[fields.icon], { size: 24 }) : <IconStar size={24} />}
                    </ActionIcon>
                </Avatar>
                <TextInput
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Name"
                    required
                    value={fields.name}
                    onChange={handleInputChange}
                />
                <div className="mt-5 flex gap-3">
                    <button className="btn btn-primary" disabled={disableButton}>Save</button>
                    <button className="btn btn-red">Delete</button>
                </div>
            </div>
            <Drawer opened={drawerOpened} onClose={drawer.close} title="Choose an Icon">
                <IconPicker
                    iconMap={iconMap} 
                    onSelect={handleIconSelect} 
                />
            </Drawer>
        </>
    );
}