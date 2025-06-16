import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-activities',
  imports: [CommonModule, RouterModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Nos Activités - CJACO | Programmes et Projets Humanitaires',
      description: 'Découvrez tous nos programmes et projets en cours : éducation, santé, environnement et développement durable.',
      keywords: 'projets CJACO, programmes humanitaires, éducation, santé, environnement',
      type: 'article',
      url: 'https://cjaco.org/activities'
    });
  }
}
