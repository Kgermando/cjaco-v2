import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-donate',
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {
  // Montants prédéfinis
  predefinedAmounts: number[] = [25, 50, 100, 250, 500, 1000];
    // Variables du formulaire
  selectedAmount: number | null = null;
  customAmount: number | null = null;
  selectedPaymentMethod: string = '';
  selectedMobileOperator: string = '';
  referenceCode: string = '';
  
  // Informations du donateur
  donorInfo: DonorInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor() {}

  // Sélectionner un montant prédéfini
  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  // Gérer le changement de montant personnalisé
  onCustomAmountChange(): void {
    if (this.customAmount && this.customAmount > 0) {
      this.selectedAmount = null;
    }
  }

  // Obtenir le montant total
  getTotalAmount(): number {
    if (this.customAmount && this.customAmount > 0) {
      return this.customAmount;
    }
    return this.selectedAmount || 0;
  }

  // Obtenir le code de l'opérateur mobile sélectionné
  getOperatorCode(): string {
    switch (this.selectedMobileOperator) {
      case 'orange-money':
        return '*144#';
      case 'vodacom-mpesa':
        return '*1122#';
      case 'airtel-money':
        return '*501#';
      default:
        return '*000#';
    }
  }

  // Gérer le changement de méthode de paiement
  onPaymentMethodChange(): void {
    // Réinitialiser l'opérateur mobile si on change de méthode
    if (this.selectedPaymentMethod !== 'mobile-money') {
      this.selectedMobileOperator = '';
    }
  }

  // Obtenir la date actuelle pour la référence
  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.isFormValid()) {
      const donationData = {
        amount: this.getTotalAmount(),
        paymentMethod: this.selectedPaymentMethod,
        mobileOperator: this.selectedMobileOperator,
        donor: this.donorInfo,
        date: new Date().toISOString(),
        reference: `DON-CJACO-${this.getCurrentDate()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      console.log('Données de don:', donationData);

      // Ici, vous pouvez traiter le don selon la méthode de paiement
      this.processDonation(donationData);
    }
  }

  // Vérifier si le formulaire est valide
  private isFormValid(): boolean {
    return !!(
      this.getTotalAmount() > 0 &&
      this.selectedPaymentMethod &&
      this.donorInfo.firstName &&
      this.donorInfo.lastName &&
      this.donorInfo.email
    );
  }

  // Traiter le don selon la méthode de paiement
  private processDonation(donationData: any): void {
    switch (donationData.paymentMethod) {
      case 'bank-transfer':
        this.processBankTransfer(donationData);
        break;
      case 'mobile-money':
        this.processMobileMoney(donationData);
        break;
      case 'paypal':
        this.processPayPal(donationData);
        break;
      case 'credit-card':
        this.processCreditCard(donationData);
        break;
      default:
        alert('Méthode de paiement non reconnue');
    }
  }

  // Traiter le virement bancaire
  private processBankTransfer(donationData: any): void {
    alert(`Merci ${donationData.donor.firstName} ! Votre demande de don de ${donationData.amount} USD a été enregistrée. 
    
Veuillez effectuer le virement bancaire avec la référence : ${donationData.reference}
    
Vous recevrez une confirmation par email une fois le paiement reçu.`);
    
    // Envoyer les détails par email (simulation)
    this.sendConfirmationEmail(donationData);
  }

  // Traiter Mobile Money
  private processMobileMoney(donationData: any): void {
    const operatorInfo = this.getMobileOperatorInfo(donationData.mobileOperator);
    
    alert(`Merci ${donationData.donor.firstName} ! 
    
Pour finaliser votre don de ${donationData.amount} USD via ${operatorInfo.name} :
    
${operatorInfo.instructions}
    
Référence : ${donationData.reference}`);
    
    this.sendConfirmationEmail(donationData);
  }

  // Traiter PayPal
  private processPayPal(donationData: any): void {
    alert(`Redirection vers PayPal pour finaliser votre don de ${donationData.amount} USD...`);
    // Ici, vous pourriez rediriger vers l'API PayPal
    // window.location.href = `https://paypal.com/...`;
  }

  // Traiter carte de crédit
  private processCreditCard(donationData: any): void {
    alert(`Redirection vers le processeur de paiement sécurisé pour votre don de ${donationData.amount} USD...`);
    // Ici, vous pourriez rediriger vers Stripe, Square, etc.
  }

  // Obtenir les informations de l'opérateur mobile
  private getMobileOperatorInfo(operator: string): { name: string; instructions: string } {
    const operators = {
      'orange-money': {
        name: 'Orange Money',
        instructions: `1. Composez #144#
2. Sélectionnez "Transfert d'argent"
3. Entrez le numéro : +243 89 XXX XXXX
4. Montant : ${this.getTotalAmount()} USD
5. Confirmez avec votre code PIN`
      },
      'vodacom-mpesa': {
        name: 'Vodacom M-Pesa',
        instructions: `1. Composez *555#
2. Sélectionnez "Envoyer de l'argent"
3. Entrez le numéro : +243 81 XXX XXXX
4. Montant : ${this.getTotalAmount()} USD
5. Confirmez avec votre code PIN`
      },
      'airtel-money': {
        name: 'Airtel Money',
        instructions: `1. Composez *501#
2. Sélectionnez "Transfert"
3. Entrez le numéro : +243 97 XXX XXXX
4. Montant : ${this.getTotalAmount()} USD
5. Confirmez avec votre code PIN`
      }
    };

    return operators[operator as keyof typeof operators] || { name: 'Opérateur inconnu', instructions: '' };
  }

  // Simuler l'envoi d'email de confirmation
  private sendConfirmationEmail(donationData: any): void {
    // Ici, vous pourriez intégrer un service d'email comme EmailJS
    console.log('Email de confirmation envoyé à :', donationData.donor.email);
    console.log('Données du don :', donationData);
  }
}
