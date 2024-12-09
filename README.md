# Bridge Financial NextJS




## Getting Started

To begin working with this project, follow these steps to set up the repository locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **Yarn** (Package Manager)
- **Git** (For version control)

### Steps to Run the Repository

1. **Clone the Repository:**

```bash
   git clone <repository-url>
   cd <repository-name>


```

2. **Install Dependencies:**

Use Yarn to install all necessary dependencies:

```bash
   yarn install
```

3. **Start the Development Server:**

   For local development:

```bash
   yarn run dev:start:browser
```

Output:

```bash
Starting Next.js on localhost:3000
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Network:      http://[::1]:3000
```

4. **Run on a Mobile Device:**

   For responsive testing on your mobile phone:

```bash
  yarn run dev:start:device
```

You’ll receive a network IP address like:

```bash
  Starting Next.js on xxx.xxx.x.xxx:3000
     ▲ Next.js 14.2.5
     - Local:        xxx.xxx.x.xxx:3000
     - Network:      xxx.xxx.x.xxx:3000
```

Copy the IP address to your mobile device's browser (e.g., iPhone).

5. **Start Storybook:**

To develop and test components in isolation:

```bash
  yarn run storybook
```

Access Storybook at `http://localhost:6006`.

---

## About the Project

Bridge Financial leverages modern web development standards to ensure a scalable and maintainable application built with **Next.js**. The project emphasizes:

- **Coding Methodology:** Clear, modular, and reusable code.
- **Scalability:** Structured for growth and adaptation to future requirements.
- **Design Patterns:** Following best practices such as Atomic Design and separation of concerns.

---

## Component Preview and Design with Storybook

**Storybook** is an integral part of our UI development process. It allows you to:

- Design, test, and style components in isolation.
- Avoid premature entanglement of components with data or logic.
- Focus on component functionality, responsiveness, and props handling.

For details on structuring reusable components, refer to the **[Atomic Design Patterns Documentation](./src/components/design-system/DESIGN_SYSTEM_README.md)**. It explains how to organize components to enhance reusability and maintain clarity.

### Why Prioritize View-First Coding?

Designing the view layer first offers several benefits:

- Reduces the risk of production bugs.
- Documents clear usage patterns for each component.
- Prevents duplication of effort as the team scales.
- Establishes a **single source of truth** for component implementations.

---

## Separation of Concerns

**Definition:** Separation of concerns (SoC) is a design principle for dividing a system into distinct sections, each addressing a separate aspect of functionality.

### Importance in Programming

- **Improved Maintainability:** Clear boundaries between concerns make code easier to update and debug.
- **Enhanced Scalability:** Independent modules can grow without introducing system-wide complexity.
- **Reusable Code:** Decoupled components encourage reuse across different parts of the application.

For a deeper dive, check out this resource: **[FreeCodeCamp - Separation of Concerns in React](https://www.freecodecamp.org/news/separation-of-concerns-react-container-and-presentational-components/)**.

---

## Project Setup Documentation

Before contributing to the codebase, review the setup documentation to understand:

- Project structure.
- Design patterns and conventions.
- Key dependencies and tools.

For design pattern details, see: **[Atomic Design Patterns](src/components/design-system/DESIGN_SYSTEM_README.md)**.

---

## Project Folder Structure

Here’s an overview of the folder organization:

```bash
- public/
  ├── assets/
  │   ├── icons/
  │   └── images/
- src/
  ├── app/
  │   ├── auth/
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

---

## Routing with Next.js App Router

The project utilizes the **Next.js App Router** for flexible and declarative routing.

### Key Features:

1. **Shared Routes and Layouts:**

   - Define consistent UI elements (e.g., headers, sidebars) across pages.
   - Maintain a unified design throughout the application.

2. **Dynamic Routing with Segments:**
   - Use `[param]` syntax in directories for dynamic routes.
   - Easily adapt to URL parameters for content or functionality.

---

## Design System: Reusable Styles and Components

### Organized for Consistency

Reusable styles and components are housed in the `design-system` directory. Examples include buttons, typography, and layouts. These components are generic, ensuring consistency across the application.

#### Placement Guidelines:

- **Reusable Components:** Place complex, reusable elements like headers or footers in `design-system/organisms`.
- **Layouts:** Define overarching structures (e.g., pages with headers, sidebars) in `design-system/templates`.

By reusing these building blocks, the project achieves a consistent look and feel while preserving flexibility.

---

## Data Fetching with Next.js

The **App Router** enables efficient data fetching, including server-side rendering and React Server Components. Fetching data at the layout level improves:

- **Performance:** Avoids redundant requests.
- **Simplified Data Management:** Centralizes logic for shared resources.

---

## Redirects and Middleware

The `Middleware.ts` file manages:

- **Authentication Checks:** Ensures users are properly authenticated.
- **Dynamic Redirects:** Redirect users based on login status or other criteria.

This flexible system can be extended as the app evolves.

---

## Learn More

Additional resources:

- **[Next.js Documentation](https://nextjs.org/docs):** Full feature and API details.
- **[Learn Next.js](https://nextjs.org/learn):** Interactive tutorials.

```


```
