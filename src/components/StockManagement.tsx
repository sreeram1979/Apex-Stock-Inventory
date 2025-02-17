
import { useState, useEffect } from "react";
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
  defaultType: 'inward' | 'outward';
}

export const StockManagement = ({ 
  items, 
  setItems,
  classes,
  programs,
  subjects,
  defaultType 
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
    type: defaultType,
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

  // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stockBooks', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    setNewBook(prev => ({
      ...prev,
      type: defaultType
    }));
  }, [defaultType]);

  const addBook = () => {
    const requiredFields = defaultType === 'inward' 
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
      type: defaultType,
      lastUpdated: new Date().toLocaleDateString(),
    };

    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    
    // Update item stock if it's an inward entry
    if (book.type === 'inward') {
      const updatedItems = updateItemStock(items, [book]);
      setItems(updatedItems);
      localStorage.setItem('stockItems', JSON.stringify(updatedItems));
    }

    setNewBook({
      title: "",
      class: "",
      program: "",
      subject: "",
      quantity: 0,
      type: defaultType,
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
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('stockBooks', JSON.stringify(updatedBooks));
    toast({
      title: "Success",
      description: "Stock record deleted successfully",
    });
  };

  const filteredBooks = books.filter(book => book.type === defaultType);

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
      <StockTable books={filteredBooks} onDeleteBook={deleteBook} />
    </div>
  );
};
