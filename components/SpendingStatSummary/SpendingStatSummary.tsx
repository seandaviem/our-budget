import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from '@tabler/icons-react';
import classes from './SpendingStatSummary.module.css';
import { SortedActivitiesObj } from '@/helpers/sortActivities';
import { ActivityTypeEnum } from '@/budget-types';
import { toCurrency } from '@/helpers/toCurrency';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export default function SpendingStatSummary({ sortedActivities }: { sortedActivities: SortedActivitiesObj }) {

    const income = sortedActivities[ActivityTypeEnum.Income].total;
    const expenses = sortedActivities[ActivityTypeEnum.Expense].total;
    const reimbursements = sortedActivities[ActivityTypeEnum.Expense].reimbursementTotal;
    const savings = income - expenses + reimbursements;

    const data = [
        { title: 'Income', icon: 'receipt', value: income, diff: 34 },
        { title: 'Expenses', icon: 'coin', value: (expenses - reimbursements) * -1, diff: -13 },
        { title: 'Savings', icon: 'discount', value: savings, diff: 18 },
    ] as const;

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
        <Paper withBorder p="md" radius="md" key={stat.title}>
            <Group justify="space-between">
                <Text size="xs" c="dimmed" className={classes.title}>
                    {stat.title}
                </Text>
                <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
            </Group>

            <Group align="flex-end" gap="xs" mt={15}>
                <Text c={stat.value > 0 ? 'teal' : 'red'} className={classes.value}>{toCurrency(Math.abs(stat.value))}</Text>
            </Group>
        </Paper>
        );
    });
    return (
        <div className={classes.root}>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
        </div>
    );
}