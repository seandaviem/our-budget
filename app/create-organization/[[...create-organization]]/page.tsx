import { CreateOrganization } from "@clerk/nextjs";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Create Organization | Our Budget',
    description: 'Create an organization with others.',
}
 
export default function CreateOrganizationPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <CreateOrganization />
        </div>
    );
}