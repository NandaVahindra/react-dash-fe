import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Navigation, Router } from '@toolpad/core';
import { DashboardPage } from './views/dashboard';
import { InfoPage } from './views/info';

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'Info',
    title: 'Info',
    icon: <InfoIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#edf5f9',  // Light gray background
          paper: '#ffffff',     // White paper background
        },
        text: {
          primary: '#333333',  // Dark gray for text
          secondary: '#666666', // Lighter gray for secondary text
        },
        primary: {
          main: '#e20012',  // Primary color
          light: '#e20012', // Lighter shade for hover effect
          dark: '#e20012',  // Darker shade for active effect
        },
        divider: 'transparent',     // Transparent for dividers
      },
    },
    dark: {
      palette: {
        background: {
          default: '#0A111D',  // Dark gray background
          paper: '#0e1728',    // Slightly lighter gray for surfaces like cards
        },
        text: {
          primary: '#e5e5e5',  // Light gray for text
          secondary: '#e5e5e5', // Lighter gray for secondary text
        },
        primary: {
          main: '#ffffff',  // White primary color (corrected from '#fffff')
        },
        divider: 'transparent',     // Transparent for dividers
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function DemoPageContent({ pathname }: { pathname: string }) {
  if (pathname === '/dashboard') {
    return <DashboardPage />;
  }
  if ( pathname === '/Info') {
    return <InfoPage />;
  }
  return (
    <DashboardPage />);
}



export default function DashboardLayoutBranding(props: any) {

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);


  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Telkomsel_2021_icon.svg" alt="MUI logo" />,
        title: '',
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
