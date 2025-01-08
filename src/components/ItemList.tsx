import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Item } from "@/types/item";

interface ItemListProps {
  items: Item[];
  onDeleteItem: (id: string) => void;
}

export const ItemList = ({ items, onDeleteItem }: ItemListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Items ({items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Initial Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.class}</TableCell>
                <TableCell>{item.program}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.initialStock}</TableCell>
                <TableCell>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};