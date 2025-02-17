import { Product } from "../../constants/products";


function sortCardsByRating(products: Product[]) {
  return products.filter((product) => +product.rating >= 4);
}

function sortCards(
  products: Product[],
  brand: string,
  type?: string
): Product[] {
  return products
    .filter((product) => product.brand === brand)
    .filter((product) => (type ? product.type === type : true));
}

function handleCategory(category: string) {
  console.log(category);
}

export { sortCardsByRating, sortCards, handleCategory };
