import App from "../App.tsx";
import { createBrowserRouter } from "react-router";
import PostsLists from "../components/posts/posts-list.tsx";
import PostsCreate from "../components/posts/posts-create.tsx";
import Login from "../components/auth/login.tsx";
import Home from "../components/home/index.tsx";
import { authMiddleware } from "../middlewares/auth.tsx";
import CategoriesList from "../components/categories/index.tsx";
import CategoriesCreate from "../components/categories/categories-create.tsx";
import TagsList from "../components/tags/index.tsx";
import TagsCreate from "../components/tags/tags-create.tsx";
import CategoriesEdit from "@/components/categories/categories-edit.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        middleware: [authMiddleware],
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "posts",
                children: [
                    { index: true, Component: PostsLists },
                    { path: "create", Component: PostsCreate },
                    { path: ":id/edit", Component: PostsCreate },
                ],
            },
            {
                path: "categories",
                children: [
                    { index: true, Component: CategoriesList },
                    { path: "create", Component: CategoriesCreate },
                    { path: ":id", Component: CategoriesEdit },
                ],
            },
            {
                path: "tags",
                children: [
                    { index: true, Component: TagsList },
                    { path: "create", Component: TagsCreate },
                    { path: ":id/edit", Component: TagsCreate },
                ],
            },
        ],
    },
    { path: "auth", Component: Login },
]);