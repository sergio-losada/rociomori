import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Language, LanguageService } from '../../services/language.service';

interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  companyLogo?: string;
}

interface ExperienceContent {
  sectionTitle: string;
  sectionSubtitle: string;
  experienceData: Experience[];
}

const CONTENT: Record<Language, ExperienceContent> = {
  es: {
    sectionTitle: 'Experiencia Profesional',
    sectionSubtitle: 'Mi trayectoria en el ambito de la pedagogia y la formacion',
    experienceData: [
      {
        position: 'COO',
        company: 'Taxco Tortilleria',
        location: 'Gijon, Asturias',
        period: 'Ene. 2023 - Actualidad',
        responsibilities: [
          'Atencion al cliente',
          'Control de almacen',
          'Seleccion de personal',
          'Gestion de incidencias'
        ],
        companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT3vqX1zg3bd1FcBdwMBM-WkN0yGcChCX3jg&s'
      },
      {
        position: 'Formadora',
        company: 'PFS Grupo',
        location: 'Langreo, Asturias',
        period: 'Sept. 2022 - Nov. 2022',
        responsibilities: [
          'Diseno e imparticion del programa de "Competencias Clave II", dirigido a personas en riesgo de exclusion social',
          'Programa con competencias matematicas y linguisticas',
          'Realizacion de informes diarios y/o semanales'
        ],
        companyLogo: 'https://www.pfsgrupo.com/wp-content/uploads/2024/01/logo-pfs.jpg'
      },
      {
        position: 'Dependienta Sfera',
        company: 'Grupo El Corte Ingles',
        location: 'Oviedo, Asturias',
        period: 'Jun. 2022 - Sept. 2022\nNov. 2022 - Ene. 2023',
        responsibilities: [
          'Atencion y cobro a clientes',
          'Recepcion de mercancia y colocacion en tienda y/o almacen',
          'Encargada del probador y orden del mismo'
        ],
        companyLogo: 'https://res.cloudinary.com/westfielddg/image/upload/westfield-media/es/retailer/logos/ashaonrb9rrnlmrs1y0g.png'
      },
      {
        position: 'Practicas curriculares',
        company: 'Clinica Gardner',
        location: 'Gijon, Asturias',
        period: 'Nov. 2021 - Ene. 2022',
        responsibilities: [
          'Aplicacion de pruebas diagnosticas',
          'Elaboracion de informes diagnosticos',
          'Diseno de sesiones y materiales propios de trabajo'
        ],
        companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2kem5LRa2ph6Sj_hgwvFoDPUpHjkvWicjIw&s'
      },
      {
        position: 'Profesora de extraescolares',
        company: 'Alventus',
        location: 'Oviedo, Asturias',
        period: 'Oct. 2019 - Mar. 2020',
        responsibilities: ['Diseno de sesiones de trabajo', 'Creacion de materiales', 'Evaluacion de resultados'],
        companyLogo:
          'https://media.licdn.com/dms/image/v2/C4D0BAQGYjkUnu6_IqQ/company-logo_200_200/company-logo_200_200/0/1630555622662/alventus_servicios_ocio_educativos_logo?e=2147483647&v=beta&t=4v8UNTrA62PxqjibFaVI4FE5-Hd1YfNAxORv_uYy-SA'
      }
    ]
  },
  en: {
    sectionTitle: 'Professional Experience',
    sectionSubtitle: 'My career path in pedagogy and training',
    experienceData: [
      {
        position: 'COO',
        company: 'Taxco Tortilleria',
        location: 'Gijon, Asturias',
        period: 'Jan. 2023 - Present',
        responsibilities: ['Customer service', 'Inventory control', 'Staff selection', 'Incident management'],
        companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT3vqX1zg3bd1FcBdwMBM-WkN0yGcChCX3jg&s'
      },
      {
        position: 'Trainer',
        company: 'PFS Grupo',
        location: 'Langreo, Asturias',
        period: 'Sep. 2022 - Nov. 2022',
        responsibilities: [
          'Designed and delivered the "Competencias Clave II" program for people at risk of social exclusion',
          'Program focused on math and language competencies',
          'Prepared daily and weekly progress reports'
        ],
        companyLogo: 'https://www.pfsgrupo.com/wp-content/uploads/2024/01/logo-pfs.jpg'
      },
      {
        position: 'Sfera Sales Assistant',
        company: 'Grupo El Corte Ingles',
        location: 'Oviedo, Asturias',
        period: 'Jun. 2022 - Sep. 2022\nNov. 2022 - Jan. 2023',
        responsibilities: [
          'Customer assistance and checkout operations',
          'Goods reception and placement in store and warehouse',
          'Managed fitting room operations and organization'
        ],
        companyLogo: 'https://res.cloudinary.com/westfielddg/image/upload/westfield-media/es/retailer/logos/ashaonrb9rrnlmrs1y0g.png'
      },
      {
        position: 'Curricular Internship',
        company: 'Clinica Gardner',
        location: 'Gijon, Asturias',
        period: 'Nov. 2021 - Jan. 2022',
        responsibilities: [
          'Administered diagnostic assessments',
          'Prepared diagnostic reports',
          'Designed sessions and customized work materials'
        ],
        companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2kem5LRa2ph6Sj_hgwvFoDPUpHjkvWicjIw&s'
      },
      {
        position: 'Extracurricular Activities Teacher',
        company: 'Alventus',
        location: 'Oviedo, Asturias',
        period: 'Oct. 2019 - Mar. 2020',
        responsibilities: ['Designed work sessions', 'Created materials', 'Evaluated outcomes'],
        companyLogo:
          'https://media.licdn.com/dms/image/v2/C4D0BAQGYjkUnu6_IqQ/company-logo_200_200/company-logo_200_200/0/1630555622662/alventus_servicios_ocio_educativos_logo?e=2147483647&v=beta&t=4v8UNTrA62PxqjibFaVI4FE5-Hd1YfNAxORv_uYy-SA'
      }
    ]
  }
};

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  readonly content: ExperienceContent;
  readonly experienceData: Experience[];

  constructor(private readonly languageService: LanguageService) {
    this.content = CONTENT[this.languageService.language];
    this.experienceData = this.content.experienceData;
  }
}
