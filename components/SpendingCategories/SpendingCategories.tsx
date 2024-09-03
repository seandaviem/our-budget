import { toCurrency } from "@/helpers/toCurrency";
import { SortedActivitiesObj } from "@/helpers/sortActivities";
import { Card, Group, SimpleGrid, Text } from '@mantine/core';
import { ActivitiesObj, ActivityTypeEnum } from "@/budget-types";
import classes from './SpendingCategories.module.css';

export default function SpendingCategories({ sortedExpenseCategories, sortedActivities, limit = -1 }: { sortedExpenseCategories: string[], sortedActivities: SortedActivitiesObj, limit?: number }) {

    const expenseCategories = limit > -1 ? sortedExpenseCategories.slice(0, limit) : sortedExpenseCategories;

    const cards = expenseCategories.map((key) => {
        const category = sortedActivities[ActivityTypeEnum.Expense]["categories"][parseInt(key)];
        const activities = category.activities.sort(sortActivityExpense).slice(0,3);

        return (
            <Card key={key} withBorder radius="md" p="xl" className={classes.card}>
                <Text fz="lg" className={classes.title} fw={500}>
                    {category.name}
                </Text>
                <Text fz="sm" c="red" mt={3} mb="xl">
                    {toCurrency(category.total - category.reimbursementTotal)}
                </Text>
                <ActivitiesListing activities={activities} />
            </Card>
        );
    });
    
      return (
        <SimpleGrid 
            cols={{ base: 1, xs: 2, md: 3 }}
        >
            {cards}
        </SimpleGrid>
      );

}

function ActivitiesListing({ activities }: { activities: ActivitiesObj[] }) {

    const activityItems = activities.map((activity) => {
        const reimbursementTotal = activity.reimbursements.reduce((acc, reimbursement) => acc + reimbursement.amount, 0);
        const total = activity.amount - reimbursementTotal;

        return (
            <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={activity.id}>
                <div>
                    <Text>{activity.title}</Text>
                    <Text size="xs" c="dimmed">
                        {activity.description}
                    </Text>
                </div>
                <Text size="sm" c={"white"}>
                    {toCurrency(total)}
                </Text>
            </Group>
        );
    });

    return activityItems;
}

function sortActivityExpense(a: ActivitiesObj, b: ActivitiesObj) {
    const bDiff = b.amount - b.reimbursements.reduce((acc, reimbursement) => acc + reimbursement.amount, 0);
    const aDiff = a.amount - a.reimbursements.reduce((acc, reimbursement) => acc + reimbursement.amount, 0);

    return bDiff - aDiff;
}