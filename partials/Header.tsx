import { SignedIn, SignedOut, SignInButton, UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-8 py-4">
            <div className="logo">
                <h1 className="text-3xl text-white">My Budget</h1>
            </div>
            <nav>
                <SignedIn>
                    <div className="flex space-x-4">
                        <OrganizationSwitcher 
                            afterCreateOrganizationUrl='/'
                            afterSelectOrganizationUrl='/'
                            afterSelectPersonalUrl='/'
                            appearance={{
                                elements: {
                                    organizationPreviewMainIdentifier: 'text-white',
                                    organizationSwitcherTriggerIcon: 'text-white'
                                }
                            }}
                        />
                        <UserButton />
                    </div>
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </nav>
        </header>
    )
}