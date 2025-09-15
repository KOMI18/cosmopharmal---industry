"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStores";
import { useRouter, usePathname } from "next/navigation";
// import { Sidebar } from "@/components/ui/layout/sidebar";
import { motion } from "framer-motion";

interface MySpaceLayoutProps {
  children: React.ReactNode;
}

export default function MySpaceLayout({ children }: MySpaceLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, admin } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Routes qui ne nécessitent pas d'authentification
  const publicRoutes = ["/", "/auth/login", "/auth/register", "/about", "/contact"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Redirection si non authentifié sur route protégée
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/auth/login");
  //   }
  // }, [isAuthenticated]);

  // Gestion responsive de la sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pour les routes publiques ou si non authentifié, pas de sidebar
  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-10">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {/* <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {getPageTitle(pathname)}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Vous tes connect  comme {admin?.name}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h5v14z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
                  <p className="text-xs text-gray-500">user</p>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={
                   
                      `https://ui-avatars.com/api/?background=43b495&color=fff&name=${admin?.name?.slice(0, 2)?.toUpperCase()}`
                    }
                    alt={admin?.name ?? ""}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
}

// Helper functions pour les titres de page
function getPageTitle(pathname: string): string {
  const titles: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/chat": "Chat",
    "/settings": "Paramètres",
    
  };
  return titles[pathname] || "Dashboard";
}

