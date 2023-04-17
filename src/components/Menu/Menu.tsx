import Category from '../Category/Category';
import './Menu.scss';
import data from '../../mock-data.json';
import MenuCard from '../MenuCard/MenuCard';

import { useGetFoodByCategoryQuery } from '../../api/apiBack';
import { ICategory } from '../interfaces';

export default function Menu() {
  const { data: categories, isLoading, isSuccess, isError, error } = useGetFoodByCategoryQuery({});

  let content;

  if (isLoading) {
    content = <div> {'Loading...'} </div>;
  } else if (isSuccess) {
    content = categories.map((category: ICategory) => (
      <Category key={category.categoryName} {...category} />
    ));
  } else if (isError) {
    console.log(error.toString());
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="main-section">
      <div>
        <h3>Popular</h3>
        <div className="categories">{content}</div>
        <div className="menu-cards">
          {data.menuCards.map((elem, index) => (
            <MenuCard key={index} {...elem} />
          ))}
        </div>
      </div>
    </div>
  );
}
