// import { create } from "zustand";

// type AddedItemPreview = {
//   image?: string;
//   name: string;
//   category: string;
//   size: string;
//   price: number;
// };

// interface UIState {
//   addedItem: AddedItemPreview | null;
//   isAddedOpen: boolean;

//   openAdded: (item: AddedItemPreview) => void;
//   closeAdded: () => void;
// }

// export const useUIStore = create<UIState>((set) => ({
//   addedItem: null,
//   isAddedOpen: false,

//   openAdded: (item) =>
//     set({
//       addedItem: item,
//       isAddedOpen: true,
//     }),

//   closeAdded: () =>
//     set({
//       isAddedOpen: false,
//       addedItem: null,
//     }),
// }));

import { create  } from "zustand";

type AddedItemPreview = {
  image?: string;
  name: string;
  category: string;
  size: string;
  price: number;
}

interface UIState {
  addedItem: AddedItemPreview | null;
  isAddedOpen: boolean;

  openAdded: (item: AddedItemPreview) => void;
  closeAdded: () => void;
}


export const useUIStore = create<UIState>((set) => ({
  addedItem: null,
  isAddedOpen: false,

  openAdded: (item) => 
    set({
      addedItem: item,
      isAddedOpen: true,
    }),
  
  closeAdded: () => 
    set({
      isAddedOpen: false,
      addedItem: null,
    })
})); 
