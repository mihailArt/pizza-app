import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import Category from '../Category/Category';

const mockData = {
  categoryName: 'Pizza',
  products: [
    {
      name: 'Salami and mushrooms',
      weight: 100,
      cost: 100,
      ingredientsList: ['ingredients'],
      nutritionalInformation: {
        kcal: 1,
        Protein: 2,
        Fat: 3,
        Carbohydrate: 4
      }
    }
  ]
};

test.todo('renders product card');

// test('renders product card', () => {
//   const { getByText } = render(<ProductCard {...mockData.products[0]} />);
//   expect(getByText(mockData.products[0].name)).toBeInTheDocument();
// });
