export type MenuCategory = "Carbohydrates" | "Proteins" | "Soups";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number | null;
  priceLabel: string;
  unit?: string;
  note?: string;
};

export const menuItems: MenuItem[] = [
  // Carbohydrates
  { id: "fufu", name: "Fufu", category: "Carbohydrates", price: 15, priceLabel: "GHS 15 & above", note: "Price may vary by portion" },
  { id: "banku", name: "Banku", category: "Carbohydrates", price: 5, priceLabel: "GHS 5", unit: "per ball" },
  { id: "akple", name: "Akple", category: "Carbohydrates", price: 5, priceLabel: "GHS 5", unit: "per ball" },
  { id: "rice-balls", name: "Rice Balls", category: "Carbohydrates", price: 5, priceLabel: "GHS 5", unit: "per ball" },

  // Proteins
  { id: "egg", name: "Egg", category: "Proteins", price: 5, priceLabel: "GHS 5" },
  { id: "salted-beef", name: "Salted Beef", category: "Proteins", price: 10, priceLabel: "GHS 10" },
  { id: "wele", name: "Wele / Cow Hide", category: "Proteins", price: 10, priceLabel: "GHS 10" },
  { id: "crab", name: "Crab", category: "Proteins", price: 10, priceLabel: "GHS 10" },
  { id: "cow-tripe", name: "Cow Tripe", category: "Proteins", price: 25, priceLabel: "GHS 25" },
  { id: "chicken", name: "Chicken", category: "Proteins", price: 25, priceLabel: "GHS 25" },
  { id: "salmon", name: "Salmon", category: "Proteins", price: 25, priceLabel: "GHS 25" },
  { id: "tuna", name: "Tuna", category: "Proteins", price: 25, priceLabel: "GHS 25" },
  { id: "goat-meat", name: "Goat Meat", category: "Proteins", price: 40, priceLabel: "GHS 40" },
  { id: "goat-intestines", name: "Goat Intestines", category: "Proteins", price: 30, priceLabel: "GHS 30" },
  { id: "akosombo", name: "Akosombo", category: "Proteins", price: 30, priceLabel: "GHS 30" },
  { id: "tilapia", name: "Tilapia", category: "Proteins", price: 40, priceLabel: "GHS 40–80", note: "Final price depends on size" },
  { id: "snail", name: "Snail", category: "Proteins", price: 40, priceLabel: "GHS 40" },

  // Soups: only Oiless Okro had a price in the supplied brief.
  { id: "oiless-okro", name: "Oiless Okro", category: "Soups", price: 5, priceLabel: "GHS 5", unit: "per scoop" },
  { id: "goat-light-soup", name: "Goat Light Soup", category: "Soups", price: null, priceLabel: "Price on confirmation" },
  { id: "chicken-light-soup", name: "Chicken Light Soup", category: "Soups", price: null, priceLabel: "Price on confirmation" },
  { id: "groundnut-soup", name: "Groundnut Soup", category: "Soups", price: null, priceLabel: "Price on confirmation" },
  { id: "palmnut-soup", name: "Palmnut Soup", category: "Soups", price: null, priceLabel: "Price on confirmation" },
  { id: "green-soup", name: "Green Soup", category: "Soups", price: null, priceLabel: "Price on confirmation" },
];

export const categories: MenuCategory[] = ["Carbohydrates", "Proteins", "Soups"];

export const WHATSAPP_NUMBER = "233503371871";
