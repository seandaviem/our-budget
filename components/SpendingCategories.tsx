import Card from "./Card";
import { toCurrency } from "@/helpers/toCurrency";
import { SortedActivitiesObj } from "@/helpers/sortActivities";

export default function SpendingCategories({ sortedExpenseCategories, sortedActivities, limit = -1 }: { sortedExpenseCategories: string[], sortedActivities: SortedActivitiesObj, limit?: number }) {

    const expenseCategories = limit > -1 ? sortedExpenseCategories.slice(0, limit) : sortedExpenseCategories;

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 justify-center gap-5">
            {expenseCategories.map(key => {
                const category = sortedActivities["2"]["categories"][parseInt(key)];
                const activities = category.activities.sort((a, b) => b.amount - a.amount).slice(0,3);
                return (
                    <div key={key} className="flex flex-col mb-5">
                        <h3 className="text-white mb-3">{category.name}: {toCurrency(category.total)}</h3>
                        <Card className="flex-1">
                            {activities.map((activity) => {
                                return (
                                    <div key={activity.id} className="flex justify-between text-white">
                                        <p>{activity.title}</p>
                                        <p>{toCurrency(activity.amount)}</p>
                                    </div>
                                );
                            })}
                        </Card>
                    </div>
                );
            })}
        </div>
    )
}