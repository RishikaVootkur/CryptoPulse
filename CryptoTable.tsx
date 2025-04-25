import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectAllCryptos, selectSortConfig, toggleFavorite } from "@/store/cryptoSlice";
import { formatCurrency, formatPercentage, formatSupply } from "@/utils/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSortConfig } from "@/store/cryptoSlice";
import { useEffect, useRef } from "react";

type SortColumn = "name" | "price" | "1h" | "24h" | "7d" | "marketCap" | "volume" | "circulatingSupply";

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectAllCryptos);
  const sortConfig = useSelector(selectSortConfig);
  const priceRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Function to handle sorting
  const handleSort = (column: SortColumn) => {
    dispatch(setSortConfig({
      key: column,
      direction: sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Add class for price changes animation
  useEffect(() => {
    const animatePrice = (cryptoId: string, isIncrease: boolean) => {
      const priceElement = priceRefs.current[cryptoId];
      if (!priceElement) return;

      const flashClass = isIncrease ? "number-flash-up" : "number-flash-down";
      priceElement.classList.add(flashClass);
      
      setTimeout(() => {
        if (priceElement) {
          priceElement.classList.remove(flashClass);
        }
      }, 500);
    };

    // Listen for price changes
    const handleStorageEvent = () => {
      cryptos.forEach(crypto => {
        const prevPrice = parseFloat(localStorage.getItem(`${crypto.id}_prevPrice`) || "0");
        const currentPrice = crypto.price;
        
        if (prevPrice !== 0 && prevPrice !== currentPrice) {
          animatePrice(crypto.id, currentPrice > prevPrice);
          localStorage.setItem(`${crypto.id}_prevPrice`, currentPrice.toString());
        } else if (prevPrice === 0) {
          localStorage.setItem(`${crypto.id}_prevPrice`, currentPrice.toString());
        }
      });
    };

    // Initialize previous prices
    cryptos.forEach(crypto => {
      if (!localStorage.getItem(`${crypto.id}_prevPrice`)) {
        localStorage.setItem(`${crypto.id}_prevPrice`, crypto.price.toString());
      }
    });

    // Set up interval to check for price changes
    const interval = setInterval(handleStorageEvent, 500);
    
    return () => {
      clearInterval(interval);
    };
  }, [cryptos]);

  const getSortIcon = (column: SortColumn) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <div className="overflow-x-auto bg-surface border border-border rounded-lg shadow-lg">
      <Table>
        <TableHeader className="bg-surface-light">
          <TableRow className="border-b border-border">
            <TableHead className="w-12 py-3 px-4 text-left">#</TableHead>
            <TableHead className="py-3 px-4 text-left min-w-[180px]">
              <div 
                className="flex items-center cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('name')}
              >
                Name {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right whitespace-nowrap">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('price')}
              >
                Price {getSortIcon('price')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right whitespace-nowrap">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('1h')}
              >
                1h % {getSortIcon('1h')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right whitespace-nowrap">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('24h')}
              >
                24h % {getSortIcon('24h')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right whitespace-nowrap">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('7d')}
              >
                7d % {getSortIcon('7d')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right min-w-[150px]">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('marketCap')}
              >
                Market Cap {getSortIcon('marketCap')}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="ml-1 h-3 w-3 text-text-secondary" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-surface-light border border-border text-text-primary">
                      Market capitalization
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right min-w-[150px]">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('volume')}
              >
                Volume(24h) {getSortIcon('volume')}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="ml-1 h-3 w-3 text-text-secondary" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-surface-light border border-border text-text-primary">
                      Trading volume in the last 24 hours
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right min-w-[150px]">
              <div 
                className="flex items-center justify-end cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('circulatingSupply')}
              >
                Circulating Supply {getSortIcon('circulatingSupply')}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="ml-1 h-3 w-3 text-text-secondary" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-surface-light border border-border text-text-primary">
                      Coins currently in circulation
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="py-3 px-4 text-right">Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptos.map((crypto, index) => (
            <TableRow 
              key={crypto.id} 
              className="border-b border-border hover:bg-surface-light transition-colors"
              data-id={crypto.id}
            >
              <TableCell className="py-4 px-4 text-left">
                <div className="flex items-center">
                  <Star 
                    className={`h-4 w-4 mr-2 stroke-[1.5px] cursor-pointer ${
                      crypto.isFavorite 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-text-secondary fill-none hover:text-yellow-500 hover:fill-yellow-500'
                    }`}
                    onClick={() => dispatch(toggleFavorite(crypto.id))}
                  />
                  <span>{index + 1}</span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full bg-${crypto.id} flex items-center justify-center mr-3`}>
                    <span className="text-white font-bold">{crypto.logoSymbol}</span>
                  </div>
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-text-secondary text-sm">{crypto.symbol}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 text-right font-mono font-medium">
                <span 
                  className="number-change" 
                  ref={el => priceRefs.current[crypto.id] = el}
                >
                  {formatCurrency(crypto.price)}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <span className={`number-change px-1 rounded ${crypto.percentChange1h >= 0 ? 'text-green' : 'text-red'}`}>
                  {formatPercentage(crypto.percentChange1h)}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <span className={`number-change px-1 rounded ${crypto.percentChange24h >= 0 ? 'text-green' : 'text-red'}`}>
                  {formatPercentage(crypto.percentChange24h)}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <span className={`number-change px-1 rounded ${crypto.percentChange7d >= 0 ? 'text-green' : 'text-red'}`}>
                  {formatPercentage(crypto.percentChange7d)}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-right font-mono">
                {formatCurrency(crypto.marketCap)}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <div className="font-mono">{formatCurrency(crypto.volume24h)}</div>
                <div className="text-text-secondary text-sm">{formatSupply(crypto.volume24hNative)} {crypto.symbol}</div>
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <div className="font-mono">{formatSupply(crypto.circulatingSupply)} {crypto.symbol}</div>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="sparkline h-10 min-w-[120px]">
                  <svg viewBox="0 0 120 40" className="w-full h-full">
                    <path
                      d={crypto.chartPath}
                      fill="none"
                      stroke={crypto.percentChange7d >= 0 ? "#10B981" : "#EF4444"}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoTable;