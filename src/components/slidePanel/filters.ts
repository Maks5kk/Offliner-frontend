import { Product } from "../../constants/products";

function sortCards(
  products: Product[],
  brand: string,
  type?: string
): Product[] {
  return products
    .filter((product) => product.brand === brand)
    .filter((product) => (type ? product.type === type : true));
}

function sortCardsByRating(products: Product[]) {
    return products.filter((product) => +product.rating >= 4);
  }

export { sortCards, sortCardsByRating};
