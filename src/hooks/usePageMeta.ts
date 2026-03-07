import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
}

export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    const baseUrl = 'https://payawalkyle.vercel.app';

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical ? `${baseUrl}${canonical}` : baseUrl);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical ? `${baseUrl}${canonical}` : baseUrl;

    return () => {
      document.title = 'Kyle Payawal | Fullstack Developer';
    };
  }, [title, description, canonical]);
}
