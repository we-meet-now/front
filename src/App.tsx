import './reset.css';
import { Router } from './router';
import { MobileLayout } from './ui/layout/mobile-layout';

function App() {
  return (
    <MobileLayout>
      <Router />
    </MobileLayout>
  );
}

export default App;
