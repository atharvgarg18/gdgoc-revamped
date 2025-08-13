// Scroll to top utility function
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Scroll to top immediately (no animation)
export const scrollToTopInstant = () => {
  window.scrollTo(0, 0);
};

// Custom hook for handling scroll to top on route changes
export const useScrollToTop = () => {
  return scrollToTopInstant;
};
