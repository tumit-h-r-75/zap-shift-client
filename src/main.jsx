import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './context/AuthProvider.jsx';
import "leaflet/dist/leaflet.css";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient();

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='font-urbanist bg-[#EAECED] min-h-screen'>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
