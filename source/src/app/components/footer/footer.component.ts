import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Language, LanguageService } from '../../services/language.service';

interface FooterContent {
  contactTitle: string;
  contactSubtitle: string;
  emailLabel: string;
  phoneLabel: string;
  locationLabel: string;
  locationValue: string;
  ctaTitle: string;
  ctaDescription: string;
  emailButton: string;
  linkedinButton: string;
  socialEmail: string;
  socialPhone: string;
  rightsReserved: string;
  madeWithPrefix: string;
  madeWithSuffix: string;
}

const CONTENT: Record<Language, FooterContent> = {
  es: {
    contactTitle: 'Hablamos?',
    contactSubtitle: 'Estoy disponible para nuevas oportunidades profesionales',
    emailLabel: 'Email',
    phoneLabel: 'Telefono',
    locationLabel: 'Ubicacion',
    locationValue: 'Oviedo, Asturias',
    ctaTitle: 'Contactame',
    ctaDescription:
      'Estoy disponible para discutir nuevas oportunidades en el ambito de la pedagogia laboral y social.',
    emailButton: 'Enviar Email',
    linkedinButton: 'LinkedIn',
    socialEmail: 'Email',
    socialPhone: 'Telefono',
    rightsReserved: 'Todos los derechos reservados.',
    madeWithPrefix: 'Hecho con',
    madeWithSuffix: 'y dedicacion'
  },
  en: {
    contactTitle: 'Let\'s talk',
    contactSubtitle: 'I am available for new professional opportunities',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    locationValue: 'Oviedo, Asturias',
    ctaTitle: 'Contact me',
    ctaDescription:
      'I am available to discuss new opportunities in occupational and social educational psychology.',
    emailButton: 'Send Email',
    linkedinButton: 'LinkedIn',
    socialEmail: 'Email',
    socialPhone: 'Phone',
    rightsReserved: 'All rights reserved.',
    madeWithPrefix: 'Made with',
    madeWithSuffix: 'and dedication'
  }
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly content: FooterContent;
  currentYear = new Date().getFullYear();

  constructor(private readonly languageService: LanguageService) {
    this.content = CONTENT[this.languageService.language];
  }
}
