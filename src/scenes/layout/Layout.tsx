import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Layout() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  );
}
