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
    ComboboxData,
    ActionIcon,
} from '@mantine/core';
import classes from './CategoryListingPage.module.css';
import { useState, createElement, useMemo } from 'react';
import { useDisclosure } from '@/helpers/hooks/useDisclosure';
import EditCategoryForm from '../EditCategoryForm';
import { getIconMap } from '@/helpers/getIconMap';
import { IconEdit, IconFileDollar } from '@tabler/icons-react';
import AddCategoryItemForm from '@/app/manage/categories/AddCategoryItemForm';
import DeleteCategoryForm from '../DeleteCategoryForm';


// TODOS:
// - Better/consistent naming for props
// - Universal types for editing in one spot
// - Improve error handling and validation
// - Add more tests
export interface ItemsObj {
    id: number;
    name: string;
    icon: string;
    _count: {
        [key: string]: number;
    }
}

export type ItemsObjType<T> = T extends ItemsObj ? T : never;

export type ItemsUpdatedResponse<T> = Promise<Response | ItemsObjType<T> | { error: string; }>;
export type ItemsDeletedResponse = Promise<Response | { error: string; } | {success: boolean}>;

interface SortedItemsObj<T> {
    id: number;
    name: string;
    items: ItemsObjType<T>[];
}

interface SortedItems<T> {
    [key: number]: SortedItemsObj<ItemsObjType<T>>;
}

interface CategoryListingPageProps<T> {
    type?: string;
    data: SortedItems<T>;
    reassignOptions: ComboboxData;
    parentIsEditable?: boolean;
    onEditCategory: (item: ItemsObjType<T>, parentId: number | null) => ItemsUpdatedResponse<T>;
    onAddCategory: (item: ItemsObjType<T>, parentId: number | null) => ItemsUpdatedResponse<T>;
    onDeleteCategory: (deleteId: number, reassignId: number | null) => ItemsDeletedResponse;
}

interface CategoryCardProps<T> {
    data: SortedItemsObj<ItemsObjType<T>>;
    iconMap: { [key: string]: React.ComponentType<any> };
    parentIsEditable?: boolean;
    onEditCategoryClick: (item: ItemsObjType<T>, parentId: number | null) => void;
    onAddCategoryClick: (parentId: number) => void;
}

const memoizedIconMap = getIconMap();

export default function CategoryListingPage<T extends ItemsObj>({ type = 'Category', data, reassignOptions, parentIsEditable = true, onEditCategory, onAddCategory, onDeleteCategory }: CategoryListingPageProps<T>) {

    const [currentItem, setCurrentItem] = useState<ItemsObjType<T> | null>(null);
    const [currentParentId, setCurrentParentId] = useState<number | null>(null);
    const [modalOpened, modal] = useDisclosure(false);
    const [showDeleteCategoryForm, setShowDeleteCategoryForm] = useState(false);
    
    const iconMap = useMemo(() => memoizedIconMap, []);

    const modalTitle = currentItem ? `Edit ${type}` : `Add New ${type}`;

    function handleEditItem(item: ItemsObjType<T>, parentId: number | null) {
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
        modal.close();
        setShowDeleteCategoryForm(false);
    }

    return (
        <>
            {parentIsEditable &&
                <div className='mb-5'>
                    <AddCategoryItemForm 
                        placeholder={`Add New ${type}`} 
                        onAddCategory={onAddCategory}
                    />
                </div>
            }
            <SimpleGrid 
                cols={{base: 1, sm: 2, md: 3}}
            >
                {Object.values(data).map((category) => (
                    <CategoryCard 
                        key={category.id} 
                        data={category}
                        iconMap={iconMap}
                        parentIsEditable={parentIsEditable}
                        onEditCategoryClick={handleEditItem}
                        onAddCategoryClick={handleAddItem}
                    />
                ))}
            </SimpleGrid>
            <Modal opened={modalOpened} onClose={handleModalClose} title={modalTitle} centered>
                { showDeleteCategoryForm ? 
                    <DeleteCategoryForm
                        category={currentItem as ItemsObjType<T>}
                        reassignOptions={reassignOptions}
                        onUpdate={handleModalClose}
                        onDeleteCategory={onDeleteCategory}
                    />
                :
                    <EditCategoryForm 
                        category={currentItem as ItemsObjType<T>}
                        parentId={currentParentId as number | null}  
                        iconMap={iconMap}
                        onUpdate={handleModalClose}
                        onEditCategory={onEditCategory}
                        onAddCategory={onAddCategory}
                        onDeleteCategory={onDeleteCategory}
                        setShowDeleteCategoryForm={setShowDeleteCategoryForm}                  
                    />
                }
            </Modal>
        </>
    );

}

function CategoryCard<T>({ data, iconMap, parentIsEditable = true, onEditCategoryClick, onAddCategoryClick }: CategoryCardProps<T>) {

    function handleEditParentCategoryClick() {
        const item = {
            id: data.id,
            name: data.name,
            icon: 'IconFileDollar',
        } as ItemsObjType<T>;

        onEditCategoryClick(item, null);
    }

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
                    <div className='flex gap-2'>
                        <Text className={classes.title}>{ data.name }</Text>
                        { parentIsEditable &&
                            <ActionIcon
                                className="self-center"
                                color="gray"
                                variant="subtle"
                                onClick={handleEditParentCategoryClick}
                            >
                                <IconEdit size="18px" />
                            </ActionIcon>
                        }
                    </div>
                
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