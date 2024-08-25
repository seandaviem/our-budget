import { getPriceColorOptions } from "@/helpers/getPriceColorOptions";
import { ActivitiesObj, ReimbursementsObj, ActivityTypeEnum } from "@/budget-types";
import { toCurrency } from "@/helpers/toCurrency";


export default function PriceListing({ activity }: { activity: ActivitiesObj }) {

    const priceColorOptions: {[key: string]: string} = getPriceColorOptions();
    let priceColor = activity.activityType?.name ? priceColorOptions[activity.activityType?.name.toLowerCase()] : priceColorOptions["default"];

    let currAmount = activity.amount;
    if (activity.reimbursements.length > 0) {
        currAmount = activity.reimbursements.reduce((acc: number, reimbursement: ReimbursementsObj) => acc - reimbursement.amount, currAmount);
    }

    if (currAmount < 0) {
        priceColor = priceColorOptions["income"];
        currAmount *= -1;
    }

    return (
        <>
            <span className={`${priceColor}`}>{toCurrency(currAmount)}</span>
            {activity.reimbursements.length > 0 && <SlashedPrice className="ms-3" amount={activity.amount} /> }   
        </>
    )
    

}

function SlashedPrice({ amount, className } : { amount: number, className?: string }) {
    return <span className={`line-through text-red-400 ${className ? className : ''}`}>{toCurrency(amount)}</span>
}