import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Login from './pages/Login';
import Overview from './pages/Overview';

function App() {
  const [user, loadingUser] = useAuthState(getAuth());

  if (loadingUser) {
    return <p>Laster...</p>;
  } else if (!user) {
    return <Login />;
  }

  return <Overview />;
}

export default App;
