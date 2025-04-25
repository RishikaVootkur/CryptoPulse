import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectPagination, setCurrentPage } from "@/store/cryptoSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, itemsPerPage, totalItems } = useSelector(selectPagination);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers
  const pageNumbers = [];
  const maxPageButtons = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="text-text-secondary text-sm">
        Showing <span className="text-text-primary">{startItem}-{endItem}</span> of <span className="text-text-primary">{totalItems}</span> assets
      </div>
      <div className="flex space-x-1">
        <button 
          className="px-3 py-1 bg-surface-light border border-border rounded hover:bg-opacity-80 text-sm flex items-center"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-3 w-3 mr-1" /> Prev
        </button>
        
        {pageNumbers.map(page => (
          <button
            key={page}
            className={`px-3 py-1 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-surface-light border border-border'} rounded hover:bg-opacity-80 text-sm`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <button className="px-3 py-1 bg-surface-light border border-border rounded hover:bg-opacity-80 text-sm">
            ...
          </button>
        )}
        
        {endPage < totalPages && (
          <button
            className="px-3 py-1 bg-surface-light border border-border rounded hover:bg-opacity-80 text-sm"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
        
        <button 
          className="px-3 py-1 bg-surface-light border border-border rounded hover:bg-opacity-80 text-sm flex items-center"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;