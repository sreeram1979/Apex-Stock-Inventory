import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";

interface BulkActionsProps {
  handleBulkItemUpload: (type: 'inward' | 'outward') => void;
  downloadItemTemplate: (type: 'inward' | 'outward') => void;
}

export const BulkActions = ({ handleBulkItemUpload, downloadItemTemplate }: BulkActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inward Stock Actions</h3>
        <div className="flex gap-3">
          <Button
            onClick={() => handleBulkItemUpload('inward')}
            className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Inward CSV
          </Button>
          <Button
            onClick={() => downloadItemTemplate('inward')}
            variant="outline"
            className="flex-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          >
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Outward Stock Actions</h3>
        <div className="flex gap-3">
          <Button
            onClick={() => handleBulkItemUpload('outward')}
            className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Outward CSV
          </Button>
          <Button
            onClick={() => downloadItemTemplate('outward')}
            variant="outline"
            className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10"
          >
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
        </div>
      </div>
    </div>
  );
};