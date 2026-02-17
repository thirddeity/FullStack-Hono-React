import { ThemeProvider } from "./components/theme-provider";
import { ComponentExample } from "./modules/login/page";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ComponentExample />
    </ThemeProvider>
  );
}

export default App;
