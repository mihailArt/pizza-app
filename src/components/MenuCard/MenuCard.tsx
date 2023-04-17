import menuImage from '../../img/menu_image.png';
import menuArrow from '../../img/menu_arrow.png';
import './MenuCard.scss';
import { IMenuCard } from '../interfaces';

export default function MenuCard({ name, description }: IMenuCard) {
  return (
    <div className="menu-card">
      <h4 className="card-header">{name}</h4>
      <img src={menuImage} alt="" className="category-label" />
      <div className="card-description">{description}</div>
      <img src={menuArrow} alt="" className="arrow" />
    </div>
  );
}
