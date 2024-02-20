## About Our Budget
Hello there! If you've stumbled upon this repository, you might be asking yourself what it is exactly. The Our Budget app is a fun little project I've been working on to help my wife and me keep track of of finances throughout the year. Could I have just done this using a spreadsheet? Yes, absolutely! But what's the fun in that? The functionality of this app is to allow us to log purchases and categorize them based our preferences. We'll then have access to a variety of reports that detail our spending habits, where we spend the most, what we save, and more!

### The Tech Stack
The goal is to keep this as free as possible on our deployed web app, so user access is limited and monitored. You can find what free technology is being used below:
- Langauge: TypeScript
- Framework: [`Next.js (App Router)`](https://nextjs.org/docs)
- Authentication: [`Clerk`](https://clerk.com/)
- Database: [`PlanetScale (MySQL)`](https://planetscale.com/)
- ORM: [`Prisma`](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale)
- CSS: [`Tailwind CSS`](https://tailwindcss.com/docs/installation)

## A Work in Progress
This is nowhere near a finished product, and is something that is currently still being worked on. While the initial goal was to get something stood up and usable, there are a plethora of To-Do's that need to be taken care of to enhance functionality, optimize performance, and polish the UI. I can explain!

### *Where is the navigation?*
That's a fair question. As mentioned above, my main focus when starting was to get the main functionality set up. Because only two people are currently using the app, I have the header navigation a bit lower on the To-Do's. All navigation links can be found on the homepage, and will eventually more into a universal header navigation component. 

The overall styling of the app can and will be improved in the future as well. Basic styles are being used at the moment while functionality is prioritized.

### *Where are the reports?*
Also a fair question! Reports are currently in progress as we speak. To get the latest updates, make sure to visit the [`reports`](https://github.com/seandaviem/our-budget/tree/reports) branch.

### *What's up with your folder structure?*
As a sole developer on this project, I have some freedom when it comes to testing out different folder structures. Because Next.js offers [safe colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation#safe-colocation-by-default) by default, folder structure can vary. For this project, I wanted to test keeping the app directory specfic to layouts, pages, and routes. If a component/function is specific to that route, it lives in that directory. Otherwise, universal components and functions live outside of the app directory in their own directories. 

To be honest, I'm not sure I like it, and it might change down the road. However, I like to test these things as it helps me easily jump into another's project when needed.

### *Will tests be incorporated?*
Most definitely, pretty much any day now. I wanted to get a little further out of the discovery phase, and have identified a path forward before starting to implement tests with the possibility of re-writing down the road. The re-writes are still a possibility, but it's at a point where some sections could greatly benefit from some tests. 

For testing, this project will be using [Vitest](https://vitest.dev/)

## Wrapping Up
If you have any questions about this project, feel free to reach out to me. Chances are if you're seeing this repository, you probably already have my contact information.

Feel free to fork this project and connect it to your own database if you'd like as well!
