import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  lastUpdated: string;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 0,
  });

  const addBook = () => {
    if (!newBook.title || !newBook.author || !newBook.isbn) return;
    
    const book: Book = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBook,
      lastUpdated: new Date().toLocaleDateString(),
    };

    setBooks([...books, book]);
    setNewBook({ title: "", author: "", isbn: "", quantity: 0 });
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Bookstore Stock Register</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New Book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Input
                placeholder="Book Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <Input
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <Input
                placeholder="ISBN"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newBook.quantity}
                onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) || 0 })}
              />
              <button
                onClick={addBook}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" /> Add Book
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.quantity}</TableCell>
                    <TableCell>{book.lastUpdated}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteBook(book.id)}
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
      </div>
    </div>
  );
};

export default Index;