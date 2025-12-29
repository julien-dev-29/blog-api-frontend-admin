# GEMINI.md

## Project Overview

This project is the admin frontend for a blog, built with React, Vite, and TypeScript. It provides a user interface for managing blog posts, categories, and tags.

The project uses a modern UI stack, including:

*   **UI Framework:** [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives and Tailwind CSS for styling.
*   **Routing:** React Router for navigation.
*   **Form Handling:** Zod for data validation.
*   **Table:** TanStack Table for displaying data in tables.
*   **Rich Text Editor:** Tiptap for creating and editing blog posts.
*   **Icons:** Lucide for icons.

The application features a sidebar for navigation, a main content area for displaying data and forms, and a search bar for finding content.

## Building and Running

To get started with the project, follow these steps:

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server and open the application in your browser at `http://localhost:5173`.

3.  **Build for production:**

    ```bash
    npm run build
    ```

    This will create a `dist` directory with the production-ready files.

4.  **Preview the production build:**

    ```bash
    npm run preview
    ```

    This will start a local server to preview the production build.

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **Components:** Components are organized by feature in the `src/components` directory. Reusable UI components are located in `src/components/ui`.
*   **State Management:** The project uses React's built-in state management features (`useState`, `useReducer`, `useContext`). For more complex state, a library like Zustand or Redux could be integrated.
*   **Routing:** Routing is handled by React Router. Routes are defined in the `src/routes/router.ts` file.
*   **Linting:** The project uses ESLint to enforce code quality. You can run the linter with `npm run lint`.
*   **Authentication:** The project has a basic authentication setup with a login page and a middleware to protect routes. The authentication logic can be found in `src/lib/auth.tsx` and `src/middlewares/auth.tsx`.
