import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SolDripIcon from "@/assets/logo.svg";
import { Container } from "@/components/container";
import { NAVIGATION } from "@/constants/navigation";
import type { Navigation } from "@/types/navigations";
import { Link, useLocation } from "react-router-dom";
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string, event: React.MouseEvent) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      event.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else if (href === '/' && location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const handleBuyNow = () => {
    window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-${VITE_DRIP_TOKEN_ADDRESS}`, '_blank');
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Desktop Header */}
      <Container className="hidden justify-between items-center py-7 md:flex">
        <Link to="/" className="flex items-center">
          <img src={SolDripIcon} alt="SolDrip logo" />
        </Link>
        <nav className="flex items-center space-x-7">
          {NAVIGATION.map((item: Navigation) => (
            <Link
              to={item.href}
              key={item.label}
              className="text-lg text-white transition-colors hover:text-primary"
              onClick={(e) => handleNavClick(item.href, e)}
            >
              {item.label}
            </Link>
          ))}
          <Button onClick={handleBuyNow} className="text-lg font-semibold transition-opacity x-3 bg-gradient-primary hover:opacity-90">
            Buy Now
          </Button>
        </nav>
      </Container>

      {/* Mobile Header */}
      <div className="md:hidden">
        <Container className="flex justify-between items-center py-7">
          <Link to="/" className="flex items-center">
            <img src={SolDripIcon} alt="SolDrip logo" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent"
            onClick={toggleMenu}
          >
            <MenuIcon className="!h-6 !w-6 text-white" />
          </Button>
        </Container>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute px-4 py-6 w-full h-auto border-y bg-background border-border/20">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION.map((item: Navigation) => (
                <Link
                  to={item.href}
                  key={item.label}
                  className="py-2 text-lg text-white transition-colors hover:text-primary"
                  onClick={(e) => handleNavClick(item.href, e)}
                >
                  {item.label}
                </Link>
              ))}
              <Button onClick={handleBuyNow} className="w-full font-semibold transition-opacity bg-gradient-primary hover:opacity-90">
                Buy Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 