import { useState } from "react";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { Item, ItemFormData } from "@/types/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { StockManagement } from "@/components/StockManagement";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
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

  const classes = Array.from({ length: 10 }, (_, i) => `${i + 1}st Grade`);
  const programs = ["Aspirants", "Scholars", "Champions", "Jr Olympiads"];
  const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Science", "English", "Reasoning", "GK"];

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

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
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
              <StockManagement
                items={items}
                setItems={setItems}
                classes={classes}
                programs={programs}
                subjects={subjects}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;