import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Login from './pages/Login';
import Container from './components/container/Container';
import AppRouter from './components/container/AppRouter';

function App() {
  const [user, loadingUser] = useAuthState(getAuth());

  if (loadingUser) {
    return <p>Laster...</p>;
  } else if (!user) {
    return <Login />;
  }

  return (
    <Container>
      <AppRouter />
    </Container>
  );
}

export default App;
