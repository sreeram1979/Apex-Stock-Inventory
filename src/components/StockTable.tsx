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
              <TableHead>Type</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>From/To</TableHead>
              <TableHead>By</TableHead>
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
                <TableCell className={book.type === 'inward' ? 'text-green-600' : 'text-red-600'}>
                  {book.type === 'inward' ? 'Inward' : 'Outward'}
                </TableCell>
                <TableCell>{book.class}</TableCell>
                <TableCell>{book.program}</TableCell>
                <TableCell>{book.subject}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{book.type === 'inward' ? book.inwardDate : book.outwardDate}</TableCell>
                <TableCell>{book.type === 'inward' ? book.purchasedFrom : book.sentTo}</TableCell>
                <TableCell>{book.type === 'inward' ? book.receivedBy : book.sentBy}</TableCell>
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