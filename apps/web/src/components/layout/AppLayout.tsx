import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, User, Calendar, FolderOpen, Settings, Bell } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }: { icon: React.ElementType; label: string; to: string }) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
        isActive
          ? 'bg-primary/8 text-primary font-medium'
          : 'text-subtext hover:bg-secondary hover:text-text'
      }`
    }
  >
    <Icon className="w-[18px] h-[18px] shrink-0" />
    <span>{label}</span>
  </NavLink>
);

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-surface flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-border">
          <span className="text-lg font-bold tracking-tight text-primary">CareerOS</span>
          <p className="text-[11px] text-subtext mt-0.5 font-medium tracking-wide uppercase">Your career workspace</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Today" to="/" />
          <SidebarItem icon={Briefcase} label="Opportunities" to="/opportunities" />
          <SidebarItem icon={FileText} label="Applications" to="/applications" />
          <SidebarItem icon={FileText} label="CV Studio" to="/cv-studio" />
          <SidebarItem icon={User} label="Career" to="/profile" />
          <SidebarItem icon={Calendar} label="Interviews" to="/interviews" />
          <SidebarItem icon={FolderOpen} label="Documents" to="/documents" />
        </nav>

        <div className="p-3 border-t border-border space-y-0.5">
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
          <div className="flex items-center gap-3 px-4 py-2.5 mt-1">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold shrink-0">GB</div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text leading-tight truncate">Gaith Basly</p>
              <p className="text-[11px] text-subtext truncate">demo@careeros.dev</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-border bg-surface flex items-center justify-end px-6 gap-3 shrink-0">
          <button className="relative p-1.5 text-subtext hover:text-text rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
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
