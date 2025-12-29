import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { ModeToggle } from "../components/mode-toggle";
export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const handleSubmit = async () => {};
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5">
        <div className="flex items-center gap-1 justify-between">
          <SidebarTrigger />
          <div className="flex gap-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <Input
                placeholder="Search"
                name="q"
                defaultValue={params.q ?? ""}
              />
              <Button>Search</Button>
            </form>
            <ModeToggle />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
