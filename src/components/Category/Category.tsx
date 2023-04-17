import ProductCard from '../ProductCard/ProductCard';
import './Category.scss';
import { ICategory } from '../interfaces';

export default function Category({ categoryName, products }: ICategory) {
  return (
    <div className="category">
      <div>
        <h5 className="category-header">{categoryName}</h5>
        <div className="category-body">
          {products.map((elem, index) => (
            <ProductCard key={index} {...elem} />
          ))}
        </div>
      </div>
    </div>
  );
}
