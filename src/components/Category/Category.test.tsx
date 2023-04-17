import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Category from './Category';
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

jest.mock('../ProductCard/ProductCard', () => {
  return function DummyProductCard(props: any) {
    return <div data-testid="product-card">{props.name}</div>;
  };
});

test('renders category', () => {
  const { getByText } = render(
    <Category categoryName={mockData.categoryName} products={mockData.products} />
  );
  expect(getByText(mockData.categoryName)).toBeInTheDocument();
});
