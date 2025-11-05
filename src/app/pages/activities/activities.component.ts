import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { ActivityService } from '../../services/activity.service';
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
    private activityService: ActivityService
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
    this.isLoading = true;
    this.activityService.getAllActivities().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.activities = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.isLoading = false;
        // Fallback: empty array or show error message
        this.activities = [];
      }
    });
  }
}
