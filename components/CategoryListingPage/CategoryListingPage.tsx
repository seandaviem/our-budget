"use client"

import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    Modal,
    Avatar,
} from '@mantine/core';
import classes from './CategoryListingPage.module.css';
import { Dispatch, SetStateAction, useState, createElement, useMemo } from 'react';
import { useDisclosure } from '@/helpers/hooks/useDisclosure';
import EditCategoryForm from '../EditCategoryForm';
import { getIconMap } from '@/helpers/getIconMap';
import { IconFileDollar } from '@tabler/icons-react';

export interface ItemsObj {
    id: number;
    name: string;
    icon: string;
}

export type ItemsObjType<T> = T extends ItemsObj ? T : never;

export type ItemsUpdatedResponse = Promise<Response | ItemsObj | { error: string; }>;

interface SortedItemsObj<T> {
    id: number;
    name: string;
    items: ItemsObjType<T>[];
}

interface SortedItems<T> {
    [key: number]: SortedItemsObj<ItemsObjType<T>>;
}

interface CategoryListingPageProps<T> {
    data: SortedItems<T>;
    onEditCategory: (item: ItemsObjType<T>, parentId: number) => ItemsUpdatedResponse;
    onAddCategory: (item: ItemsObjType<T>, parentId: number) => ItemsUpdatedResponse;
}

interface CategoryCardProps<T> {
    data: SortedItemsObj<ItemsObjType<T>>;
    iconMap: { [key: string]: React.ComponentType<any> };
    onEditCategoryClick: (item: ItemsObjType<T>, parentId: number) => void;
    onAddCategoryClick: (parentId: number) => void;
}

export default function CategoryListingPage<T extends ItemsObj>({ data, onEditCategory, onAddCategory }: CategoryListingPageProps<T>) {

    const [currentItem, setCurrentItem] = useState<ItemsObjType<T> | null>(null);
    const [currentParentId, setCurrentParentId] = useState<number | null>(null);
    const [modalOpened, modal] = useDisclosure(false);
    
    const iconMap = useMemo(() => getIconMap(), []);

    const modalTitle = currentItem ? "Edit Category" : "Add Category";

    function handleEditItem(item: ItemsObjType<T>, parentId: number) {
        setCurrentItem(item);
        setCurrentParentId(parentId);
        modal.open();
    }

    function handleAddItem(parentId: number) {
        setCurrentItem(null);
        setCurrentParentId(parentId);
        modal.open();
    }

    function handleModalClose() {
        setCurrentItem(null);
        setCurrentParentId(null);
        modal.close();
    }

    return (
        <>
            <SimpleGrid 
                cols={{base: 1, sm: 2, md: 3}}
            >
                {Object.values(data).map((category) => (
                    <CategoryCard 
                        key={category.id} 
                        data={category}
                        iconMap={iconMap}
                        onEditCategoryClick={handleEditItem}
                        onAddCategoryClick={handleAddItem}
                    />
                ))}
            </SimpleGrid>
            <Modal opened={modalOpened} onClose={handleModalClose} title={modalTitle} centered>
                <EditCategoryForm 
                    category={currentItem as ItemsObjType<T>}
                    parentId={currentParentId as number}  
                    iconMap={iconMap}
                    onUpdate={handleModalClose}
                    onEditCategory={onEditCategory}
                    onAddCategory={onAddCategory}                  
                />
            </Modal>
        </>
    );

}

function CategoryCard<T>({ data, iconMap, onEditCategoryClick, onAddCategoryClick }: CategoryCardProps<T>) {

    const items = data.items.map((item) => (
        <UnstyledButton 
            key={item.id} 
            className={classes.item}
            onClick={() => onEditCategoryClick(item, data.id)}
        >
            <Avatar
                size="md"
                radius="xl"
            >
                {item.icon ? createElement(iconMap[item.icon], { size: 24 }) : <IconFileDollar size={24} />}
            </Avatar>
            <Text size="xs" mt={7}>
                {item.name}
            </Text>
        </UnstyledButton>
    ));

    return (
        <>  
            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <Text className={classes.title}>{ data.name }</Text>
                    <Anchor 
                        type='button' 
                        size="xs" 
                        c="dimmed" 
                        style={{ lineHeight: 1 }}
                        onClick={() => onAddCategoryClick(data.id)}
                    >
                        + Add New Item
                    </Anchor>
                </Group>
                <SimpleGrid cols={{base: 1, sm: 2, md: 2}} mt="md">
                    {items}
                </SimpleGrid>
            </Card>
        </>
      );
}