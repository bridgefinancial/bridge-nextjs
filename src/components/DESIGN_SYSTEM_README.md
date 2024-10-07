## Atomic Design Approach

For this project, we’ve adopted the **Atomic Design methodology** as the foundation for our UI development. This approach, combined with the use of third-party libraries like Material UI and Tailwind, enables us to build a scalable, consistent, and maintainable UI. Our focus is on leveraging existing libraries to avoid reinventing the wheel—this accelerates development and ensures the use of well-tested, widely-adopted solutions.

It’s important to recognize that **Atomic Design** extends beyond just a visual design system limited to UI components. It’s a design pattern that provides a systematic way to structure your codebase. For example, components like **ErrorBoundary** or containers managing application state can be considered atoms, even though they may not be visual elements. These are fundamental building blocks that can be composed into more complex structures.

For more insight into how Atomic Design can be implemented with React, consider exploring this [example](https://medium.com/@simo-dlamini/a-friendly-guide-to-the-atomic-file-structure-in-react-8bd33e55361c#:~:text=The%20Atomic%20Design%20methodology%20provides%20a%20way%20to,elements%20that%20make%20our%20apps%20consistent%20and%20scalable).

### Purpose and Structure

This approach is centered on organizing reusable components in a clear, maintainable way, ensuring that any developer—whether new to the project or stepping in after another has left—can easily navigate and contribute to the codebase. While this methodology enhances consistency across the team, it’s important to note that it is not a Design System in itself but rather a method for structuring React components efficiently.

Starting your project with Atomic Design simplifies the process of eventually creating a full-fledged design system if needed. If you want to reuse components across multiple projects, this structure allows you to create a component library, enabling you to import code that is already proven in production without needing to rewrite large portions of it. This approach also improves communication with UI/UX design teams, especially if they follow the same methodology and naming conventions, ensuring that everyone is aligned.

### Example of a Folder Structure

```plaintext
src/
└── components/
    └── design-system/
        ├── atoms/
        │   ├── containers/
        │   ├── buttons/
        │   ├── typography/
        │   ├── data-display/
        │   └── forms/
        ├── molecules/
        │   ├── forms/
        │   ├── cards/
        │   ├── feedback/
        │   ├── navigation/
        │   └── overlays/
        ├── organisms/
        │   ├── headers/
        │   ├── footers/
        │   └── profiles/
        └── templates/
            └── layouts/
                ├── LandingLayout/
                │   ├── index.tsx
                │   └── LandingLayout.component.tsx
                └── PortalLayout/
```

```plaintext
atoms/
└── ExampleComponent/
    ├── index.tsx [optional]
    ├── ExampleComponent.component.tsx
    ├── ExampleComponent.styles.tsx [optional]
    ├── ExampleComponent.stories.tsx [optional]
    └── ExampleComponent.spec.tsx [optional]
```

### Organization Rationale

The project is structured into four main categories following the Atomic Design methodology:

1. **Atoms**: The smallest, most basic building blocks of the UI, such as buttons, typography elements, and form inputs. These components are simple and form the foundation of the design system.

   **Example: Button Component**

   ```tsx
   // src/components/design-system/atoms/buttons/PrimaryButton.tsx
   import React from "react";

   interface PrimaryButtonProps {
     label: string;
     onClick: () => void;
     disabled?: boolean;
   }

   const PrimaryButton: React.FC<PrimaryButtonProps> = ({
     label,
     onClick,
     disabled = false,
   }) => (
     <button
       onClick={onClick}
       disabled={disabled}
       className={`px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
     >
       {label}
     </button>
   );

   export default PrimaryButton;
   ```

2. **Molecules**: More complex components composed of atoms, such as form fields or card layouts. These components are functional and reusable across the application.

   **Example: Form Field Component**

   ```tsx
   // src/components/design-system/molecules/forms/FormField.tsx
   import React from "react";

   interface FormFieldProps {
     label: string;
     type: string;
     placeholder?: string;
     description?: string;
     value: string;
     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   }

   const FormField: React.FC<FormFieldProps> = ({
     label,
     type,
     placeholder,
     description,
     value,
     onChange,
   }) => (
     <div className="flex flex-col mb-4">
       <label className="mb-2 font-semibold text-gray-700">{label}</label>
       <input
         type={type}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         className="p-2 border rounded-lg"
       />
       {description && (
         <p className="mt-1 text-sm text-gray-500">{description}</p>
       )}
     </div>
   );

   export default FormField;
   ```

3. **Organisms**: Larger, more complex components composed of molecules and atoms. These components represent significant sections of the UI, such as headers, footers, and layout structures.

   **Example: Header Component**

   ```tsx
   // src/components/design-system/organisms/headers/MainHeader.tsx
   import React from "react";
   import PrimaryButton from "../../atoms/buttons/PrimaryButton";
   import FormField from "../../molecules/forms/FormField";

   const MainHeader: React.FC = () => (
     <header className="flex justify-between items-center p-4 bg-white shadow-md">
       <img src="/assets/images/Bridge-logo.png" alt="Logo" className="w-32" />
       <nav className="flex gap-4">
         <PrimaryButton label="Home" onClick={() => {}} />
         <PrimaryButton label="About" onClick={() => {}} />
         <PrimaryButton label="Contact" onClick={() => {}} />
       </nav>
       <div className="flex items-center gap-4">
         <FormField
           label="Search"
           type="text"
           value=""
           onChange={() => {}}
           placeholder="Search..."
         />
         <PrimaryButton label="Profile" onClick={() => {}} />
       </div>
     </header>
   );

   export default MainHeader;
   ```

4. **Templates**: High-level components that define the overall structure or layout of a page or section of the application. Templates ensure consistency in layout across different parts of the application by combining organisms, molecules, and atoms.

   **Example: Landing Layout**

   ```tsx
   // src/components/design-system/templates/layouts/LandingLayout/LandingLayout.component.tsx
   import React, { ReactNode } from "react";
   import { Container, Box } from "@mui/material";
   import MainHeader from "@/components/design-system/organisms/headers/MainHeader";
   import ImageBackground from "@/components/design-system/atoms/containers/ImageBackground";

   interface LayoutProps {
     children: ReactNode;
     pathForHome?: string;
   }

   const LandingLayout: React.FC<LayoutProps> = ({
     children,
     pathForHome = "/",
   }) => {
     return (
       <ImageBackground
         src="/assets/images/gradient.png"
         alt="Bridge Financial Gradient"
       >
         <Box>
           <MainHeader pathForHome={pathForHome} />
           <Box
             sx={{
               height: "100vh",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               padding: 1,
             }}
           >
             <Container maxWidth="md">{children}</Container>
           </Box>
         </Box>
       </ImageBackground>
     );
   };

   export default LandingLayout;
   ```

### View-Only Components

These components should be treated as views that are reusable for displaying data. They should not be tied to any API calls or hardcoded functions. While it’s perfectly fine to pass values into these components as props, their primary role is to present the data that is passed to them, ensuring a clear separation between logic and presentation.

They shouldn't contain anything from Next.js when it comes to links or routing. The reason for this is that they should be flexible enough to be used in any React project, without being tied to a specific routing system or using a lot of internal functions. This flexibility also makes it easier to eventually reuse these components in other projects or even in a shared component library.

### Independence of the Design System

It’s important to treat the `design-system` folder as an independent module within the project. This means:

- **No External Imports:** Nothing from outside the `design-system` folder should be imported into it. The components within `design-system` should not rely on external sources from other parts of the project. This ensures that the `design-system` can be maintained as a self-contained module, which can be easily extracted or reused in other projects if necessary.

### Flexibility

This structure is intended to be scalable and adaptable, supporting the ongoing growth and evolution of the project. As

new features are added or old ones are deprecated, this structure is open to change, allowing for adjustments that better meet the needs of the development process.

Setting up your project with Atomic Design from the beginning not only aids in creating a consistent UI but also lays the groundwork for an eventual design system. If you decide to create a design system later, or if you want to reuse components across different projects, this setup allows for easy extraction of components into a shared library. You can then import code that you already know works in production without having to rewrite large portions of it. Moreover, this approach greatly enhances collaboration with UI/UX design teams, especially if they follow the same methodology and naming conventions, ensuring that design and development are always aligned.

### Best Practices for API Calls and Routing Logic

**API Calls in Components**

To maintain clean, reusable, and scalable components, it's crucial to keep concerns separated. Handle API logic with custom hooks or context, and keep routing logic outside of the UI components. This ensures that your components remain flexible and easy to maintain across various projects and environments.

**Best Practice: Separate Logic from UI Components**

It’s best to keep API calls and side effects separate from UI components to ensure reusability and maintainability. Use custom hooks or context to handle API logic.

```tsx
// src/hooks/useUserData.ts
import { useEffect, useState } from "react";

const useUserData = (userId: string) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, loading, error };
};

export default useUserData;
```

**Using the Hook in a Functional Component:**

```tsx
// src/components/design-system/organisms/profiles/UserProfile.tsx
import React from "react";
import useUserData from "../../../hooks/useUserData";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { userData, loading, error } = useUserData(userId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 border rounded-lg">
      <h2>{userData?.name}</h2>
      <p>Email: {userData?.email}</p>
      <PrimaryButton onClick={() => console.log("Button clicked!")}>
        Message
      </PrimaryButton>
    </div>
  );
};

export default UserProfile;
```

**Handling Routing Logic**

**Best Practice: Use Routing Logic Outside of UI Components**

Routing logic should be kept out of UI components to ensure they are reusable in different contexts, including non-Next.js projects.

```tsx
// src/components/design-system/molecules/navigation/NavigationLink.tsx
import React from "react";
import { useRouter } from "next/router";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";

interface NavigationLinkProps {
  label: string;
  path: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ label, path }) => {
  const router = useRouter();

  const navigate = () => {
    router.push(path);
  };

  return <PrimaryButton onClick={navigate}>{label}</PrimaryButton>;
};

export default NavigationLink;
```

**What Not to Do**

**Including API Calls Directly in UI Components**

Including API calls directly within UI components can lead to poor separation of concerns, making the component difficult to test and reuse.

```tsx
// src/components/design-system/organisms/profiles/UserProfile.tsx
import React, { useEffect, useState } from "react";

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{userData?.name}</h2>
      <p>{userData?.email}</p>
    </div>
  );
};

export default UserProfile;
```

**Including Next.js Routing Logic Directly in UI Components**

Embedding Next.js-specific routing logic directly in UI components limits their reusability in other React environments and makes them less flexible.

```tsx
// src/components/design-system/organisms/headers/MainHeader.tsx
import React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

const MainHeader: React.FC = () => {
  const router = useRouter();

  const navigateHome = () => {
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <img src="/assets/images/Bridge-logo.png" alt="Logo" className="w-32" />
      <Button onClick={navigateHome}>Home</Button>
    </header>
  );
};

export default MainHeader;
```

### Predefined Material UI Components

**Benefits of Predefining Components**

To avoid restyling a Material UI component repeatedly throughout your application, you can create a predefined styled component. This ensures consistency, reduces redundancy, and simplifies the development process.

**Creating a Predefined Button Component**

Here’s an example of how to create a predefined `PrimaryButton` component using Material UI's `styled` utility.

```tsx
// src/components/design-system/atoms/buttons/PrimaryButton.tsx
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:disabled": {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[600],
  },
}));

export default PrimaryButton;
```

**Using the `sx` Prop for Consistency**

Alternatively, you can use the `sx` prop to apply consistent styles without creating a separate component. However, this approach requires reapplying the same `sx` styles wherever the component is used.

```tsx
// src/components/design-system/organisms/headers/MainHeader.tsx
import React from "react";
import Button from "@mui/material/Button";

const MainHeader: React.FC = () => (
  <header className="flex justify-between items-center p-4 bg-white shadow-md">
    <img src="/assets/images/Bridge-logo.png" alt="Logo" className="w-32" />

    <nav className="flex gap-4">
      <Button
        sx={{
          backgroundColor: "primary.main",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          "&:disabled": {
            backgroundColor: "grey.400",
            color: "grey.600",
          },
        }}
        onClick={() => {}}
      >
        Home
      </Button>
      <Button
        sx={{
          backgroundColor: "primary.main",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          "&:disabled": {
            backgroundColor: "grey.400",
            color: "grey.600",
          },
        }}
        onClick={() => {}}
      >
        About
      </Button>
    </nav>
  </header>
);

export default MainHeader;
```
