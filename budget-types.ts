// Categories
export interface CategoryObj {
    id: number;
    name: string;
    icon: string;
    parentCategoryId: number | null;
    _count: {
        [key: string]: number;
    }
}

export interface ParentCategoryObj {
    id: number;
    name: string;
    items: CategoryObj[];
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

// ActivityType Enum
export enum ActivityTypeEnum {
    Income = 1,
    Expense = 2,
    Reimbursement = 3,
    BigExpense = 4
}
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
    icon: string;
    activityType?: ActivityTypes;
    _count: {
        [key: string]: number;
    }
}

export interface SortedPaymentMethodsObj {
    id: number;
    name: string;
    items: PaymentMethodObj[];
}

export interface PaymentMethodsSorted {
    [key: number]: SortedPaymentMethodsObj; // key is activityType ID; 
}

// Update Functions
export type HandleReimbursementsUpdateFunction = (reimbursement: ReimbursementsObj, action: 'add' | 'update' | 'delete') => void;