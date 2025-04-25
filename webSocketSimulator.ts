import { AppDispatch } from '@/store/store';
import { 
  updateCryptoPrice, 
  updateCryptoPercentage,
  updateCryptoVolume
} from '@/store/cryptoSlice';
import { initialCryptoData } from '@/lib/constants';

export class WebSocketSimulator {
  private dispatch: AppDispatch;
  private intervalId: number | null = null;
  
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  
  connect() {
    // Simulate WebSocket connection and start receiving updates
    this.intervalId = window.setInterval(() => {
      this.simulateDataUpdates();
    }, 1000 + Math.random() * 1000); // Random interval between 1-2 seconds
    
    console.log('WebSocket simulator connected');
  }
  
  disconnect() {
    // Clear interval when component unmounts
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('WebSocket simulator disconnected');
    }
  }
  
  private simulateDataUpdates() {
    // Update each crypto with random price changes
    initialCryptoData.forEach(crypto => {
      this.simulatePriceUpdate(crypto.id, crypto.price);
      this.simulatePercentageUpdate(crypto.id, crypto.percentChange1h, crypto.percentChange24h, crypto.percentChange7d);
      this.simulateVolumeUpdate(crypto.id, crypto.volume24h, crypto.volume24hNative);
    });
  }
  
  private simulatePriceUpdate(id: string, basePrice: number) {
    // Generate random price fluctuation (±0.3%)
    const priceFluctuation = basePrice * (Math.random() * 0.006 - 0.003);
    const newPrice = basePrice + priceFluctuation;
    
    this.dispatch(updateCryptoPrice({
      id,
      price: newPrice
    }));
  }
  
  private simulatePercentageUpdate(id: string, h1: number, h24: number, d7: number) {
    // Generate random percentage fluctuations
    const h1Fluctuation = Math.random() * 0.2 - 0.1;
    const h24Fluctuation = Math.random() * 0.4 - 0.2;
    const d7Fluctuation = Math.random() * 0.3 - 0.15;
    
    this.dispatch(updateCryptoPercentage({
      id,
      percentChange1h: h1 + h1Fluctuation,
      percentChange24h: h24 + h24Fluctuation,
      percentChange7d: d7 + d7Fluctuation
    }));
  }
  
  private simulateVolumeUpdate(id: string, volume: number, volumeNative: number) {
    // Generate random volume fluctuation (±0.5%)
    const volumeFluctuation = volume * (Math.random() * 0.01 - 0.005);
    const newVolume = volume + volumeFluctuation;
    
    // Calculate native volume based on current price
    const crypto = initialCryptoData.find(c => c.id === id);
    if (!crypto) return;
    
    const newVolumeNative = newVolume / crypto.price;
    
    this.dispatch(updateCryptoVolume({
      id,
      volume24h: newVolume,
      volume24hNative: newVolumeNative
    }));
  }
}