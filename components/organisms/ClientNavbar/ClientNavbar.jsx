import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

const ClientNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathname = usePathname();

  const pageItems = [
    {
      name: 'Home',
      path: '/home',
    },
    {
      name: 'Basket',
      path: '/basket',
    },
    {
      name: 'Order',
      path: '/order',
    },
  ];

  const router = useRouter();

  const fetchLogout = async () => {
    try {
      await axiosInstance.delete('/users/logout');
      deleteCookie('token');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    fetchLogout();
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit text-primary">TOKOKU</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit text-primary">TOKOKU</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {pageItems.map(({ name, path }) => (
          <NavbarItem key={name} isActive={path.includes(currentPathname)}>
            <Link href={path}>{name}</Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Button color="danger" variant="faded" onClick={handleLogout}>
            logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {pageItems.map(({ name, path }) => (
          <NavbarMenuItem key={name} isActive={path.includes(currentPathname)}>
            <Link href={path}>{name}</Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button color="danger" variant="faded" onClick={handleLogout}>
            logout
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default ClientNavbar;
