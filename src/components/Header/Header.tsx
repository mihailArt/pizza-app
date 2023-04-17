import logo from '../../img/logo.svg';
import cart from '../../img/cart.svg';
import userImg from '../../img/user.svg';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import LoginModal from '../AuthModal/LoginModal/LoginModal';
import { useEffect, useState } from 'react';
import { setLoggedUser } from '../../store/userSlice';
import { setBasket } from '../../store/basketSlice';
import { useGetUserByIdQuery, useLoginMutation } from '../../api/apiBack';
import { useGetBasketQuery } from '../../api/apiJS';

//todo: temporary solution for logout
const logout = () => {
  try {
    localStorage.clear();
    window.location.reload();
  } catch (error) {
    return null;
  }
};

export default function Header({ user }: any) {
  const { isLoggedIn, id, userName, phoneNumber } = user;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const foodList = useSelector((state: RootState) => state.basket.foodList);

  const [login, { isSuccess: isLoginSuccess, data: loginResponse }] = useLoginMutation();
  const { data: getUserResponse, isSuccess: isGetUserSuccess } = useGetUserByIdQuery(id, {
    skip: isLoginSuccess || !id
  });

  const { data: basketResponse, isSuccess: isGetBasketSuccess } = useGetBasketQuery(
    (getUserResponse && getUserResponse.basketId) || (loginResponse && loginResponse.user.basketId),
    {
      skip:
        !(getUserResponse && getUserResponse.basketId) &&
        !(loginResponse && loginResponse.user.basketId)
    }
  );

  useEffect(() => {
    if (isLoginSuccess) {
      console.log('login');
      dispatch(
        setLoggedUser({
          id: loginResponse.user.id,
          name: loginResponse.user.name,
          phone: loginResponse.user.phone,
          email: loginResponse.user.email,
          basketId: loginResponse.user.basketId || null
        })
      );
      localStorage.setItem('accessToken', JSON.stringify(loginResponse.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(loginResponse.refreshToken));
      localStorage.setItem('userId', JSON.stringify(loginResponse.user.id));
    }
  }, [loginResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isGetUserSuccess) {
      console.log('getUser');
      dispatch(
        setLoggedUser({
          name: getUserResponse.name,
          phone: getUserResponse.phone,
          email: getUserResponse.email,
          basketId: getUserResponse.basketId || null
        })
      );
    }
  }, [isGetUserSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isGetBasketSuccess) {
      console.log('getBasket');
      dispatch(setBasket(basketResponse.basketList));
    }
  }, [isGetBasketSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <div className="navbar">
          <img src={logo} alt="logo" onClick={() => navigate('/')} />
          <ul className="navbar-list">
            <li>
              <a href="/">Pizza</a>
            </li>
            <li>
              <a href="/">Drinks</a>
            </li>
            <li>
              <a href="/">Desserts</a>
            </li>
            <li>
              <a href="/">Sauses</a>
            </li>
          </ul>
        </div>
        <div className="info">
          {isLoggedIn && <div className="number">{phoneNumber}</div>}
          {isLoggedIn && (
            <div className="cart" onClick={() => navigate('basket')}>
              <img src={cart} alt="cart" className="cart-image" />
              {foodList.length > 0 && <span className="cart-badge">{foodList.length}</span>}
            </div>
          )}
          <div className="user" onClick={isLoggedIn ? logout : handleOpen}>
            <img src={userImg} alt="user" className="user-img" />
            {isLoggedIn ? <span>{userName}</span> : <span>Log in</span>}
          </div>

          <LoginModal isOpen={open} onClose={handleClose} login={login} />
        </div>
      </header>
    </div>
  );
}
