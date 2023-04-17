import React from 'react';
import './OrderSummary.scss';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { ToppingsMap } from '../../../interfaces';

export default function OrderSummary({ onOrder }: any) {
  const { generalSum, deliveryPrice, foodList } = useSelector((state: RootState) => state.basket);

  return (
    <div className="order-summary-container">
      <div className="order-summary">
        <div className="order-summary-label">Order summary</div>
        <>
          {foodList.map((item) => {
            return (
              <div key={item.name}>
                <div className="product-item">
                  <div className="product-info">
                    <div className="product-name">{item.name}</div>
                    <div className="toppings-info">
                      <>{item.dough}</>
                      <>
                        {Object.keys(item.toppings).filter(
                          (elem) => item.toppings[elem as keyof ToppingsMap]
                        ).length
                          ? Object.keys(item.toppings)
                              .reduce((acc, cur) => {
                                return item.toppings[cur as keyof ToppingsMap]
                                  ? acc + cur + ', '
                                  : acc;
                              }, '. Extra toppings: ')
                              .slice(0, -2)
                          : ''}
                      </>
                    </div>
                  </div>
                  <div className="count-and-price">
                    {item.count} х £{item.costWithToppings}
                  </div>
                </div>
                <hr className="divider" />
              </div>
            );
          })}
        </>
        {deliveryPrice > 0 && (
          <div className="delivery-block">
            <div className="delivery-text">Delivery</div>
            <div className="delivery-price">£{deliveryPrice}</div>
          </div>
        )}
        <div className="total-block">
          <div className="total-text">Total</div>
          <div className="total-price">£{generalSum + deliveryPrice}</div>
        </div>
        <Button className="order-btn" onClick={onOrder}>
          Place order and pay
        </Button>
      </div>
    </div>
  );
}
