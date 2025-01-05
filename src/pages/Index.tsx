import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  class: string;
  program: string;
  subject: string;
  quantity: number;
  lastUpdated: string;
  purchasedFrom: string;
  receivedBy: string;
  inwardDate: string;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: "",
    class: "",
    program: "",
    subject: "",
    quantity: 0,
    purchasedFrom: "",
    receivedBy: "",
    inwardDate: new Date().toISOString().split('T')[0],
  });

  const classes = Array.from({ length: 10 }, (_, i) => `${i + 1}st Grade`);
  const programs = ["Aspirants", "Scholars", "Champions", "Jr Olympiads"];
  const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Science", "English", "Reasoning", "GK"];

  // Auto-generate title when class, program, or subject changes
  useEffect(() => {
    if (newBook.class && newBook.program && newBook.subject) {
      const generatedTitle = `${newBook.class}-${newBook.program}-${newBook.subject}`;
      setNewBook(prev => ({ ...prev, title: generatedTitle }));
    }
  }, [newBook.class, newBook.program, newBook.subject]);

  const addBook = () => {
    if (!newBook.title || !newBook.class || !newBook.program || !newBook.subject || !newBook.purchasedFrom || !newBook.receivedBy) return;
    
    const book: Book = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBook,
      lastUpdated: new Date().toLocaleDateString(),
      inwardDate: newBook.inwardDate,
    };

    setBooks([...books, book]);
    setNewBook({
      title: "",
      class: "",
      program: "",
      subject: "",
      quantity: 0,
      purchasedFrom: "",
      receivedBy: "",
      inwardDate: new Date().toISOString().split('T')[0],
    });
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
            <CardTitle>Stock Inward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Book Title"
                value={newBook.title}
                readOnly
                className="bg-gray-100"
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
              <button
                onClick={addBook}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 md:col-span-4"
              >
                <Plus className="h-4 w-4" /> Add Stock
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
                  <TableHead>Class</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Inward Date</TableHead>
                  <TableHead>Purchased From</TableHead>
                  <TableHead>Received By</TableHead>
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