import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

export type Language = 'es' | 'en';

interface SeoContent {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

const STORAGE_KEY = 'preferred-language';

const SEO_CONTENT: Record<Language, SeoContent> = {
  es: {
    title: 'Rocio A. Mori Balsamo - Cabin Crew Member & Psicopedagoga',
    description:
      'Portafolio de Rocio A. Mori Balsamo, Cabin Crew Member y Psicopedagoga especializada en Psicopedagogia Laboral y Social. Experiencia en aviacion, atencion al pasajero, formacion y gestion de personas.',
    ogTitle: 'Rocio A. Mori Balsamo - Cabin Crew Member & Psicopedagoga',
    ogDescription:
      'Cabin Crew Member y Psicopedagoga con solidas habilidades comunicativas, experiencia en aviacion y especializacion en Psicopedagogia Laboral y Social.',
    twitterTitle: 'Rocio A. Mori Balsamo - Cabin Crew Member & Psicopedagoga',
    twitterDescription:
      'Cabin Crew Member y Psicopedagoga con solidas habilidades comunicativas, experiencia en aviacion y especializacion en Psicopedagogia Laboral y Social.'
  },
  en: {
    title: 'Rocio A. Mori Balsamo - Cabin Crew Member & Educational Psychologist',
    description:
      'Portfolio of Rocio A. Mori Balsamo, Cabin Crew Member and Educational Psychologist specialized in Occupational and Social Educational Psychology. Experience in aviation, passenger service, training, and people management.',
    ogTitle: 'Rocio A. Mori Balsamo - Cabin Crew Member & Educational Psychologist',
    ogDescription:
      'Cabin Crew Member and Educational Psychologist with strong communication skills, aviation experience, and specialization in Occupational and Social Educational Psychology.',
    twitterTitle: 'Rocio A. Mori Balsamo - Cabin Crew Member & Educational Psychologist',
    twitterDescription:
      'Cabin Crew Member and Educational Psychologist with strong communication skills, aviation experience, and specialization in Occupational and Social Educational Psychology.'
  }
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly language: Language;

  constructor() {
    const pathname = window.location.pathname;

    if (this.shouldAutoRedirectToEnglish(pathname)) {
      this.language = 'en';
      this.persistLanguage('en');
      this.applyLanguage('en');
      this.navigateToLanguage('en');
      return;
    }

    this.language = this.detectLanguageFromPath(pathname);
    this.persistLanguage(this.language);
    this.applyLanguage(this.language);
  }

  switchLanguage(targetLanguage: Language): void {
    if (targetLanguage === this.language) {
      return;
    }

    this.persistLanguage(targetLanguage);
    this.navigateToLanguage(targetLanguage);
  }

  private detectLanguageFromPath(pathname: string): Language {
    return pathname.toLowerCase().startsWith('/en') ? 'en' : 'es';
  }

  private navigateToLanguage(targetLanguage: Language): void {
    const hash = window.location.hash;
    const targetPath = targetLanguage === 'en' ? '/en/' : '/';
    window.location.assign(`${targetPath}${hash}`);
  }

  private shouldAutoRedirectToEnglish(pathname: string): boolean {
    if (!this.isHomePath(pathname) || this.isLocalhost()) {
      return false;
    }

    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage === 'en') {
      return true;
    }

    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('en');
  }

  private isHomePath(pathname: string): boolean {
    return pathname === '/' || pathname === '/index.html';
  }

  private isLocalhost(): boolean {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  }

  private getStoredLanguage(): Language | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'es' || value === 'en' ? value : null;
    } catch {
      return null;
    }
  }

  private persistLanguage(language: Language): void {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors (private mode, disabled storage, etc.)
    }
  }

  private applyLanguage(language: Language): void {
    this.document.documentElement.lang = language;
    this.updateSeo(language);
  }

  private updateSeo(language: Language): void {
    const seo = SEO_CONTENT[language];
    const baseUrl = this.getBaseUrl();
    const spanishUrl = `${baseUrl}/`;
    const englishUrl = `${baseUrl}/en/`;
    const currentUrl = language === 'en' ? englishUrl : spanishUrl;

    this.document.title = seo.title;

    this.setMeta('name', 'description', seo.description);
    this.setMeta('property', 'og:title', seo.ogTitle);
    this.setMeta('property', 'og:description', seo.ogDescription);
    this.setMeta('property', 'og:url', currentUrl);
    this.setMeta('name', 'twitter:title', seo.twitterTitle);
    this.setMeta('name', 'twitter:description', seo.twitterDescription);

    this.setLink('canonical', currentUrl);
    this.setLink('alternate', spanishUrl, 'es');
    this.setLink('alternate', englishUrl, 'en');
    this.setLink('alternate', spanishUrl, 'x-default');
  }

  private getBaseUrl(): string {
    const origin = window.location.origin;
    return origin.endsWith('/') ? origin.slice(0, -1) : origin;
  }

  private setMeta(attribute: 'name' | 'property', key: string, content: string): void {
    const selector = `meta[${attribute}="${key}"]`;
    let element = this.document.head.querySelector(selector) as HTMLMetaElement | null;

    if (!element) {
      element = this.document.createElement('meta');
      element.setAttribute(attribute, key);
      this.document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    let selector = `link[rel="${rel}"]`;
    if (hreflang) {
      selector += `[hreflang="${hreflang}"]`;
    }

    let element = this.document.head.querySelector(selector) as HTMLLinkElement | null;

    if (!element) {
      element = this.document.createElement('link');
      element.setAttribute('rel', rel);
      if (hreflang) {
        element.setAttribute('hreflang', hreflang);
      }
      this.document.head.appendChild(element);
    }

    element.setAttribute('href', href);
  }
}
