import { Coins, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAllCryptosRaw } from "@/store/cryptoSlice";
import { formatCurrency } from "@/utils/formatters";

const CryptoStatsBar = () => {
  const cryptos = useSelector(selectAllCryptosRaw);
  
  // Calculate global market statistics
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.marketCap, 0);
  const total24hVolume = cryptos.reduce((sum, crypto) => sum + crypto.volume24h, 0);
  
  // Calculate overall market sentiment (up or down)
  const marketTrend = cryptos.reduce((sum, crypto) => sum + crypto.percentChange24h, 0) / cryptos.length;
  
  return (
    <div className="bg-surface-light py-3 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Coins className="h-5 w-5 text-primary mr-2" />
            <div>
              <div className="text-text-secondary text-sm">Total Market Cap</div>
              <div className="text-text-primary font-medium">{formatCurrency(totalMarketCap)}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-primary mr-2" />
            <div>
              <div className="text-text-secondary text-sm">24h Volume</div>
              <div className="text-text-primary font-medium">{formatCurrency(total24hVolume)}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="h-5 w-5 text-primary mr-2" />
            <div>
              <div className="text-text-secondary text-sm">Active Cryptocurrencies</div>
              <div className="text-text-primary font-medium">{cryptos.length}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            {marketTrend >= 0 ? (
              <ArrowUpRight className="h-5 w-5 text-green mr-2" />
            ) : (
              <ArrowDownRight className="h-5 w-5 text-red mr-2" />
            )}
            <div>
              <div className="text-text-secondary text-sm">Market Trend (24h)</div>
              <div className={`font-medium ${marketTrend >= 0 ? 'text-green' : 'text-red'}`}>
                {marketTrend >= 0 ? '+' : ''}{marketTrend.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoStatsBar;