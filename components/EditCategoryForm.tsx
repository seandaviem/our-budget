"use client"

import { useForm } from "@/helpers/hooks/useForm";
import { ItemsDeletedResponse, ItemsObjType } from "./CategoryListingPage/CategoryListingPage";
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { ActionIcon, Drawer, TextInput } from "@mantine/core";
import { IconFileDollar } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@/helpers/hooks/useDisclosure";
import toast from "react-hot-toast";
import { ItemsUpdatedResponse } from "./CategoryListingPage/CategoryListingPage";
import LoadButton from "./LoadButton";

const IconPicker = dynamic(() => import("@/components/IconPicker"));

interface EditCategoryFormProps<T> {
    category: ItemsObjType<T> | null;
    parentId: number | null;
    iconMap: { [key: string]: React.ComponentType<any> };
    onUpdate: () => void;
    onEditCategory: (item: ItemsObjType<T>, parentId: number | null) => ItemsUpdatedResponse<T>;
    onAddCategory: (item: ItemsObjType<T>, parentId: number | null) => ItemsUpdatedResponse<T>;
    onDeleteCategory: (deleteId: number, reassignId: number | null) => ItemsDeletedResponse;
    setShowDeleteCategoryForm: Dispatch<SetStateAction<boolean>>;
}

export default function EditCategoryForm<T>({ category, parentId, iconMap, onUpdate, onEditCategory, onAddCategory, onDeleteCategory, setShowDeleteCategoryForm }: EditCategoryFormProps<T>) {

    const { fields, updateForm } = useForm({
        id: category?.id || 0,
        icon: category?.icon || 'IconFileDollar',
        name: category?.name || '',
    });
    const [disableButton, setDisableButton] = useState(true);
    const [drawerOpened, drawer] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateCategoryWithData = onEditCategory.bind(null, fields as ItemsObjType<T>, parentId);
    const addCategoryWithData = onAddCategory.bind(null, fields as ItemsObjType<T>, parentId);
    const deleteCategoryWithData = onDeleteCategory.bind(null, fields.id, null);

    useEffect(() => {
        if (drawerOpened) {
            drawer.close();
        }
    }, [fields.icon])

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });

        if (value && (value !== category?.name || fields.icon !== category?.icon)) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }

    const handleIconSelect = useCallback((name: string) => {
        updateForm({ key: 'icon', value: name });

        if (fields.name && (name !== category?.icon || fields.name !== category?.name)) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [drawerOpened]);

    async function handleSaveChanges() {
        setIsLoading(true);

        let result;
        if (category === null) {
            result = await addCategoryWithData();
        } else {
            result = await updateCategoryWithData();
        }

        if ("error" in result) {
            toast.error(result.error);
        } else {
            toast.success(`Category has been ${category ? "updated" : "added"}!`);
        }

        onUpdate();
        setIsLoading(false);

    }

    async function handleDeleteCategory() {
        setIsLoading(true);

        const result = await deleteCategoryWithData();

        if ("error" in result) {
            toast.error(result.error);
        } else {
            toast.success("Category has been deleted!");
        }

        onUpdate();
        setIsLoading(false);
    }

    function handleDeleteClick() {
        let hasItems = false;
        if (category !== null && ("_count" in category)) {
            Object.keys(category._count).forEach((key) => {
                if (category._count[key] > 0) {
                    hasItems = true;
                }
            });
        }

        if (hasItems) {
            setShowDeleteCategoryForm(true);
            return;
        }

        console.log("This ran");
        handleDeleteCategory();

    }


    return (
        <>
            <div className="categoryForm flex flex-col gap-4">
                {parentId && 
                    <ActionIcon 
                        className="self-center"
                        size={"72px"} 
                        color="gray" 
                        variant="filled" 
                        radius="50%" 
                        name="icon"
                        onClick={drawer.open}
                    >
                        {fields.icon ? React.createElement(iconMap[fields.icon], { size: 48 }) : <IconFileDollar size={48} />}
                    </ActionIcon>
                }
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
                    <LoadButton 
                        className="btn btn-primary" 
                        disabled={disableButton}
                        isLoading={isLoading}
                        loadingText={category ? "Saving..." : "Adding..."}
                        onClick={handleSaveChanges}
                    >
                        {category ? "Save" : "Add"}
                    </LoadButton>
                    { category && 
                        <LoadButton 
                            className="btn btn-red"
                            isLoading={isLoading}
                            loadingText="Deleting..."
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </LoadButton> 
                    }
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