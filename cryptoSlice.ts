import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { initialCryptoData } from '@/lib/constants';

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  logoSymbol: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  volume24hNative: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartPath: string;
  isFavorite: boolean;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface FilterOptions {
  searchTerm: string;
  showFavorites: boolean;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface CryptoState {
  data: Crypto[];
  sortConfig: SortConfig;
  filters: FilterOptions;
  pagination: PaginationState;
}

const initialState: CryptoState = {
  data: initialCryptoData,
  sortConfig: {
    key: 'marketCap',
    direction: 'desc'
  },
  filters: {
    searchTerm: '',
    showFavorites: false
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: initialCryptoData.length,
    totalPages: Math.ceil(initialCryptoData.length / 10)
  }
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string, price: number }>) => {
      const { id, price } = action.payload;
      const crypto = state.data.find(c => c.id === id);
      if (crypto) {
        crypto.price = price;
      }
    },
    updateCryptoPercentage: (state, action: PayloadAction<{ 
      id: string, 
      percentChange1h?: number, 
      percentChange24h?: number, 
      percentChange7d?: number
    }>) => {
      const { id, percentChange1h, percentChange24h, percentChange7d } = action.payload;
      const crypto = state.data.find(c => c.id === id);
      if (crypto) {
        if (percentChange1h !== undefined) crypto.percentChange1h = percentChange1h;
        if (percentChange24h !== undefined) crypto.percentChange24h = percentChange24h;
        if (percentChange7d !== undefined) crypto.percentChange7d = percentChange7d;
      }
    },
    updateCryptoVolume: (state, action: PayloadAction<{ id: string, volume24h: number, volume24hNative: number }>) => {
      const { id, volume24h, volume24hNative } = action.payload;
      const crypto = state.data.find(c => c.id === id);
      if (crypto) {
        crypto.volume24h = volume24h;
        crypto.volume24hNative = volume24hNative;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const crypto = state.data.find(c => c.id === id);
      if (crypto) {
        crypto.isFavorite = !crypto.isFavorite;
      }
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      
      // Reset to page 1 when search term changes
      state.pagination.currentPage = 1;
      
      // Update pagination based on filtered results
      const filteredCount = selectFilteredCryptos.resultFunc(state.data, state.filters);
      state.pagination.totalItems = filteredCount.length;
      state.pagination.totalPages = Math.ceil(filteredCount.length / state.pagination.itemsPerPage);
    },
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.filters.showFavorites = action.payload;
      
      // Reset to page 1 when filter changes
      state.pagination.currentPage = 1;
      
      // Update pagination based on filtered results
      const filteredCount = selectFilteredCryptos.resultFunc(state.data, state.filters);
      state.pagination.totalItems = filteredCount.length;
      state.pagination.totalPages = Math.ceil(filteredCount.length / state.pagination.itemsPerPage);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    }
  },
});

export const { 
  updateCryptoPrice, 
  updateCryptoPercentage, 
  updateCryptoVolume, 
  toggleFavorite, 
  setSortConfig,
  setSearchTerm,
  setShowFavorites,
  setCurrentPage
} = cryptoSlice.actions;

// Selectors
export const selectAllCryptosRaw = (state: RootState) => state.crypto.data;
export const selectSortConfig = (state: RootState) => state.crypto.sortConfig;
export const selectFilters = (state: RootState) => state.crypto.filters;
export const selectPagination = (state: RootState) => state.crypto.pagination;

// Filtered cryptos based on search term and favorites
export const selectFilteredCryptos = createSelector(
  [selectAllCryptosRaw, selectFilters],
  (cryptos, filters) => {
    let result = [...cryptos];
    
    // Apply search filter
    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      result = result.filter(crypto => 
        crypto.name.toLowerCase().includes(search) || 
        crypto.symbol.toLowerCase().includes(search)
      );
    }
    
    // Apply favorites filter
    if (filters.showFavorites) {
      result = result.filter(crypto => crypto.isFavorite);
    }
    
    return result;
  }
);

// Sorted cryptos after filtering
export const selectSortedCryptos = createSelector(
  [selectFilteredCryptos, selectSortConfig],
  (cryptos, sortConfig) => {
    const sortedCryptos = [...cryptos];
    
    sortedCryptos.sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof Crypto];
      let bValue: any = b[sortConfig.key as keyof Crypto];
      
      // Special case for name sorting - use name not symbol
      if (sortConfig.key === 'name') {
        aValue = a.name;
        bValue = b.name;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return sortedCryptos;
  }
);

// Paginated cryptos after sorting and filtering
export const selectAllCryptos = createSelector(
  [selectSortedCryptos, selectPagination],
  (cryptos, pagination) => {
    const { currentPage, itemsPerPage } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return cryptos.slice(startIndex, endIndex);
  }
);

export default cryptoSlice.reducer;