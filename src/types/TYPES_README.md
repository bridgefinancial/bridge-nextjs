

# `types` Folder

## Overview

The `types` folder is dedicated to storing TypeScript types, interfaces, and enums that are shared across multiple components or modules in your project. By centralizing these definitions, you can avoid circular dependencies and ensure consistency across your codebase.

### Naming Conventions

To maintain clarity and organization, adhere to the following naming conventions for files in the `types` folder:

- **`.types.ts`**: Use this extension for general types that are used throughout the project.
- **`.type.ts`**: Another option for general types, similar to `.types.ts`.
- **`.interface.ts`**: Use this extension for interfaces that define object shapes and are used across multiple components.
- **`.interfaces.ts`**: Similar to `.interface.ts`, but for files with multiple interfaces.
- **`.enum.ts`**: Use this extension for enum definitions that are reused in various parts of the application.

### Purpose

- **Shared Types**: Centralize types that are used in multiple components or modules to avoid redundancy and maintain a single source of truth.
- **Avoid Circular Dependencies**: Prevent circular dependencies that can occur when types are imported from one component to another repeatedly.
- **Consistency**: Ensure consistency in type definitions and improve maintainability by using common types and enums across the project.

### Examples

Here are some examples of how to structure types, interfaces, and enums in the `types` folder:

#### 1. **Enum Example**

**File: `route-path.enum.ts`**

```typescript
// Enum for defining route paths in Next.js
export enum RoutePath {
  HOME = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile',
}
```

**Usage:**

```typescript
import { RoutePath } from '../types/route-path.enum';

const loginUrl = RoutePath.LOGIN;
```

#### 2. **Interface Example**

**File: `user.interface.ts`**

```typescript
// Interface for User object
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
```

**Usage:**

```typescript
import { User } from '../types/user.interface';

const fetchUser = async (id: string): Promise<User> => {
  // Fetch user logic
};
```

#### 3. **Type Example**

**File: `api-response.type.ts`**

```typescript
// Type for API response structure
export type ApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};
```

**Usage:**

```typescript
import { ApiResponse } from '../types/api-response.type';

const handleApiResponse = (response: ApiResponse<User>) => {
  if (response.error) {
    // Handle error
  } else {
    // Handle success
    const user = response.data;
  }
};
```

### Best Practices

- **Organize by Feature**: Group related types and interfaces in subdirectories if needed. For example, you might have a `user` subdirectory for all user-related types.
- **Keep It Clean**: Avoid adding types that are only used in one component to the `types` folder. Those should be defined within the component or module where they are used.
- **Document Types**: Provide clear comments and documentation within your type definitions to help other developers understand their purpose and usage.

By following these guidelines and conventions, you'll keep your types and interfaces organized, reducing complexity and improving the maintainability of your project.


