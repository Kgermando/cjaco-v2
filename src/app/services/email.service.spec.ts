import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate email format correctly', () => {
    const validEmail = { name: 'Test', email: 'test@example.com', subject: 'Test subject', message: 'Test message content' };
    const invalidEmail = { name: 'Test', email: 'invalid-email', subject: 'Test subject', message: 'Test message content' };

    const validResult = service.validateForm(validEmail);
    const invalidResult = service.validateForm(invalidEmail);

    expect(validResult.isValid).toBeTruthy();
    expect(invalidResult.isValid).toBeFalsy();
    expect(invalidResult.errors.length).toBeGreaterThan(0);
  });
});
