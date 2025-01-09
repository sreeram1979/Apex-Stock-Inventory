import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@/types/book";

interface BulkActionsProps {
  onBooksUploaded: (books: Book[]) => void;
}

export const BulkActions = ({ onBooksUploaded }: BulkActionsProps) => {
  const { toast } = useToast();

  const handleStockUpload = (type: 'inward' | 'outward') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const newBooks: Book[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(value => value.trim());
          const bookData: any = {};
          
          headers.forEach((header, index) => {
            bookData[header.toLowerCase().replace(/\s+/g, '')] = values[index];
          });

          const book: Book = {
            id: Math.random().toString(36).substr(2, 9),
            title: bookData.title || '',
            class: bookData.class || '',
            program: bookData.program || '',
            subject: bookData.subject || '',
            quantity: parseInt(bookData.quantity) || 0,
            type,
            purchasedFrom: type === 'inward' ? bookData.purchasedfrom || '' : '',
            sentTo: type === 'outward' ? bookData.sentto || '' : '',
            receivedBy: type === 'inward' ? bookData.receivedby || '' : '',
            sentBy: type === 'outward' ? bookData.sentby || '' : '',
            inwardDate: type === 'inward' ? bookData.date || new Date().toISOString().split('T')[0] : '',
            outwardDate: type === 'outward' ? bookData.date || new Date().toISOString().split('T')[0] : '',
            transportType: bookData.transporttype || '',
            lrNumber: bookData.lrnumber || '',
            autoCharges: parseFloat(bookData.autocharges) || 0,
            lastUpdated: new Date().toLocaleDateString()
          };

          newBooks.push(book);
        }

        onBooksUploaded(newBooks);
        toast({
          title: "Success",
          description: `Successfully uploaded ${newBooks.length} ${type} records`,
        });
      };

      reader.readAsText(file);
    };

    input.click();
  };

  const downloadTemplate = (type: 'inward' | 'outward') => {
    const headers = type === 'inward' 
      ? "Title,Class,Program,Subject,Quantity,Date,PurchasedFrom,ReceivedBy,TransportType,LRNumber,AutoCharges"
      : "Title,Class,Program,Subject,Quantity,Date,SentTo,SentBy,TransportType,LRNumber,AutoCharges";
      
    const sampleData = type === 'inward'
      ? "Mathematics Book,10th Grade,Aspirants,Maths,50,2024-02-20,Vendor Name,John Doe,Road,LR123,500"
      : "Mathematics Book,10th Grade,Aspirants,Maths,30,2024-02-20,School Name,Jane Doe,Road,LR124,600";
    
    const csvContent = `${headers}\n${sampleData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock_${type}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: `Stock ${type} CSV template has been downloaded.`,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Inward</h3>
        <div className="flex gap-3">
          <Button
            onClick={() => handleStockUpload('inward')}
            className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Inward CSV
          </Button>
          <Button
            onClick={() => downloadTemplate('inward')}
            variant="outline"
            className="flex-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          >
            <Download className="h-4 w-4 mr-2" /> Inward Template
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Outward</h3>
        <div className="flex gap-3">
          <Button
            onClick={() => handleStockUpload('outward')}
            className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Outward CSV
          </Button>
          <Button
            onClick={() => downloadTemplate('outward')}
            variant="outline"
            className="flex-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          >
            <Download className="h-4 w-4 mr-2" /> Outward Template
          </Button>
        </div>
      </div>
    </div>
  );
};