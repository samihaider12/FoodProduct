import { create } from "zustand";
import type { Product } from "../types";
import martJSON from "../data/mart.json";

type MartStore = {
  products: Product[];
  initialized: boolean;
  init: () => void;
};

export const useMartStore = create<MartStore>(() => ({
  products: martJSON as Product[],
  initialized: true,
  init: () => {},
}));

