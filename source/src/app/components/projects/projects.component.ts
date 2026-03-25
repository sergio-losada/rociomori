import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Language, LanguageService } from '../../services/language.service';

interface EducationItem {
  year: string;
  title: string;
  institution: string;
  description?: string;
}

interface ProjectsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  topRow: EducationItem[];
  bottomRow: EducationItem[];
}

const CONTENT: Record<Language, ProjectsContent> = {
  es: {
    sectionTitle: 'Formacion Academica',
    sectionSubtitle: 'Mi trayectoria educativa y desarrollo profesional',
    topRow: [
      {
        year: '2025',
        title: 'Cabin Crew Member Course',
        institution: 'Air Hostess Gijon'
      },
      {
        year: '2023',
        title: 'Master en Psicopedagogia Laboral y Social',
        institution: 'TECH Universidad Tecnologica'
      },
      {
        year: '2022',
        title: 'Grado en Pedagogia',
        institution: 'Universidad de Oviedo'
      }
    ],
    bottomRow: [
      {
        year: '2021',
        title: 'Apoyo Administrativo a la Gestion de RRHH',
        institution: 'Ministerio de Educacion, Cultura y Deporte'
      },
      {
        year: '2020',
        title: 'Curso Autismo e Hiperactividad',
        institution: 'Cruz Roja'
      }
    ]
  },
  en: {
    sectionTitle: 'Academic Education',
    sectionSubtitle: 'My educational background and professional development',
    topRow: [
      {
        year: '2025',
        title: 'Cabin Crew Member Course',
        institution: 'Air Hostess Gijon'
      },
      {
        year: '2023',
        title: "Master's Degree in Occupational and Social Educational Psychology",
        institution: 'TECH Universidad Tecnologica'
      },
      {
        year: '2022',
        title: "Bachelor's Degree in Pedagogy",
        institution: 'University of Oviedo'
      }
    ],
    bottomRow: [
      {
        year: '2021',
        title: 'Administrative Support for HR Management',
        institution: 'Spanish Ministry of Education, Culture and Sports'
      },
      {
        year: '2020',
        title: 'Autism and Hyperactivity Course',
        institution: 'Cruz Roja'
      }
    ]
  }
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly content: ProjectsContent;
  readonly formacionTopRow: EducationItem[];
  readonly formacionBottomRow: EducationItem[];

  constructor(private readonly languageService: LanguageService) {
    this.content = CONTENT[this.languageService.language];
    this.formacionTopRow = this.content.topRow;
    this.formacionBottomRow = this.content.bottomRow;
  }
}
