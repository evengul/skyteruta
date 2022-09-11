import { Routes, Route } from 'react-router-dom';
import Logs from '~/pages/Logs';
import Workouts from '~/pages/Workouts';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Logs />} />
      <Route path='/trening' element={<Workouts />} />
    </Routes>
  );
}
