import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const AuthGuard = ({ redirectPath = '/' }: any) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
