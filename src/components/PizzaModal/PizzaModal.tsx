import ReactDOM from 'react-dom';
import { Button, IconButton } from '@mui/material';
import './PizzaModal.scss';
import productImage from '../../img/grid/product_image.png';
import closeIcon from '../../img/icons/closeIcon.png';
import ingredient from '../../img/ingredient.png';
import React, { useEffect, useState } from 'react';
import { addFood } from '../../store/basketSlice';
import { setBasketId } from '../../store/userSlice';
import { Food, IBasketElement, NutritionalInformation, ToppingsMap } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateBasketMutation, useSetBasketMutation } from '../../api/apiJS';
import { useLinkBasketToUserMutation } from '../../api/apiBack';
import { RootState } from '../../store';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodElem: Food;
}

const Dough = {
  gluten: 'Gluten-free',
  neapolitan: 'Neapolitan dough'
};

const initToppings = {
  parmesan: false,
  pepperoni: false,
  mushrooms: false,
  onion: false,
  pepper: false,
  jalapeno: false,
  tomatoes: false,
  ham: false
} as ToppingsMap;

export default function PizzaModal({ isOpen, onClose, foodElem }: ModalProps) {
  const dispatch = useDispatch();
  const [cost, setCost] = useState(foodElem.cost);
  const [toppings, setToppings] = useState(initToppings);
  const [dough, setDough] = useState(Dough.neapolitan);

  const handleToppingsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const toppingChecked = e.target.checked;
    setToppings((toppings) => ({
      ...toppings,
      [e.target.id]: !toppings[e.target.id as keyof ToppingsMap]
    }));
    toppingChecked ? setCost(cost + 1.5) : setCost(cost - 1.5);
  };

  const handleDoughChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDough(e.target.id === 'neapolitan' && e.target.checked ? Dough.neapolitan : Dough.gluten);
  };

  const { id, basketId } = useSelector((state: RootState) => state.user);
  const foodList = useSelector((state: RootState) => state.basket.foodList);

  const [setBasket, { isSuccess, data: basketResponse }] = useSetBasketMutation();
  const [updateBasket] = useUpdateBasketMutation();
  const [linkBasketToUser] = useLinkBasketToUserMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log('pizza modal');
      dispatch(setBasketId(basketResponse.id));
      linkBasketToUser({ userId: id, basketId: basketResponse.id });
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const onButtonClick = () => {
    const basketElem = {
      ...foodElem,
      dough,
      sum: cost,
      costWithToppings: cost,
      count: 1,
      toppings
    };
    const basketList = [...foodList, basketElem];

    if (basketId) {
      updateBasket({
        id: basketId,
        data: {
          basketList
        }
      });
    } else {
      setBasket({
        basketList
      });
    }
    dispatch(addFood(basketElem as IBasketElement));
  };

  return ReactDOM.createPortal(
    isOpen && (
      <div className="modal-root">
        <div className="pizza-modal">
          <div className="pizza-modal-right">
            <img className="food-image" src={productImage} alt="" />
            <div className="ingredients">
              <p>Ingredients list</p>
              <div className="ingredients-list">{foodElem.ingredientsList}</div>
            </div>
            <div className="nutritional-information">
              <p>Nutritional information per 100 g</p>
              <div className="nutrition-elements">
                {Object.keys(foodElem.nutritionalInformation).map((elem, index, arr) => (
                  <div key={index} className="nutrition-elem">
                    <div>
                      {elem} :
                      {foodElem.nutritionalInformation[elem as keyof NutritionalInformation]}
                    </div>
                    {index !== arr.length - 1 && <div className="gray-dot"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pizza-modal-left">
            <h5>{foodElem.name}</h5>
            <div className="weight">{foodElem.weight} g</div>
            <div className="radio-btn">
              <div className="button">
                <input
                  type="radio"
                  id="neapolitan"
                  name="radio-group"
                  defaultChecked={true}
                  onChange={handleDoughChange}
                />
                <label className="left" htmlFor="neapolitan">
                  {Dough.neapolitan}
                </label>
              </div>
              <div className="button">
                <input type="radio" id="gluten" name="radio-group" onChange={handleDoughChange} />
                <label className="right" htmlFor="gluten">
                  {Dough.gluten}
                </label>
              </div>
            </div>
            <div className="toppings">
              <div className="toppings-label">Extra toppings</div>
              <div className="toppings-price">£1.50 for any ingredient.</div>
              <div className="toppings-list">
                <div className="toppings-row">
                  {Object.keys(toppings)
                    .slice(0, 4)
                    .map((elem, index, arr) => (
                      <div
                        key={elem}
                        className={'topping' + (index === arr.length - 1 ? ' last' : '')}>
                        <input
                          type="checkbox"
                          id={elem}
                          name={elem}
                          onChange={handleToppingsChange}
                        />
                        <label htmlFor={elem}>
                          <img className="ingredient-image" src={ingredient} alt="" />
                          {elem.charAt(0).toUpperCase() + elem.slice(1)}
                        </label>
                      </div>
                    ))}
                </div>
                <div className="toppings-row">
                  {Object.keys(toppings)
                    .slice(4, 8)
                    .map((elem, index, arr) => (
                      <div
                        key={elem}
                        className={'topping' + (index === arr.length - 1 ? ' last' : '')}>
                        <input
                          type="checkbox"
                          id={elem}
                          name={elem}
                          onChange={handleToppingsChange}
                        />
                        <label htmlFor={elem}>
                          <img className="ingredient-image" src={ingredient} alt="" />
                          {elem.charAt(0).toUpperCase() + elem.slice(1)}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="add-to-basket">
              <Button variant="contained" className="btn" onClick={onButtonClick}>
                <div className="btn-text">Add to basket</div>
              </Button>
              <div className="sum-cost">£{cost}</div>
            </div>
          </div>
          <IconButton
            className="close-icon"
            onClick={() => {
              setCost(foodElem.cost);
              onClose();
            }}>
            <img src={closeIcon} alt="" />
          </IconButton>
        </div>
      </div>
    ),
    document.getElementById('portal-root')!
  );
}
