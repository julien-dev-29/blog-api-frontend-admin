import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const handleSubmit = async () => {

  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5">
        <div className="flex items-center gap-1 justify-between">
          <SidebarTrigger />
          <form onSubmit={handleSubmit} className="flex items-center">
            <Input
              placeholder="Search"
              name="q"
              defaultValue={params.q ?? ""}
            />
            <Button>Search</Button>
          </form>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
