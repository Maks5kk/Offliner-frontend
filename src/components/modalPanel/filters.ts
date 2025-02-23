import { Product } from "../../constants/products";

function sortCards(
  products: Product[],
  brand: string,
  category?: string
): Product[] {
  return products
    .filter((product) => product.brand === brand)
    .filter((product) => (category ? product.category === category : true));
}

function sortCardsByRating(products: Product[]) {
  return products.filter((product) => +product.rating >= 4);
}

export { sortCards, sortCardsByRating };
