import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  values = [
    {
      icon: 'fas fa-users',
      title: 'Unité',
      description: `Ensemble Nous pouvons, le développement est une construction sociale,
chacun a un rôle à jouer. Nous sommes attachés la philosophie de l'Ubuntu, Et nous
prônons la solidarité en principe.`
    },
    {
      icon: 'fas fa-medal',
      title: 'Rigueur',
      description: `
      Chacun doit être exigent avec lui-même et s'obliger de produire le meilleur de
lui-même sans compromettre le devoir qui l'oblige envers sa communauté.
      `
    },
    {
      icon: 'fas fa-trophy',
      title: 'Excellence ',
      description: `
      Chaque action quoique restant perfectible, doit viser et produire toujours
le meilleur résultat possible.
      `
    },
  ];
  timeline = [
    {
      year: '2012',
      title: 'La Révolution, oser passer en action',
      description: `
      Des jeunes fondent le CJACO pour faire échec
au VIH/SIDA en responsabilisant les
communautés sur le danger et la prévention
de cette ennemi commun.
      `
    },
    {
      year: '2016',
      title: 'La vocation nationale',
      description: `
      Le Collectif des Jeunes Ambassadeurs du
      Congo ouvre des actions à Kinshasa et à
      Lubumbashi, et le siège national s’établi à
      Kinshasa.
      `
    },
    {
      year: '2021',
      title: 'Le Leadership transformationnel à l’œuvre',
      description: `
      10 ans depuis que cette initiative a vu le jour,
      et ayant connu diverses expériences en
      interne comme en externe, le CJAKOR, a jugé
      opportun de revoir son positionnement, sa
      dénomination (pour soutenir sa portée
      nationale), sa stratégie, sa formation, et de
      revisiter ses objectifs.
      `
    },
    {
      year: '2022',
      title: 'Les premiers pas dans des rtenariats subventionnés',
      description: `
      Le CJACO débute son expérience dans des
      contrats de subvention, et multiplie les actions
      de terrain.
      `
    },
    {
      year: '2024',
      title: 'Devenir grand : une action, une perspective',
      description: `
      Faire encore mieux qu’hier, Revisitation des
      documents d’organisations, des objectifs et
      premières missions d’audit externe. Ouverture
      au réseau des agences des Nations Unies et
      participations à des conférences
      internationales.
      `
    }, 
  ]; 

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'À Propos de CJACO - Notre Mission, Vision et Valeurs | ONG',
      description: 'Découvrez l\'histoire, la mission et les valeurs de CJACO. Depuis 2008, nous œuvrons pour le développement durable et l\'amélioration des conditions de vie des communautés.',
      keywords: 'CJACO histoire, mission ONG, valeurs humanitaires, développement durable, organisation caritative',
      type: 'article',
      url: 'https://cjaco.org/about'
    });
  }
}
