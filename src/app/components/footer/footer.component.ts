import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService, NewsletterData } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  newsletterForm: NewsletterData = {
    email: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(private emailService: EmailService) {}

  onNewsletterSubmit() {
    // Validation basique de l'email
    if (!this.newsletterForm.email || !this.isValidEmail(this.newsletterForm.email)) {
      this.submitMessage = 'Veuillez entrer une adresse email valide';
      this.submitSuccess = false;
      this.clearMessageAfterDelay();
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    // Envoi de l'abonnement newsletter
    this.emailService.subscribeToNewsletter(this.newsletterForm).subscribe({
      next: (response) => {
        console.log('Abonnement newsletter réussi:', response);
        this.submitMessage = 'Merci ! Vous êtes maintenant abonné(e) à notre newsletter.';
        this.submitSuccess = true;
        this.newsletterForm.email = '';
        this.isSubmitting = false;
        this.clearMessageAfterDelay();
      },
      error: (error) => {
        console.error('Erreur lors de l\'abonnement newsletter:', error);
        this.submitMessage = 'Une erreur est survenue. Veuillez réessayer.';
        this.submitSuccess = false;
        this.isSubmitting = false;
        this.clearMessageAfterDelay();
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.submitMessage = '';
    }, 5000);
  }
}
