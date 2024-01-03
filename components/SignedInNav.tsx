'use client'

import { usePathname } from "next/navigation";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function SignedInNav() {

    const pathname = usePathname();

    return (
        <div className="flex space-x-4">
            <OrganizationSwitcher 
                afterCreateOrganizationUrl='/'
                afterSelectOrganizationUrl={pathname}
                afterSelectPersonalUrl={pathname}
                appearance={{
                    elements: {
                        organizationPreviewMainIdentifier: 'text-white',
                        organizationSwitcherTriggerIcon: 'text-white',
                        userPreviewMainIdentifier: 'text-white'
                    }
                }}
            />
            <UserButton />
        </div>
    )
}