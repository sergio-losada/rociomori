import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Language, LanguageService } from '../../services/language.service';

interface ProfileContent {
  greeting: string;
  role: string;
  location: string;
  descriptionPrimary: string;
  descriptionSecondary: string;
  contactButton: string;
  competenciesTitle: string;
  competencies: string[];
  languagesTitle: string;
  nativeLanguageName: string;
  nativeLanguageLevel: string;
  englishLanguageName: string;
  englishLanguageLevel: string;
  englishCertification: string;
  otherDataTitle: string;
  volunteeringLabel: string;
  volunteeringDescription: string;
  drivingLicenseLabel: string;
  drivingLicenseDescription: string;
  imageAlt: string;
}

const CONTENT: Record<Language, ProfileContent> = {
  es: {
    greeting: 'Hola! Soy',
    role: 'Cabin Crew Member & Psicopedagoga',
    location: 'Oviedo, Asturias',
    descriptionPrimary:
      'Profesional de la pedagogia con grandes habilidades comunicativas y ganas de incorporarme al mundo laboral de manera plena, con el fin de ir adquiriendo la experiencia necesaria para lograr mis metas.',
    descriptionSecondary:
      'Poder dedicarme de lleno a la Pedagogia Laboral, estando interesada tanto en el area de formacion de personal como en la seleccion de personal y gestion del talento del mismo.',
    contactButton: 'Contactar',
    competenciesTitle: 'Competencias Clave',
    competencies: [
      'Conocimiento',
      'Trabajo en Equipo',
      'Informacion',
      'Creatividad',
      'Comunicacion',
      'Negociacion'
    ],
    languagesTitle: 'Idiomas',
    nativeLanguageName: 'Espanol',
    nativeLanguageLevel: 'Nativo',
    englishLanguageName: 'Ingles',
    englishLanguageLevel: 'Intermedio (B2)',
    englishCertification: 'Certificado EBAU',
    otherDataTitle: 'Otros Datos',
    volunteeringLabel: 'Voluntariado',
    volunteeringDescription: 'Sindrome de Down Principado de Asturias (2020)',
    drivingLicenseLabel: 'Carnet de Conducir',
    drivingLicenseDescription: 'Permiso B',
    imageAlt: 'Rocio A. Mori Balsamo'
  },
  en: {
    greeting: 'Hi! I am',
    role: 'Cabin Crew Member & Educational Psychologist',
    location: 'Oviedo, Asturias',
    descriptionPrimary:
      'Educational professional with strong communication skills and a clear motivation to fully join the labor market, gaining the experience needed to achieve my professional goals.',
    descriptionSecondary:
      'I aim to focus fully on Occupational Educational Psychology, with a special interest in staff training, recruitment, and talent management.',
    contactButton: 'Contact',
    competenciesTitle: 'Key Competencies',
    competencies: ['Knowledge', 'Teamwork', 'Information', 'Creativity', 'Communication', 'Negotiation'],
    languagesTitle: 'Languages',
    nativeLanguageName: 'Spanish',
    nativeLanguageLevel: 'Native',
    englishLanguageName: 'English',
    englishLanguageLevel: 'Intermediate (B2)',
    englishCertification: 'EBAU Certificate',
    otherDataTitle: 'Additional Information',
    volunteeringLabel: 'Volunteering',
    volunteeringDescription: 'Sindrome de Down Principado de Asturias (2020)',
    drivingLicenseLabel: 'Driving License',
    drivingLicenseDescription: 'Category B',
    imageAlt: 'Rocio A. Mori Balsamo'
  }
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly content: ProfileContent;

  constructor(private readonly languageService: LanguageService) {
    this.content = CONTENT[this.languageService.language];
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
