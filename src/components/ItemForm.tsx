import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemFormData } from "@/types/item";

interface ItemFormProps {
  item: ItemFormData;
  setItem: (item: ItemFormData) => void;
  onAddItem: () => void;
  classes: string[];
  programs: string[];
  subjects: string[];
}

export const ItemForm = ({
  item,
  setItem,
  onAddItem,
  classes,
  programs,
  subjects,
}: ItemFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            value={item.class}
            onValueChange={(value) => setItem({ ...item, class: value })}
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
            value={item.program}
            onValueChange={(value) => setItem({ ...item, program: value })}
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
            value={item.subject}
            onValueChange={(value) => setItem({ ...item, subject: value })}
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
            placeholder="Initial Stock"
            value={item.initialStock}
            onChange={(e) => setItem({ ...item, initialStock: parseInt(e.target.value) || 0 })}
          />
          <button
            onClick={onAddItem}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 md:col-span-4"
          >
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      </CardContent>
    </Card>
  );
};