import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Item } from "@/types/item";

interface BulkActionsProps {
  handleBulkItemUpload: (type: 'inward' | 'outward') => void;
  downloadItemTemplate: (type: 'inward' | 'outward') => void;
  onItemsUploaded: (items: Item[]) => void;
}

export const BulkActions = ({ 
  handleBulkItemUpload, 
  downloadItemTemplate,
  onItemsUploaded 
}: BulkActionsProps) => {
  const { toast } = useToast();

  const handleItemUpload = () => {
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
        
        const newItems: Item[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(value => value.trim());
          const itemData: any = {};
          
          headers.forEach((header, index) => {
            itemData[header.toLowerCase().replace(/\s+/g, '')] = values[index];
          });

          const item: Item = {
            id: Math.random().toString(36).substr(2, 9),
            title: `${itemData.class}-${itemData.program}-${itemData.subject}`,
            class: itemData.class || '',
            program: itemData.program || '',
            subject: itemData.subject || '',
            initialStock: parseInt(itemData.initialstock) || 0, // Accepts zero values
          };

          newItems.push(item);
        }

        onItemsUploaded(newItems);
        toast({
          title: "Success",
          description: `Successfully uploaded ${newItems.length} items`,
        });
      };

      reader.readAsText(file);
    };

    input.click();
  };

  const downloadItemsTemplate = () => {
    const headers = "Class,Program,Subject,InitialStock";
    const sampleData = "10th Grade,Aspirants,Maths,0"; // Example with zero initial stock
    const csvContent = `${headers}\n${sampleData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'items_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: "Items CSV template has been downloaded.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Management</h3>
        <div className="flex gap-3">
          <Button
            onClick={handleItemUpload}
            className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Items CSV
          </Button>
          <Button
            onClick={downloadItemsTemplate}
            variant="outline"
            className="flex-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          >
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Actions</h3>
        <div className="flex gap-3">
          <Button
            onClick={() => handleBulkItemUpload('inward')}
            className="flex-1 bg-[#10B981] hover:bg-[#059669]"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Stock
          </Button>
          <Button
            onClick={() => downloadItemTemplate('inward')}
            variant="outline"
            className="flex-1 border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
          >
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
        </div>
      </div>
    </div>
  );
};