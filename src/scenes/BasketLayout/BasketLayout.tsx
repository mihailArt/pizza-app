import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSaveOrderMutation, useUpdateBasketMutation } from '../../api/apiJS';
import Basket from '../../components/Basket/Basket';

export default function BasketLayout() {
  const { isLoggedIn, id, basketId } = useSelector((state: RootState) => state.user);
  const { foodList, deliveryPrice, generalSum } = useSelector((state: RootState) => state.basket);
  const [updateBasket] = useUpdateBasketMutation();
  const [saveOrder] = useSaveOrderMutation();

  return (
    <Basket
      saveOrder={saveOrder}
      updateBasket={updateBasket}
      id={id}
      foodList={foodList}
      generalSum={generalSum}
      deliveryPrice={deliveryPrice}
      basketId={basketId}
      isLoggedIn={isLoggedIn}
    />
  );
}
