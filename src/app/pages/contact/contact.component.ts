import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { EmailService, ContactFormData } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  contactForm: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private seoService: SeoService,
    private emailService: EmailService
  ) { }

  ngOnInit() {    this.seoService.updateSEO({
      title: 'Contactez CJACO - Partenariats et Coopération | ONG Développement',
      description: 'Contactez CJACO pour vos projets de développement durable, partenariats institutionnels ou questions sur nos programmes en Afrique et Amérique latine.',
      keywords: 'contact CJACO, partenariat ONG, coopération internationale, développement durable, projets humanitaires',
      type: 'article',
      url: 'https://cjaco.org/contact'
    });
  }
  onSubmit() {
    // Validation du formulaire
    const validation = this.emailService.validateForm(this.contactForm);
    
    if (!validation.isValid) {
      this.submitMessage = validation.errors.join('\n');
      this.submitSuccess = false;
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    // Envoi de l'email
    this.emailService.sendEmail(this.contactForm).subscribe({
      next: (response) => {
        console.log('Email envoyé avec succès:', response);
        this.submitMessage = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
        this.submitSuccess = true;
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        this.submitMessage = 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ou nous contacter directement par email.';
        this.submitSuccess = false;
        this.isSubmitting = false;
      }
    });
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
