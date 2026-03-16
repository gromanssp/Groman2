import { Component, Input, inject } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-donation-button',
  templateUrl: './donation-button.component.html',
  styleUrl: './donation-button.component.css'
})
export class DonationButtonComponent {
  @Input() compact = false;

  private paymentService = inject(PaymentService);

  expanded = false;
  selectedAmount = 0;
  customAmount = '';
  status: 'idle' | 'processing' | 'success' | 'error' = 'idle';
  statusMessage = '';

  toggleExpand(): void {
    this.expanded = !this.expanded;
    this.status = 'idle';
    this.statusMessage = '';
  }

  async onDonate(amount: number): Promise<void> {
    if (amount <= 0) return;
    this.selectedAmount = amount;
    this.status = 'processing';
    this.statusMessage = '';
    try {
      const donationId = await this.paymentService.createDonation(amount);
      await this.paymentService.completeDonation(donationId);
      this.status = 'success';
      this.statusMessage = `Thank you for your $${amount} donation!`;
    } catch {
      this.status = 'error';
      this.statusMessage = 'Donation failed. Please try again.';
    }
  }

  onCustomDonate(): void {
    const amount = parseFloat(this.customAmount);
    if (!isNaN(amount) && amount > 0) {
      this.onDonate(amount);
    }
  }
}
