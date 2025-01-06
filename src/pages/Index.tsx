import { useState, useEffect } from "react";
import { StockInwardForm } from "@/components/StockInwardForm";
import { StockTable } from "@/components/StockTable";
import { Book, NewBookFormData } from "@/types/book";

const Index = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    // Initialize books from localStorage if available
    const savedBooks = localStorage.getItem('stockBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

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

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem('stockBooks', JSON.stringify(books));
  }, [books]);

  const classes = Array.from({ length: 10 }, (_, i) => `${i + 1}st Grade`);
  const programs = ["Aspirants", "Scholars", "Champions", "Jr Olympiads"];
  const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Science", "English", "Reasoning", "GK"];

  useEffect(() => {
    if (newBook.class && newBook.program && newBook.subject) {
      const generatedTitle = `${newBook.class}-${newBook.program}-${newBook.subject}`;
      setNewBook(prev => ({ ...prev, title: generatedTitle }));
    }
  }, [newBook.class, newBook.program, newBook.subject]);

  const addBook = () => {
    const requiredFields = newBook.type === 'inward' 
      ? ['title', 'class', 'program', 'subject', 'purchasedFrom', 'receivedBy']
      : ['title', 'class', 'program', 'subject', 'sentTo', 'sentBy'];

    const hasEmptyRequiredFields = requiredFields.some(field => !newBook[field as keyof NewBookFormData]);
    if (hasEmptyRequiredFields) return;
    
    const book: Book = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBook,
      lastUpdated: new Date().toLocaleDateString(),
    };

    setBooks([...books, book]);
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
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Bookstore Stock Register</h1>
        
        <StockInwardForm
          newBook={newBook}
          setNewBook={setNewBook}
          onAddBook={addBook}
          classes={classes}
          programs={programs}
          subjects={subjects}
        />

        <StockTable books={books} onDeleteBook={deleteBook} />
      </div>
    </div>
  );
};

export default Index;