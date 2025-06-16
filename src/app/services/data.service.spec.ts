import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return organization stats', () => {
    const stats = service.getOrganizationStats();
    expect(stats).toBeDefined();
    expect(stats.countries).toBe(28);
    expect(stats.experience).toBe('16+');
  });

  it('should return main programs', () => {
    const programs = service.getMainPrograms();
    expect(programs).toBeDefined();
    expect(programs.length).toBe(4);
    expect(programs[0].name).toBe('Éducation & Formation');
  });

  it('should return countries of intervention', () => {
    const countries = service.getCountriesOfIntervention();
    expect(countries).toBeDefined();
    expect(countries['Afrique de l\'Ouest']).toBeDefined();
    expect(countries['Amérique du Sud']).toBeDefined();
  });

  it('should return impact stories', () => {
    const stories = service.getImpactStories();
    expect(stories).toBeDefined();
    expect(stories.length).toBeGreaterThan(0);
  });

  it('should return partners', () => {
    const partners = service.getPartners();
    expect(partners).toBeDefined();
    expect(partners.institutional).toBeDefined();
    expect(partners.foundations).toBeDefined();
  });
});
