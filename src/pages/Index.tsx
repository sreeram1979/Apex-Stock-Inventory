import { useState, useEffect } from "react";
import { StockInwardForm } from "@/components/StockInwardForm";
import { StockTable } from "@/components/StockTable";
import { Book, NewBookFormData } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { Item, ItemFormData } from "@/types/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('stockBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('stockItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const { toast } = useToast();

  const [newItem, setNewItem] = useState<ItemFormData>({
    title: "",
    class: "",
    program: "",
    subject: "",
    initialStock: 0,
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

  useEffect(() => {
    localStorage.setItem('stockBooks', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('stockItems', JSON.stringify(items));
  }, [items]);

  const classes = Array.from({ length: 10 }, (_, i) => `${i + 1}st Grade`);
  const programs = ["Aspirants", "Scholars", "Champions", "Jr Olympiads"];
  const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Science", "English", "Reasoning", "GK"];

  useEffect(() => {
    if (newItem.class && newItem.program && newItem.subject) {
      const generatedTitle = `${newItem.class}-${newItem.program}-${newItem.subject}`;
      setNewItem(prev => ({ ...prev, title: generatedTitle }));
    }
  }, [newItem.class, newItem.program, newItem.subject]);

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

  const downloadTemplate = (type: 'inward' | 'outward') => {
    const inwardHeaders = "Title,Class,Program,Subject,Quantity,PurchasedFrom,ReceivedBy,Date,TransportType,LRNumber,AutoCharges";
    const outwardHeaders = "Title,Class,Program,Subject,Quantity,SentTo,SentBy,Date,TransportType,LRNumber,AutoCharges";
    
    const sampleInwardData = "10th Grade-Aspirants-Maths,10th Grade,Aspirants,Maths,100,Publisher XYZ,John Doe,2024-03-20,Road,LR123,500";
    const sampleOutwardData = "10th Grade-Aspirants-Maths,10th Grade,Aspirants,Maths,50,School ABC,Jane Smith,2024-03-20,Road,LR124,300";

    const headers = type === 'inward' ? inwardHeaders : outwardHeaders;
    const sampleData = type === 'inward' ? sampleInwardData : sampleOutwardData;
    const csvContent = `${headers}\n${sampleData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_stock_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} stock CSV template has been downloaded.`,
    });
  };

  const addItem = () => {
    const requiredFields = ['class', 'program', 'subject', 'initialStock'];
    const hasEmptyRequiredFields = requiredFields.some(field => !newItem[field as keyof ItemFormData]);
    
    if (hasEmptyRequiredFields) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const item: Item = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
    };

    setItems([...items, item]);
    setNewItem({
      title: "",
      class: "",
      program: "",
      subject: "",
      initialStock: 0,
    });

    toast({
      title: "Success",
      description: "Item added successfully",
    });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: "Success",
      description: "Item deleted successfully",
    });
  };

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Bookstore Stock Register</h1>
            <div className="flex gap-2">
              <Button
                onClick={() => handleBulkUpload('inward')}
                className="flex-1 sm:flex-none items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4" /> Upload Inward CSV
              </Button>
              <Button
                onClick={() => downloadTemplate('inward')}
                variant="outline"
                className="flex-1 sm:flex-none items-center gap-2 border-green-600 text-green-600 hover:bg-green-50"
              >
                <Download className="h-4 w-4" /> Template
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleBulkUpload('outward')}
                className="flex-1 sm:flex-none items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <Upload className="h-4 w-4" /> Upload Outward CSV
              </Button>
              <Button
                onClick={() => downloadTemplate('outward')}
                variant="outline"
                className="flex-1 sm:flex-none items-center gap-2 border-red-600 text-red-600 hover:bg-red-50"
              >
                <Download className="h-4 w-4" /> Template
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="items" className="space-y-4">
          <TabsList>
            <TabsTrigger value="items">Manage Items</TabsTrigger>
            <TabsTrigger value="stock">Stock Movement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="space-y-4">
            <ItemForm
              item={newItem}
              setItem={setNewItem}
              onAddItem={addItem}
              classes={classes}
              programs={programs}
              subjects={subjects}
            />
            <ItemList items={items} onDeleteItem={deleteItem} />
          </TabsContent>
          
          <TabsContent value="stock" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
