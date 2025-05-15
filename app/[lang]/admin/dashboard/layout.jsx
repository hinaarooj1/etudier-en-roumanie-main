import Header from "@/components/admin/header";
import "../../../../styles/globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    // <html
    < >
      {/* <body> */}
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full flex-1 flex-col">
            <Header />
            <main className="flex w-full flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
              <Toaster />
            </main>
          </div>
        </SidebarProvider>
      {/* </body> */}
    </>
  );
}
