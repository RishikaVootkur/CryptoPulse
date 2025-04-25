import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setSearchTerm, setShowFavorites } from "@/store/cryptoSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const TableControls = () => {
  const dispatch = useDispatch();
  const { searchTerm, showFavorites } = useSelector(selectFilters);

  return (
    <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
        <Input
          className="pl-8 bg-surface border border-border"
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="favorites-only" 
          checked={showFavorites}
          onCheckedChange={(checked) => dispatch(setShowFavorites(checked))}
        />
        <Label htmlFor="favorites-only">Show favorites only</Label>
      </div>
    </div>
  );
};

export default TableControls;