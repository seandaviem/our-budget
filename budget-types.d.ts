// Categories
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

// Tables
export type TableCol = [key: string, label: string, sortable: boolean];

export type RowData = {
  id: string | number;
} & {
  [key: string]: any;
};

/*********
 * DB Objects
 ********/

// Activities
export interface ActivitiesObj {
    id: number;
    date: Date;
    title: string;
    description: string | null;
    amount: number;
    activityType?: ActivityTypes;
    category?: CategoryObj;
    userId: string;
    paymentMethod?: PaymentMethodObj;
    reimbursements: ReimbursementsObj[];
}

export interface ActivityTypes {
    id: number;
    name: string;
}

// Reimbursements
export interface ReimbursementsObj {
    id: number;
    date: Date;
    title: string;
    description: string | null;
    amount: number;
    activityId: number;
    category?: CategoryObj;
    userId: string;
    paymentMethod?: PaymentMethodObj;
}

// Payment Methods
export interface PaymentMethodObj {
    id: number;
    name: string;
    activityType: ActivityTypes;
}

export interface SortedPaymentMethodsObj {
    activityTypeId: number;
    activityTypeName: string;
    items: PaymentMethodObj[];
}

export interface PaymentMethodsSorted {
    [key: number]: SortedPaymentMethodsObj; // key is activityType ID; 
}

// Update Functions
export type HandleReimbursementsUpdateFunction = (reimbursement: ReimbursementsObj, action: 'add' | 'update' | 'delete') => void;