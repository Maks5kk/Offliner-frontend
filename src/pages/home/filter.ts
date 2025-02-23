import { Product } from "../../constants/products";


function sortCardsByRating(products: Product[]) {
  return products.filter((product) => +product.rating >= 4);
}

export { sortCardsByRating };
