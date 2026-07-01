import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, transparentNav = false, noFooter = false }) {
  return (
    <div className="layout">
      <Navbar transparent={transparentNav} />
      <main className="main-content">{children}</main>
      {!noFooter && <Footer />}
    </div>
  );
}
