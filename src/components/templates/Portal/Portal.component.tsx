import React, { useState, useMemo, MouseEvent } from 'react';
import { Drawer, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
interface PortalTab  {
  label: string;
  route: {
    path: string;
  };
  icon: string;
};

interface PortalProps {
  tabs?: PortalTab[];
  user?: {
    first_name: string,
    email: string,
    last_name: string,
  },
  logout?: () => void;
};

const Portal: React.FC<PortalProps> = (props) => {
    const {tabs = [], logout, user = {
        first_name: "Unknown",
        last_name: "Name",
        email: "",
    }} = props;
const {first_name, last_name, email} = user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const activeChildRoute = pathname.split('/').pop();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  
  const openMenu = (event: MouseEvent<HTMLDivElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const closeMenu = () => setMenuAnchorEl(null);

  const memoizedTabs = useMemo(() => (
    tabs.map((tab, index) => (
      <Link
        key={index}
        href={`/portal/${tab.route.path}`}
        passHref
        className={`group w-full p-4 flex items-center justify-start gap-2 rounded-lg cursor-pointer hover:bg-gray-200 ${activeChildRoute === tab.route.path ? 'bg-gray-200' : ''}`}
      >
        <div className={`w-6 h-6 flex items-center justify-center p-1 ${activeChildRoute === tab.route.path ? 'text-bridge-black' : 'text-gray-400'}`}>
          <svg width="100%" height="100%">
            <use href={`/assets/icons/${tab.icon}.svg#${tab.icon}`} />
          </svg>
        </div>
        <p className={`text-[16px] ${activeChildRoute === tab.route.path ? 'font-bold text-bridge-black' : 'font-semibold text-gray-400'}`}>
          {tab.label}
        </p>
      </Link>
    ))
  ), [tabs, activeChildRoute]);

  return (
    <div className="flex flex-col md:flex-row items-start relative h-screen w-screen">
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <div className="box-border flex flex-col gap-24 py-5 px-6">
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center justify-between w-full min-w-[300px]">
              <img className="max-w-[100px]" alt="Bridge Financial logo" src="/assets/images/Bridge-logo.png" />
              <IconButton onClick={toggleDrawer}>
                <span className="material-icons">close</span>
              </IconButton>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-start gap-5">
              <Avatar
      sx={{ width: 64, height: 64, bgcolor: 'gray.50' }} // 64px is equivalent to 16 in tailwind (w-16, h-16)
    >
      <PersonIcon />
    </Avatar>                <div className="space-y-1">
                  <p>
                    <strong>
                      {first_name} {last_name}
                    </strong>
                  </p>
                  <p>{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                <span className="material-icons" color="secondary">logout</span>
                <p className="no-underline text-bridge-black">Log out</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-stretch justify-start gap-1">
            {memoizedTabs}
          </div>
        </div>
      </Drawer>
      <div className="h-screen w-screen flex flex-col md:flex-row items-stretch justify-stretch">
        <div className="sticky w-screen top-0 md:hidden bg-white">
          <div className="w-full grid grid-cols-3 p-4">
            <div>
              <IconButton onClick={toggleDrawer}>
                <span className="material-icons">menu</span>
              </IconButton>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/" passHref>
                <img className="max-w-[100px]" alt="Bridge Financial logo" src="/assets/images/Bridge-logo.png" />
              </Link>
            </div>
            <div></div>
          </div>
          <div className="w-full h-[3px] linear-gradient-orange-purple-blue"></div>
        </div>
        <div className="h-full grow-0 hidden md:flex flex-col basis-[250px] box-border py-7 px-5 bg-white border-0 border-r border-solid border-gray-300">
          <Link href="/" passHref className="mx-auto mb-16">
            <img className="max-w-[120px]" alt="Bridge logo" src="/assets/images/Bridge-logo.png" />
          </Link>
          <div className="flex flex-col w-full items-stretch justify-start gap-1">
            {memoizedTabs}
          </div>
        </div>
        <div className="grow bg-gray-50 w-full overflow-auto">
          <div className="w-full max-w-[1200px] px-4 py-8 md:px-10 md:py-6 box-border">
            <div className="flex items-center justify-between w-full text-bridge-black py-2">
              <h1>{activeChildRoute ? activeChildRoute[0].toUpperCase() + activeChildRoute.slice(1) : ''}</h1>
              <div className="hidden md:flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200" onClick={openMenu}>
                <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center">
                  <Avatar>
                    {first_name? first_name[0]: null}
                  </Avatar>
                </div>
                <span className="material-icons" color="secondary">keyboard_arrow_down</span>
              </div>
              <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={closeMenu}>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </div>
            <div>
              {/* Next.js Page Content Goes Here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
