import CryptoHeader from "@/components/CryptoHeader";
import CryptoStatsBar from "@/components/CryptoStatsBar";
import TableControls from "@/components/TableControls";
import CryptoTable from "@/components/CryptoTable";
import Pagination from "@/components/Pagination";
import CryptoFooter from "@/components/CryptoFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <CryptoHeader />
      <CryptoStatsBar />
      
      <main className="container mx-auto px-4 py-6">
        <TableControls />
        <CryptoTable />
        <Pagination />
      </main>
      
      <CryptoFooter />
    </div>
  );
};

export default Home;