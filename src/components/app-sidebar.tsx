import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Newspaper, TagIcon } from "lucide-react";
import { NavLink } from "react-router";
import { isAuthenticated } from "@/lib/auth";
import { NavUser } from "./nav-user";
import { IconCategory2 } from "@tabler/icons-react";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: Newspaper,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: IconCategory2,
  },
  {
    title: "Tags",
    url: "/tags",
    icon: TagIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex">Blog Administration</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated() && (
          <NavUser
            user={{
              name: "jurol",
              avatar: "avatar",
              email: "jurol@jurol.com",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
