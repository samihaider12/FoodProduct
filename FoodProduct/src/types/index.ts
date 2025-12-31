
//  Restaurant
export interface Restaurant {
     id: number;
  name: string;
  rating: string;
  reviews: string;
  deliveryTime: string;
  priceRange: string;///////////////////////
  cuisine: string;
  deliveryFee: string;
  image: string;
  menu: MenuItem[];
}

// CartContext
export interface MenuItem {
 id: number;
  name: string;
  price: number;
  desc: string; 
  img: string;
  
}
export interface CartItem extends MenuItem {
  quantity: number;
}
 

//  Panda Mart
export interface Product {
  id: number;
  name: string;
  price: string;/////////////////
  savePrice: string;
  priceOff: string;
  quieantity?: string;
  image?: string; 
}
 
export interface ShopMenuItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
}

export interface Shop {
  id: number;
  name: string;
  deliveryTime: string;
  isAd: boolean;
  discount: string | null;
  isFreeDelivery: boolean;
  image: string;
  category: string;
}

export interface ShopMenu extends Shop {
  menu: ShopMenuItem[];
}
