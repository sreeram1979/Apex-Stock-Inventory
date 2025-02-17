
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewBookFormData } from "@/types/book";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Item } from "@/types/item";

interface StockInwardFormProps {
  newBook: NewBookFormData;
  setNewBook: (book: NewBookFormData) => void;
  onAddBook: () => void;
  classes: string[];
  programs: string[];
  subjects: string[];
  items: Item[];
}

export const StockInwardForm = ({
  newBook,
  setNewBook,
  onAddBook,
  classes,
  programs,
  subjects,
  items = [], // Add default empty array
}: StockInwardFormProps) => {
  const handleTypeChange = (type: 'inward' | 'outward') => {
    setNewBook({ 
      ...newBook, 
      type,
      purchasedFrom: '',
      sentTo: '',
      receivedBy: '',
      sentBy: '',
      inwardDate: type === 'inward' ? new Date().toISOString().split('T')[0] : '',
      outwardDate: type === 'outward' ? new Date().toISOString().split('T')[0] : ''
    });
  };

  const handleItemSelect = (itemId: string) => {
    const selectedItem = items.find(item => item.id === itemId);
    if (selectedItem) {
      setNewBook({
        ...newBook,
        title: selectedItem.title,
        class: selectedItem.class,
        program: selectedItem.program,
        subject: selectedItem.subject,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inward" className="mb-4" onValueChange={(value) => handleTypeChange(value as 'inward' | 'outward')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inward">Stock Inward</TabsTrigger>
            <TabsTrigger value="outward">Stock Outward</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <Select
            value={newBook.class}
            onValueChange={(value) => setNewBook({ ...newBook, class: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newBook.program}
            onValueChange={(value) => setNewBook({ ...newBook, program: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newBook.subject}
            onValueChange={(value) => setNewBook({ ...newBook, subject: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Quantity"
            value={newBook.quantity}
            onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) || 0 })}
          />
          {newBook.type === 'inward' ? (
            <>
              <Input
                type="date"
                value={newBook.inwardDate}
                onChange={(e) => setNewBook({ ...newBook, inwardDate: e.target.value })}
              />
              <Input
                placeholder="Purchased From"
                value={newBook.purchasedFrom}
                onChange={(e) => setNewBook({ ...newBook, purchasedFrom: e.target.value })}
              />
              <Input
                placeholder="Received By"
                value={newBook.receivedBy}
                onChange={(e) => setNewBook({ ...newBook, receivedBy: e.target.value })}
              />
            </>
          ) : (
            <>
              <Input
                type="date"
                value={newBook.outwardDate}
                onChange={(e) => setNewBook({ ...newBook, outwardDate: e.target.value })}
              />
              <Input
                placeholder="Sent To"
                value={newBook.sentTo}
                onChange={(e) => setNewBook({ ...newBook, sentTo: e.target.value })}
              />
              <Input
                placeholder="Sent By"
                value={newBook.sentBy}
                onChange={(e) => setNewBook({ ...newBook, sentBy: e.target.value })}
              />
            </>
          )}
          <Input
            placeholder="Transport Type"
            value={newBook.transportType}
            onChange={(e) => setNewBook({ ...newBook, transportType: e.target.value })}
          />
          <Input
            placeholder="LR Number"
            value={newBook.lrNumber}
            onChange={(e) => setNewBook({ ...newBook, lrNumber: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Auto Charges"
            value={newBook.autoCharges}
            onChange={(e) => setNewBook({ ...newBook, autoCharges: parseFloat(e.target.value) || 0 })}
          />
          <button
            onClick={onAddBook}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 md:col-span-4"
          >
            <Plus className="h-4 w-4" /> Add {newBook.type === 'inward' ? 'Inward' : 'Outward'} Stock
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
