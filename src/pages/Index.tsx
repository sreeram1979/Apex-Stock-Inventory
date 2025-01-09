import { useState, useEffect } from "react";
import { StockInwardForm } from "@/components/StockInwardForm";
import { StockTable } from "@/components/StockTable";
import { Book, NewBookFormData } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { Item, ItemFormData } from "@/types/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { BulkActions } from "@/components/BulkActions";

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

  const handleBulkItemUpload = () => {
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
        
        const newItems: Item[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(value => value.trim());
          const itemData: any = {};
          
          headers.forEach((header, index) => {
            itemData[header.toLowerCase().replace(/\s+/g, '')] = values[index];
          });

          const item: Item = {
            id: Math.random().toString(36).substr(2, 9),
            title: `${itemData.class}-${itemData.program}-${itemData.subject}`,
            class: itemData.class || '',
            program: itemData.program || '',
            subject: itemData.subject || '',
            initialStock: parseInt(itemData.initialstock) || 0,
          };

          newItems.push(item);
        }

        setItems(prev => [...prev, ...newItems]);
        toast({
          title: "Success",
          description: `Successfully uploaded ${newItems.length} items`,
        });
      };

      reader.readAsText(file);
    };

    input.click();
  };

  const downloadItemTemplate = () => {
    const headers = "Class,Program,Subject,InitialStock";
    const sampleData = "10th Grade,Aspirants,Maths,0";
    const csvContent = `${headers}\n${sampleData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `items_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: "Items CSV template has been downloaded.",
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
    <div className="min-h-screen bg-[#F8F9FC]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <BulkActions 
            handleBulkItemUpload={handleBulkItemUpload} 
            downloadItemTemplate={downloadItemTemplate}
            onItemsUploaded={setItems}
          />
          
          <Tabs defaultValue="items" className="space-y-6">
            <TabsList className="w-full border-b">
              <TabsTrigger value="items" className="flex-1">Manage Items</TabsTrigger>
              <TabsTrigger value="stock" className="flex-1">Stock Movement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="items" className="space-y-6">
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
            
            <TabsContent value="stock" className="space-y-6">
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
      </main>
    </div>
  );
};

export default Index;
