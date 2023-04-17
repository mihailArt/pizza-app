import './EmptyBasket.scss';
import menuImage from '../../../img/menu_image.png';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmptyBasket() {
  const navigate = useNavigate();
  return (
    <div className="empty-basket">
      <img className="empty-basket-img" src={menuImage} alt="" />
      <div className="empty-basket-label">Your basket is empty</div>
      <div className="empty-basket-text">It&apos;s time to add some pizza to it.</div>
      <Button variant="contained" className="btn" onClick={() => navigate('/')}>
        <div className="btn-text">Shop now</div>
      </Button>
    </div>
  );
}
