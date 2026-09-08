import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, User, Calendar, FolderOpen, Settings, Bell } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }: { icon: any, label: string, to: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${
        isActive
          ? 'bg-secondary text-primary font-medium'
          : 'text-subtext hover:bg-gray-50 hover:text-text'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </NavLink>
);

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-primary">CareerOS</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Today" to="/" />
          <SidebarItem icon={Briefcase} label="Opportunities" to="/opportunities" />
          <SidebarItem icon={FileText} label="Applications" to="/applications" />
          <SidebarItem icon={FileText} label="CV Studio" to="/cv-studio" />
          <SidebarItem icon={User} label="Career" to="/profile" />
          <SidebarItem icon={Calendar} label="Interviews" to="/interviews" />
          <SidebarItem icon={FolderOpen} label="Documents" to="/documents" />
        </nav>
        
        <div className="p-4 border-t border-border">
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border bg-surface flex items-center justify-end px-6">
          <button className="p-2 text-subtext hover:text-text rounded-full hover:bg-secondary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="ml-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm">
            GB
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
