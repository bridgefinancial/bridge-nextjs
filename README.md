

## Project Setup Documentation

Before getting started with the project, please review the documentation on how the project is set up. This will help you understand the structure, patterns, and conventions used throughout the codebase:

- **[Atomic Design Patterns](src/components/design-system/DESIGN_SYSTEM_README.md)**

## Folder Structure

Below is an example of our project’s folder structure:

```
- public
  ├── assets/
  │   ├── icons/
  │   └── images/
- src
  ├── app
  │   └── auth/
  │   └── portal/
  ├── components/
  │   ├── design-system/
  │   │   ├── atoms/
  │   │   ├── molecules/
  │   │   ├── organisms/
  │   │   └── templates/
  │   ├── routing/
  │   └── seo/
  ├── hoc/
  ├── hooks/
  ├── providers/
  ├── services/
  ├── utils/
  ├── types/
  └── theme/
```

## Using the Next.js App Router

Our project utilizes the Next.js App Router, which offers a more flexible and declarative way to manage routing compared to the traditional Page Router. Here are some key concepts and practices to keep in mind:

### Shared Routes and Layouts
With the App Router, you can define shared layouts that automatically wrap around nested pages. This allows for a consistent layout across multiple routes without needing to duplicate code. For instance, a header or sidebar component that persists across all pages can be defined once and applied across different routes.

### Dynamic Routing with Segments
Dynamic routing in the App Router is handled by segment-based routing. Files and directories with square brackets (`[param]`) denote dynamic segments that capture parts of the URL. This approach makes it easy to build flexible routes that handle various parameters and dynamic content without manually configuring routes.

### Reusable Styles and Components in the Design System
- **Design System Components:** Reusable styles and components are organized under the `design-system` directory within `components`. These are treated as view or display components, meaning they are generic, reusable building blocks of the UI.
- **Usage:** These reusable components, such as buttons, typography, and layout templates, should be imported into the `app` directory and customized for specific pages or features. This approach ensures consistency across the application while allowing for flexibility in design.


### Where to Place Components
- **Reusable Header/Footer Components:** Place these inside `components/design-system/organisms`. Organisms typically consist of more complex and reusable components that combine multiple atoms and molecules to form a meaningful section of the UI.
- **Layout Components:** Layout components that define the structure of the page (e.g., the arrangement of headers, footers, sidebars, and content areas) should be placed inside `components/design-system/templates`. Templates are high-level structures that arrange various organisms and provide a consistent layout for the pages.

### Data Fetching in the App Router
Explore the new data-fetching patterns available in the App Router, such as fetching data at the layout level, and how this integrates with React Server Components.

## Redirects

The `Middleware.ts` file is responsible for checking the authentication token and redirecting the user based on their login status. This implementation is flexible and subject to future enhancements.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

