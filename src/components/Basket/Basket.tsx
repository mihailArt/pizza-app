import './Basket.scss';
import BasketElement from './BasketElement/BasketElement';
import { useDispatch } from 'react-redux';
import EmptyBasket from './EmptyBasket/EmptyBasket';
import { useCallback, useEffect, useState } from 'react';
import SideBar from './SideBar/SideBar';
import Checkout from './Checkout/Checkout';
import OrderSummary from './SideBar/OrderSummary/OrderSummary';
import { reset } from '../../store/basketSlice';
import { useNavigate } from 'react-router-dom';

export default function Basket({
  saveOrder,
  updateBasket,
  id,
  foodList,
  generalSum,
  deliveryPrice,
  basketId,
  isLoggedIn
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    if (canUpdate) {
      console.log('updateBasket');
      updateBasket({
        id: basketId,
        data: {
          basketList: foodList
        }
      });
      setCanUpdate(false);
    }
  }, [foodList]); // eslint-disable-line react-hooks/exhaustive-deps

  const [checkout, setCheckout] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [address, setAddress] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  const onOrder = useCallback(() => {
    if (!orderBy.length) setErrorName(true);
    if (!address.length) setErrorAddress(true);

    if (orderBy.length && address.length) {
      saveOrder({
        order: {
          userId: id,
          foodList,
          orderSum: generalSum + deliveryPrice,
          orderBy,
          address,
          status: 'pending'
        }
      });
      dispatch(reset());
      updateBasket({
        id: basketId,
        data: {
          basketList: []
        }
      });
      navigate('/user');
    }
  }, [
    address,
    basketId,
    deliveryPrice,
    dispatch,
    foodList,
    generalSum,
    id,
    navigate,
    orderBy,
    saveOrder,
    updateBasket
  ]);
  return (
    <>
      <div className="basket">
        {isLoggedIn ? (
          checkout ? (
            <>
              <Checkout
                errorName={errorName}
                setErrorName={setErrorName}
                errorAddress={errorAddress}
                setErrorAddress={setErrorAddress}
                setOrderBy={setOrderBy}
                setAddress={setAddress}
              />
              <OrderSummary onOrder={onOrder} />
            </>
          ) : foodList.length > 0 ? (
            <>
              <div className="basket-content">
                <h3 className="basket-label">Basket</h3>
                {foodList.map((elem: any, index: any) => {
                  return <BasketElement key={index} {...elem} setCanUpdate={setCanUpdate} />;
                })}
              </div>
              <SideBar setCheckout={setCheckout} />
            </>
          ) : (
            <EmptyBasket />
          )
        ) : (
          <div> Please log in to add products to basket</div>
        )}
      </div>
    </>
  );
}
