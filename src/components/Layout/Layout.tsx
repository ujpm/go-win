import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f2f5f8]">
      <Sidebar />
      <Topbar />
      <main className="pl-[72px] pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
