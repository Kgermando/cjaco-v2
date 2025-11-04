import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { Activity } from '../../models/activity.interface';

@Component({
  selector: 'app-activities',
  imports: [CommonModule, RouterModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  isLoading = true;

  constructor(
    private seoService: SeoService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadActivities();
    this.seoService.updateSEO({
      title: 'Nos Activités - CJACO | Programmes et Projets Humanitaires',
      description: 'Découvrez tous nos programmes et projets en cours : éducation, santé, environnement et développement durable.',
      keywords: 'projets CJACO, programmes humanitaires, éducation, santé, environnement',
      type: 'article',
      url: 'https://cjaco.org/activities'
    });
  }

  loadActivities() {
    // Simulate async call (ready for backend integration)
    setTimeout(() => {
      this.activities = this.dataService.getActivities() as Activity[];
      this.isLoading = false;
    }, 300);
  }
}
