
import { useState } from "react";
import { Item } from "@/types/item";
import { Header } from "@/components/Header";
import { StockManagement } from "@/components/StockManagement";
import { BulkActions } from "@/components/BulkActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('stockItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const classes = Array.from({ length: 10 }, (_, i) => `${i + 1}st Grade`);
  const programs = ["Aspirants", "Scholars", "Champions", "Jr Olympiads"];
  const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Science", "English", "Reasoning", "GK"];

  const handleBooksUploaded = (newBooks: any[]) => {
    // Handle bulk upload if needed
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <BulkActions onBooksUploaded={handleBooksUploaded} />
          
          <Tabs defaultValue="inward" className="space-y-6">
            <TabsList className="w-full border-b">
              <TabsTrigger value="inward" className="flex-1">Stock Inward</TabsTrigger>
              <TabsTrigger value="outward" className="flex-1">Stock Outward</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inward" className="space-y-6">
              <StockManagement
                items={items}
                setItems={setItems}
                classes={classes}
                programs={programs}
                subjects={subjects}
                defaultType="inward"
              />
            </TabsContent>
            
            <TabsContent value="outward" className="space-y-6">
              <StockManagement
                items={items}
                setItems={setItems}
                classes={classes}
                programs={programs}
                subjects={subjects}
                defaultType="outward"
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
