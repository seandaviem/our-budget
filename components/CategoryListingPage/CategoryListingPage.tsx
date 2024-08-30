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

interface ItemsObj {
    id: number;
    name: string;
    icon: string;
}

export type ItemsObjType<T> = T extends ItemsObj ? T : never;

interface SortedItemsObj<T> {
    id: number;
    name: string;
    items: ItemsObjType<T>[];
}

interface SortedItems<T> {
    [key: number]: SortedItemsObj<ItemsObjType<T>>;
}

interface CategoryCardProps<T> {
    data: SortedItemsObj<ItemsObjType<T>>;
    iconMap: { [key: string]: React.ComponentType<any> };
    openModal: () => void;
    setCurrentItem: Dispatch<SetStateAction<ItemsObjType<T> | null>>;
}

export default function CategoryListingPage<T extends ItemsObj>({ data }: { data: SortedItems<T>}) {

    const [currentItem, setCurrentItem] = useState<ItemsObjType<T> | null>(null);
    const [modalOpened, modal] = useDisclosure(false);
    
    const iconMap = useMemo(() => getIconMap(), []);

    const modalTitle = currentItem ? "Edit Category" : "Add Category";

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
                        openModal={modal.open} 
                        setCurrentItem={setCurrentItem} 
                    />
                ))}
            </SimpleGrid>
            <Modal opened={modalOpened} onClose={modal.close} title={modalTitle} centered>
                <EditCategoryForm 
                    category={currentItem as ItemsObjType<T>}  
                    iconMap={iconMap}                  
                />
            </Modal>
        </>
    );

}

function CategoryCard<T>({ data, iconMap, openModal, setCurrentItem }: CategoryCardProps<T>) {

    function handleItemClick(item: ItemsObjType<T>) {
        setCurrentItem(item);
        openModal();
    }

    function handleAddItemClick() {
        setCurrentItem(null);
        openModal();
    }

    const items = data.items.map((item) => (
        <UnstyledButton 
            key={item.id} 
            className={classes.item}
            onClick={() => handleItemClick(item)}
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
                        onClick={handleAddItemClick}
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