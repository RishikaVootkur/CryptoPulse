import { RocketIcon, Github, Twitter } from "lucide-react";

const CryptoFooter = () => {
  return (
    <footer className="bg-surface border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <RocketIcon className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-bold">CryptoTracker</h3>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Real-time cryptocurrency price tracker with portfolio management tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">API Reference</a></li>
              <li><a href="#" className="hover:text-primary">Market Data</a></li>
              <li><a href="#" className="hover:text-primary">Trading Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Press Kit</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} CryptoTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default CryptoFooter;