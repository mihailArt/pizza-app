export interface ICategory {
  categoryName: string;
  products: Food[];
}

export interface IMenuCard {
  name: string;
  description: string;
}

export interface NutritionalInformation {
  kcal: number;
  Protein: number;
  Fat: number;
  Carbohydrate: number;
}

export interface Food {
  name: string;
  weight: number;
  cost: number;
  ingredientsList: string[];
  nutritionalInformation: NutritionalInformation;
}

export interface ToppingsMap {
  parmesan: boolean;
  pepperoni: boolean;
  mushrooms: boolean;
  onion: boolean;
  pepper: boolean;
  jalapeno: boolean;
  tomatoes: boolean;
  ham: boolean;
}

export interface IBasketElement extends Food {
  dough: string;
  count: number;
  sum: number;
  costWithToppings: number;
  toppings: ToppingsMap;
}

export interface IUser {
  id?: string;
  name: string;
  phone: string;
  email: string;
  basketId?: string;
}
