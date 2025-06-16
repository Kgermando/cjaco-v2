import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private seoService: SeoService) { }

  ngOnInit() {    this.seoService.updateSEO({
      title: 'Contactez CJACO - Partenariats et Coopération | ONG Développement',
      description: 'Contactez CJACO pour vos projets de développement durable, partenariats institutionnels ou questions sur nos programmes en Afrique et Amérique latine.',
      keywords: 'contact CJACO, partenariat ONG, coopération internationale, développement durable, projets humanitaires',
      type: 'article',
      url: 'https://cjaco.org/contact'
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
  }
}
