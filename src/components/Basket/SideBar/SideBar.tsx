import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import './SideBar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface IDiscountMap {
  [key: string]: {
    value: number;
    message: string;
  };
}

const discountMap = {
  TEST: {
    value: 10,
    message: '10% discount on all gluten-free pizzas.'
  }
} as IDiscountMap;

export default function SideBar({ setCheckout }: any) {
  const [discount, setDiscount] = useState({ value: 0, message: '' });
  const [promo, setPromo] = useState('');
  const {
    generalSum: productsPrice,
    deliveryPrice,
    foodList
  } = useSelector((state: RootState) => state.basket);

  const handlePromoChange = (e: any) => {
    setPromo(e.target.value);
  };

  const handleApplyBtn = (promo: string) => {
    if (discountMap[promo]) setDiscount(discountMap[promo]);
  };

  return (
    <div className="side-bar-container">
      <div className="side-bar">
        <div className="promo">Promo code</div>
        <div className="promo-field">
          <TextField
            sx={{ width: '100%' }}
            id="outlined-basic"
            label="Enter promo code"
            variant="outlined"
            size="small"
            value={promo}
            onChange={handlePromoChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="apply-btn"
                    edge="end"
                    color="primary"
                    onClick={() => handleApplyBtn(promo)}>
                    Apply
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        {discount.value > 0 && <div className="discount-msg">{discount.message}</div>}
        <div className="product-price-block">
          <div className="products-amount">
            {foodList.length} product{foodList.length > 1 && 's'}
          </div>
          <div className="products-price">£{productsPrice}</div>
        </div>
        <hr className="divider"></hr>
        <div className="delivery-block">
          <div className="delivery-text">Delivery</div>
          <div className="delivery-price">£{deliveryPrice}</div>
        </div>
        {discount.value > 0 && (
          <>
            <hr className="divider"></hr>
            <div className="discount-block">
              <div className="discount-text">Promo code discount</div>
              <div className="discount-value">−£{(productsPrice * discount.value) / 100}</div>
            </div>
          </>
        )}
        <hr className="divider"></hr>
        <div className="total-block">
          <div className="total-text">Total</div>
          <div className="total-price">
            £{productsPrice + deliveryPrice - (productsPrice * discount.value) / 100}
          </div>
        </div>
        <Button className="checkout-btn" onClick={() => setCheckout(true)}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
