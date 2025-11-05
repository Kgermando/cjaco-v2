import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { SeoService } from '../../../services/seo.service';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { Activity } from '../../../models/activity.interface';


@Component({
  selector: 'app-activity-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.scss'
})
export class ActivityViewComponent implements OnInit, OnDestroy {
  activity: Activity | null = null;
  relatedActivities: Activity[] = [];
  isLoading = true;
  selectedGalleryIndex = 0;
  showGalleryModal = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Scroll to top on init (check if window exists for SSR compatibility)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const activityId = params['title'] || params['id'];
        if (activityId) {
          this.loadActivity(activityId);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadActivity(slug: string) {
    this.isLoading = true;
    
    this.activityService.getActivityBySlug(slug).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.activity = response.data;
          
          // Load related activities
          this.loadRelatedActivities();
          
          // Update SEO
          this.updateSEO();
        } else {
          // Activity not found, redirect to activities page
          this.router.navigate(['/activities']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activity:', error);
        this.isLoading = false;
        // Redirect to activities page on error
        this.router.navigate(['/activities']);
      }
    });
  }

  loadRelatedActivities() {
    if (this.activity?.relatedActivities && this.activity.relatedActivities.length > 0) {
      // Load all related activities in parallel
      const relatedRequests = this.activity.relatedActivities.map(slug => 
        this.activityService.getActivityBySlug(slug)
      );
      
      forkJoin(relatedRequests).subscribe({
        next: (responses) => {
          this.relatedActivities = responses
            .filter(response => response.status === 'success' && response.data)
            .map(response => response.data);
        },
        error: (error) => {
          console.error('Error loading related activities:', error);
          this.relatedActivities = [];
        }
      });
    }
  }

  updateSEO() {
    if (this.activity) {
      this.seoService.updateSEO({
        title: `${this.activity.title} - CJACO`,
        description: this.activity.shortDescription,
        keywords: `${this.activity.category}, ${this.activity.title}, CJACO, projet humanitaire`,
        type: 'article',
        url: `https://cjaco.org/activities/${this.activity.slug}`,
        image: this.activity.image
      });
    }
  }

  scrollToSection(sectionId: string) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  openGallery(index: number) {
    this.selectedGalleryIndex = index;
    this.showGalleryModal = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeGallery() {
    this.showGalleryModal = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  nextImage() {
    if (this.activity?.gallery) {
      this.selectedGalleryIndex = (this.selectedGalleryIndex + 1) % this.activity.gallery.length;
    }
  }

  previousImage() {
    if (this.activity?.gallery) {
      this.selectedGalleryIndex = this.selectedGalleryIndex === 0 
        ? this.activity.gallery.length - 1 
        : this.selectedGalleryIndex - 1;
    }
  }

  shareOnSocialMedia(platform: string) {
    if (!this.activity || typeof window === 'undefined') return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.activity.title);
    const text = encodeURIComponent(this.activity.shortDescription);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  hasContent(field: any): boolean {
    return field && (Array.isArray(field) ? field.length > 0 : true);
  }
}
