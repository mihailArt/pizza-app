import productImage from '../../img/grid/product_image.png';
import Button from '@mui/material/Button';
import './ProductCard.scss';
import { Food } from '../interfaces';
import PizzaModal from '../PizzaModal/PizzaModal';
import LoginModal from '../AuthModal/LoginModal/LoginModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ProductCard(product: Food) {
  const [open, setOpen] = useState(false);
  const userAuth = useSelector((state: RootState) => state.user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card">
      <img src={productImage} alt="" />
      <div className="card-info">
        <div className="name-product">{product.name}</div>
        <div>
          <div className="cost">From £{product.cost}</div>
          <Button variant="contained" className="btn" onClick={handleOpen}>
            <div className="btn-text">I want one</div>
          </Button>
        </div>
      </div>
      {userAuth.isLoggedIn ? (
        <PizzaModal isOpen={open} onClose={handleClose} foodElem={product} />
      ) : (
        <LoginModal isOpen={open} onClose={handleClose} />
      )}
    </div>
  );
}
