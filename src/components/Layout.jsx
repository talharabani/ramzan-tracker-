import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-islamic-beige">
      <Navbar />
      <main className="pb-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
