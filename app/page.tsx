import Link from "next/link"

export default function Home() {

    return (
        <main className="container mx-auto">
            <ul className="text-white">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/activities/add-activity">Add Activity</Link>
                </li>
                <li>
                    <Link href="/manage/categories">Manage Categories</Link>
                </li>
                <li>
                    <Link href="/manage/payment-methods">Manage Payment Methods</Link>
                </li>
            </ul>
        </main>
    );
}
