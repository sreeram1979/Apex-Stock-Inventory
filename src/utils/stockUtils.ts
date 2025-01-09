import { Book } from "@/types/book";
import { Item } from "@/types/item";

export const updateItemStock = (items: Item[], books: Book[]): Item[] => {
  const updatedItems = [...items];
  
  books.forEach((book) => {
    if (book.type === 'inward') {
      const itemIndex = updatedItems.findIndex(
        (item) => 
          item.title === book.title &&
          item.class === book.class &&
          item.program === book.program &&
          item.subject === book.subject
      );
      
      if (itemIndex !== -1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          initialStock: updatedItems[itemIndex].initialStock + book.quantity
        };
      }
    }
  });
  
  return updatedItems;
};