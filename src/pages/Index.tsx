import { useState, useEffect } from "react";
import { StockInwardForm } from "@/components/StockInwardForm";
import { StockTable } from "@/components/StockTable";
import { Book, NewBookFormData } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
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

  const handleBulkUpload = (type: 'inward' | 'outward') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const newBooks: Book[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(value => value.trim());
          const bookData: any = {};
          
          headers.forEach((header, index) => {
            bookData[header.toLowerCase().replace(/\s+/g, '')] = values[index];
          });

          const book: Book = {
            id: Math.random().toString(36).substr(2, 9),
            title: bookData.title || '',
            class: bookData.class || '',
            program: bookData.program || '',
            subject: bookData.subject || '',
            quantity: parseInt(bookData.quantity) || 0,
            type: type,
            purchasedFrom: type === 'inward' ? bookData.purchasedfrom || '' : '',
            sentTo: type === 'outward' ? bookData.sentto || '' : '',
            receivedBy: type === 'inward' ? bookData.receivedby || '' : '',
            sentBy: type === 'outward' ? bookData.sentby || '' : '',
            inwardDate: type === 'inward' ? bookData.date || new Date().toISOString().split('T')[0] : '',
            outwardDate: type === 'outward' ? bookData.date || new Date().toISOString().split('T')[0] : '',
            transportType: bookData.transporttype || '',
            lrNumber: bookData.lrnumber || '',
            autoCharges: parseFloat(bookData.autocharges) || 0,
            lastUpdated: new Date().toLocaleDateString(),
          };

          newBooks.push(book);
        }

        setBooks(prev => [...prev, ...newBooks]);
        toast({
          title: "Success",
          description: `Successfully uploaded ${newBooks.length} ${type} records`,
        });
      };

      reader.readAsText(file);
    };

    input.click();
  };

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Bookstore Stock Register</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => handleBulkUpload('inward')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4" /> Upload Inward CSV
            </Button>
            <Button
              onClick={() => handleBulkUpload('outward')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <Upload className="h-4 w-4" /> Upload Outward CSV
            </Button>
          </div>
        </div>
        
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