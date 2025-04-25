import { RocketIcon } from "lucide-react";

const CryptoHeader = () => {
  return (
    <header className="bg-surface border-b border-border py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <RocketIcon className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-xl font-bold">CryptoTracker</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-text-primary hover:text-primary">Dashboard</a>
          <a href="#" className="text-text-secondary hover:text-primary">Markets</a>
          <a href="#" className="text-text-secondary hover:text-primary">Portfolio</a>
          <a href="#" className="text-text-secondary hover:text-primary">News</a>
        </nav>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-surface-light rounded border border-border hover:bg-opacity-80">
            Sign In
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default CryptoHeader;