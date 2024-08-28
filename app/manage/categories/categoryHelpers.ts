import { CategoryObj, CategoriesSorted } from '@/budget-types';

export function sortCategories(categories: CategoryObj[]): CategoriesSorted {
    const categoriesSorted: CategoriesSorted = {};
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].parentCategoryId == null) {
            const currId = categories[i].id;
            categoriesSorted[currId] = {
                id: currId,
                name: categories[i].name,
                items: []
            };
        } else {
            const currId = categories[i].parentCategoryId || 0;
            categoriesSorted[currId].items.push(categories[i]);
        }
    }

    return categoriesSorted;
}