import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SolDripIcon from "@/assets/logo.svg";
import { Container } from "@/components/container";
import { NAVIGATION } from "@/constants/navigation";
import type { Navigation } from "@/types/navigations";
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Desktop Header */}
      <Container className="items-center justify-between hidden py-7 md:flex">
        <a href="#" className="flex items-center">
          <img src={SolDripIcon} alt="SolDrip logo" />
        </a >
        <nav className="flex items-center space-x-7">
          {NAVIGATION.map((item: Navigation) => (
            <a href={item.href} key={item.label} className="text-lg text-white transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
          <Button className="text-lg font-semibold transition-opacity x-3 bg-gradient-primary hover:opacity-90">
            Buy Now
          </Button>
        </nav>
      </Container>

      {/* Mobile Header */}
      <div className="md:hidden">
        <Container className="flex items-center justify-between py-7">
          <a href="#" className="flex items-center">
            <img src={SolDripIcon} alt="SolDrip logo" />
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-transparent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon className="!h-6 !w-6 text-white" />
          </Button>
        </Container>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute w-full h-auto px-4 py-6 border-y bg-background border-border/20">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION.map((item: Navigation) => (
                <a href={item.href} key={item.label} className="py-2 text-lg text-white transition-colors hover:text-primary">
                  {item.label}
                </a>
              ))}
              <Button className="w-full font-semibold transition-opacity bg-gradient-primary hover:opacity-90">
                Buy Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 