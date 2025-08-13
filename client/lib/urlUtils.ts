/**
 * URL validation and handling utilities
 */

export const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const ensureHttps = (url: string): string => {
  if (!url || url.trim() === '') return '';
  
  const trimmedUrl = url.trim();
  
  // If it already has protocol, return as is
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    return trimmedUrl;
  }
  
  // Add https:// if no protocol
  return `https://${trimmedUrl}`;
};

export const validateAndFormatUrl = (url: string): string | null => {
  if (!url || url.trim() === '') return null;
  
  const formattedUrl = ensureHttps(url);
  
  if (isValidUrl(formattedUrl)) {
    return formattedUrl;
  }
  
  return null;
};

export const openExternalLink = (url: string, event?: React.MouseEvent): void => {
  event?.preventDefault();
  
  const validUrl = validateAndFormatUrl(url);
  if (validUrl) {
    window.open(validUrl, '_blank', 'noopener,noreferrer');
  } else {
    console.error('Invalid URL:', url);
  }
};

export const handleLinkClick = (url: string) => (event: React.MouseEvent) => {
  openExternalLink(url, event);
};
