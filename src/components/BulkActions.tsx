import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@/types/book";

interface BulkActionsProps {
  onBooksUploaded: (books: Book[]) => void;
}

export const BulkActions = ({ onBooksUploaded }: BulkActionsProps) => {
  const { toast } = useToast();

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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Inward Template</h3>
        <div className="flex gap-3">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Outward Template</h3>
        <div className="flex gap-3">
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