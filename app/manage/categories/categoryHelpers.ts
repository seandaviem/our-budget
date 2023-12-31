export interface CategoryObj {
    id: number;
    name: string;
    parentCategoryId: number | null
}

export interface ParentCategoryObj {
    id: number;
    name: string;
    children: CategoryObj[];
}

export interface CategoriesSorted {
    [key: number]: ParentCategoryObj
}

export function sortCategories(categories: CategoryObj[]): CategoriesSorted {
    const categoriesSorted: CategoriesSorted = {};
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].parentCategoryId == null) {
            const currId = categories[i].id;
            categoriesSorted[currId] = {
                id: currId,
                name: categories[i].name,
                children: []
            };
        } else {
            const currId = categories[i].parentCategoryId || 0;
            categoriesSorted[currId].children.push(categories[i]);
        }
    }

    return categoriesSorted;
}