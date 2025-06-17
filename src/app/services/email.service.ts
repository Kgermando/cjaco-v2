import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

// Interface pour les données du formulaire de contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  // Configuration EmailJS - vous devrez créer un compte sur emailjs.com
  private emailJSConfig = {
    serviceId: 'service_cjaco', // À remplacer par votre Service ID
    templateId: 'template_cjaco', // À remplacer par votre Template ID
    publicKey: '0_iul0QdC3eC3-T1k' // À remplacer par votre Public Key
  };

  constructor() { }

  /**
   * Envoie un email via EmailJS
   */
  sendEmail(formData: ContactFormData): Observable<any> {
    // Import dynamique d'EmailJS pour éviter les erreurs SSR
    return from(this.sendEmailInternal(formData));
  }

  private async sendEmailInternal(formData: ContactFormData): Promise<any> {
    try {
      // Import dynamique d'EmailJS
      const emailjs = await import('emailjs-com');
      
      // Préparation des données du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'contact@cjaco.org',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };

      // Envoi de l'email
      const response = await emailjs.send(
        this.emailJSConfig.serviceId,
        this.emailJSConfig.templateId,
        templateParams,
        this.emailJSConfig.publicKey
      );

      return response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  }

  /**
   * Alternative: Envoi via une API backend (recommandé pour la production)
   */
  sendEmailViaBackend(formData: ContactFormData): Observable<any> {
    // Cette méthode pourrait être utilisée si vous avez une API backend
    // qui gère l'envoi d'emails
    return from(fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        to: 'contact@cjaco.org'
      })
    }).then(response => response.json()));
  }

  /**
   * Validation basique du formulaire
   */
  validateForm(formData: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }

    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.push('Veuillez entrer une adresse email valide');
    }

    if (!formData.subject || formData.subject.trim().length < 3) {
      errors.push('Le sujet doit contenir au moins 3 caractères');
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Le message doit contenir au moins 10 caractères');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
