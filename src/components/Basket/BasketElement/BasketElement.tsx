import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import productImage from '../../../img/grid/product_image.png';
import deleteIcon from '../../../img/icons/deleteIcon.png';
import minusIcon from '../../../img/icons/minusIcon.png';
import plusIcon from '../../../img/icons/plusIcon.png';
import { decreaseCount, deleteFood, increaseCount } from '../../../store/basketSlice';
import { IBasketElement, ToppingsMap } from '../../interfaces';
import './BasketElement.scss';
import { Dispatch, SetStateAction } from 'react';

interface IBasketElementProps extends IBasketElement {
  setCanUpdate: Dispatch<SetStateAction<boolean>>;
}

export default function BasketElement({
  name,
  dough,
  count,
  sum,
  toppings,
  setCanUpdate
}: IBasketElementProps) {
  const dispatch = useDispatch();
  return (
    <div className="basket-elem">
      <div className="basket-elem-info-block">
        <img src={productImage} alt="" className="basket-elem-img" />
        <div className="basket-elem-info">
          <div className="basket-elem-title">{name}</div>
          <div className="basket-elem-dough">{dough}</div>
          <div className="basket-elem-toppings">
            {Object.keys(toppings).filter((elem) => toppings[elem as keyof ToppingsMap]).length
              ? Object.keys(toppings)
                  .reduce((acc, cur) => {
                    return toppings[cur as keyof ToppingsMap] ? acc + cur + ', ' : acc;
                  }, 'Extra toppings: ')
                  .slice(0, -2)
              : ''}
          </div>
        </div>
      </div>
      <div className="basket-elem-func-block">
        <div className="basket-elem-counter">
          <div
            className="minus-btn"
            onClick={() => {
              dispatch(decreaseCount(name));
              setCanUpdate(true);
            }}>
            <img src={minusIcon} alt="" />
          </div>
          <div className="basket-elem-count">{count}</div>
          <div
            className="plus-btn"
            onClick={() => {
              dispatch(increaseCount(name));
              setCanUpdate(true);
            }}>
            <img src={plusIcon} alt="" />
          </div>
        </div>
        <div className="basket-elem-cost">£{sum}</div>
        <IconButton
          className="delete-icon"
          onClick={() => {
            dispatch(deleteFood(name));
            setCanUpdate(true);
          }}>
          <img src={deleteIcon} alt="" />
        </IconButton>
      </div>
    </div>
  );
}
