# Bridge Financial Next.js

## Getting Started

Follow these steps to set up the repository locally and begin development.

---

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **Yarn** (Package Manager)
- **Git** (For version control)

---

### Setup and Run

1. **Clone the Repository**  
   Clone the repository and navigate into the project directory:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**  
   Use Yarn to install all necessary dependencies:

   ```bash
   yarn install
   ```

3. **Start the Development Server**  
   For local development, run:

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

4. **Run on a Mobile Device**  
   For responsive testing on a mobile device:

   ```bash
   yarn run dev:start:device
   ```

   Output:

   ```bash
   Starting Next.js on xxx.xxx.x.xxx:3000
      ▲ Next.js 14.2.5
      - Local:        xxx.xxx.x.xxx:3000
      - Network:      xxx.xxx.x.xxx:3000
   ```

   Copy the network IP address and open it in your mobile browser.

5. **Start Storybook**  
   To develop and test components in isolation, start Storybook:

   ```bash
   yarn run storybook
   ```

   Access Storybook at `http://localhost:6006`.

---

## About the Project

Bridge Financial leverages **Next.js** to deliver a scalable, maintainable, and modular application. Key focus areas include:

- **Clear Coding Methodology**: Modular and reusable code for ease of development.
- **Scalability**: Structured to accommodate growth and future requirements.
- **Best Practices**: Adheres to Atomic Design principles and separation of concerns.

---

## Component Library Workflow

To ensure efficient collaboration and design approval:

1. **Design the Views First**: Developers should focus on implementing the views first, ensuring all components are visually complete before integrating data or logic.
2. **Component Testing and Review**: Use Storybook to test components in isolation, allowing designers and product owners to review and approve designs directly in Chromatic.

### Benefits of Storybook and Chromatic

- **Enhanced Collaboration**:
  - Developers and designers work with consistent naming conventions.
  - Comprehensive documentation ensures clear communication with designers and product owners.
- **Streamlined Development**:
  - Simplifies component testing and iteration.
- **Visual Feedback**:
  - Product owners and stakeholders can leave comments, provide feedback, and approve designs.
- **Centralized Documentation**:
  - Acts as a single source of truth for all components.

### View and Review the Design System

Explore the **current design system** and leave **comments and feedback** directly in Chromatic:

- **Production Environment**:  
  [View Production Design System](https://production--6738599a3dbeed767bab1a83.chromatic.com)

- **Staging Environment**:  
  [View Staging Design System](https://staging--6738599a3dbeed767bab1a83.chromatic.com)

---

## Project Structure

Organized to enhance maintainability and scalability:

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

## Additional Resources

- **[Next.js Documentation](https://nextjs.org/docs):** Official feature and API details.
- **[Learn Next.js](https://nextjs.org/learn):** Interactive tutorials.
- **[Atomic Design Patterns](src/components/design-system/DESIGN_SYSTEM_README.md):** Guidelines for creating reusable and scalable components.
