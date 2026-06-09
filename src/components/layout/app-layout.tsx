import { Sidebar } from "./sidebar";

export function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">

  <Sidebar />

  {/* Main content */}
  <main className="ml-64 flex-1 p-6 bg-white dark:bg-gray-950">
    {children}
  </main>

</div>
    
  );
}