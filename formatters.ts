/**
 * Format a number as currency
 * @param value Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  // If value is in billions, format as $X.XXB
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  
  // If value is in millions, format as $X.XXM
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  
  // If value is less than 1, show more decimal places
  if (value < 1) {
    return `$${value.toFixed(4)}`;
  }
  
  // Default formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a percentage with a + or - sign
 * @param value Percentage value
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  const formattedValue = value.toFixed(2);
  if (value > 0) {
    return `+${formattedValue}%`;
  } else if (value < 0) {
    return `${formattedValue}%`;
  }
  return `0.00%`;
};

/**
 * Format supply values (e.g., 19.85M BTC)
 * @param value Supply value
 * @returns Formatted supply string
 */
export const formatSupply = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  
  return value.toFixed(2);
};