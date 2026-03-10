import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './router';
import { MobileLayout } from './ui/layout/mobile-layout';

import './reset.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MobileLayout>
        <Router />
      </MobileLayout>
    </QueryClientProvider>
  );
}

export default App;
