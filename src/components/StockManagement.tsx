import { useState } from "react";
import { StockInwardForm } from "@/components/StockInwardForm";
import { StockTable } from "@/components/StockTable";
import { Book, NewBookFormData } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";
import { Item } from "@/types/item";
import { updateItemStock } from "@/utils/stockUtils";

interface StockManagementProps {
  items: Item[];
  setItems: (items: Item[]) => void;
  classes: string[];
  programs: string[];
  subjects: string[];
}

export const StockManagement = ({ 
  items, 
  setItems,
  classes,
  programs,
  subjects 
}: StockManagementProps) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('stockBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const { toast } = useToast();

  const [newBook, setNewBook] = useState<NewBookFormData>({
    title: "",
    class: "",
    program: "",
    subject: "",
    quantity: 0,
    type: "inward",
    purchasedFrom: "",
    sentTo: "",
    receivedBy: "",
    sentBy: "",
    inwardDate: new Date().toISOString().split('T')[0],
    outwardDate: "",
    transportType: "",
    lrNumber: "",
    autoCharges: 0,
  });

  const addBook = () => {
    const requiredFields = newBook.type === 'inward' 
      ? ['title', 'quantity', 'purchasedFrom', 'receivedBy']
      : ['title', 'quantity', 'sentTo', 'sentBy'];

    const hasEmptyRequiredFields = requiredFields.some(field => !newBook[field as keyof NewBookFormData]);
    
    if (hasEmptyRequiredFields) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const book: Book = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBook,
      lastUpdated: new Date().toLocaleDateString(),
    };

    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    
    // Update item stock if it's an inward entry
    if (book.type === 'inward') {
      const updatedItems = updateItemStock(items, [book]);
      setItems(updatedItems);
    }

    setNewBook({
      title: "",
      class: "",
      program: "",
      subject: "",
      quantity: 0,
      type: "inward",
      purchasedFrom: "",
      sentTo: "",
      receivedBy: "",
      sentBy: "",
      inwardDate: new Date().toISOString().split('T')[0],
      outwardDate: "",
      transportType: "",
      lrNumber: "",
      autoCharges: 0,
    });

    toast({
      title: "Success",
      description: "Stock movement recorded successfully",
    });
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    toast({
      title: "Success",
      description: "Stock record deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <StockInwardForm
        newBook={newBook}
        setNewBook={setNewBook}
        onAddBook={addBook}
        classes={classes}
        programs={programs}
        subjects={subjects}
        items={items}
      />
      <StockTable books={books} onDeleteBook={deleteBook} />
    </div>
  );
};