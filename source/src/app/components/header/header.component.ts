import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language, LanguageService } from '../../services/language.service';

interface HeaderContent {
  subtitle: string;
  navigation: {
    about: string;
    experience: string;
    education: string;
    contact: string;
  };
}

const CONTENT: Record<Language, HeaderContent> = {
  es: {
    subtitle: 'Cabin Crew Member & Psicopedagoga',
    navigation: {
      about: 'Sobre Mi',
      experience: 'Experiencia',
      education: 'Formacion',
      contact: 'Contacto'
    }
  },
  en: {
    subtitle: 'Cabin Crew Member & Educational Psychologist',
    navigation: {
      about: 'About Me',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact'
    }
  }
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;

  readonly currentLanguage: Language;
  readonly content: HeaderContent;

  constructor(private readonly languageService: LanguageService) {
    this.currentLanguage = this.languageService.language;
    this.content = CONTENT[this.currentLanguage];
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    this.isMenuOpen = false;
  }

  setLanguage(language: Language, event: Event): void {
    event.preventDefault();
    this.languageService.switchLanguage(language);
  }
}
