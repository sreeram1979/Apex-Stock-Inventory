import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Trash2 } from "lucide-react";
import { Book } from "@/types/book";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface StockTableProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
}

export const StockTable = ({ books, onDeleteBook }: StockTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return books.slice(startIndex, endIndex);
  };

  const exportToCSV = () => {
    // Define headers
    const headers = [
      'Title',
      'Type',
      'Class',
      'Program',
      'Subject',
      'Quantity',
      'Date',
      'From/To',
      'By',
      'Transport Type',
      'LR Number',
      'Auto Charges',
      'Last Updated'
    ];

    // Convert books data to CSV rows
    const csvRows = books.map(book => [
      book.title,
      book.type === 'inward' ? 'Inward' : 'Outward',
      book.class,
      book.program,
      book.subject,
      book.quantity,
      book.type === 'inward' ? book.inwardDate : book.outwardDate,
      book.type === 'inward' ? book.purchasedFrom : book.sentTo,
      book.type === 'inward' ? book.receivedBy : book.sentBy,
      book.transportType,
      book.lrNumber,
      book.autoCharges,
      book.lastUpdated
    ]);

    // Combine headers and data
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `stock_register_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Stock ({books.length} items)</CardTitle>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Download className="h-4 w-4" /> Export to CSV
        </button>
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
            {getCurrentPageData().map((book) => (
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
        
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};