import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Book } from "@/types/book";

interface StockTableProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
}

export const StockTable = ({ books, onDeleteBook }: StockTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Inward Date</TableHead>
              <TableHead>Purchased From</TableHead>
              <TableHead>Received By</TableHead>
              <TableHead>Transport Type</TableHead>
              <TableHead>LR Number</TableHead>
              <TableHead>Auto Charges</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.class}</TableCell>
                <TableCell>{book.program}</TableCell>
                <TableCell>{book.subject}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{book.inwardDate}</TableCell>
                <TableCell>{book.purchasedFrom}</TableCell>
                <TableCell>{book.receivedBy}</TableCell>
                <TableCell>{book.transportType}</TableCell>
                <TableCell>{book.lrNumber}</TableCell>
                <TableCell>{book.autoCharges}</TableCell>
                <TableCell>{book.lastUpdated}</TableCell>
                <TableCell>
                  <button
                    onClick={() => onDeleteBook(book.id)}
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