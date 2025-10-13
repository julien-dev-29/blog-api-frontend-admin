import { Outlet } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Layout from "./layouts/layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
