import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
}

export default function SEO({
  title,
  description = "Google Developer Groups on Campus IET DAVV - Building the future one developer at a time. Join our community of passionate students learning and growing together through technology and innovation.",
  keywords = "GDGoC, Google Developer Groups, IET DAVV, programming, technology, events, workshops, students, developers, coding, web development, mobile development, AI, machine learning",
  canonical,
  image = "https://www.dscvit.com/newlogo.svg",
}: SEOProps) {
  useEffect(() => {
    // Update page title
    document.title = `${title} - GDGoC IET DAVV`;

    // Update or create meta tags
    const updateMetaTag = (
      property: string,
      content: string,
      isProperty = false,
    ) => {
      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "GDGoC IET DAVV");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph tags
    updateMetaTag("og:title", `${title} - GDGoC IET DAVV`, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", "GDGoC IET DAVV", true);
    updateMetaTag("og:locale", "en_US", true);

    if (canonical) {
      updateMetaTag("og:url", canonical, true);
    }

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", `${title} - GDGoC IET DAVV`);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Theme color for mobile browsers
    let themeColor = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.setAttribute("name", "theme-color");
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute("content", "#4285F4"); // GDSC Blue

    // Apple mobile web app tags
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "default");
    updateMetaTag("apple-mobile-web-app-title", "GDGoC IET DAVV");
  }, [title, description, keywords, canonical, image]);

  return null; // This component doesn't render anything
}
