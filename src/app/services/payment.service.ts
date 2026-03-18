import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

export interface Donation {
  id: string;
  userId: string;
  email: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private authService = inject(AuthService);

  async createDonation(amount: number, message?: string): Promise<string> {
    const user = this.authService.profile();
    const id = crypto.randomUUID();
    const donation: Donation = {
      id,
      userId: user?.uid || 'anonymous',
      email: user?.email || 'anonymous',
      amount,
      currency: 'USD',
      status: 'pending',
      createdAt: new Date(),
      message
    };
    const donations = this.getDonationsFromStorage();
    donations.push(donation);
    localStorage.setItem('groman-donations', JSON.stringify(donations));
    return id;
  }

  async completeDonation(donationId: string): Promise<void> {
    const donations = this.getDonationsFromStorage();
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      donation.status = 'completed';
      localStorage.setItem('groman-donations', JSON.stringify(donations));
    }
  }

  async getUserDonations(): Promise<Donation[]> {
    const user = this.authService.profile();
    if (!user) return [];
    return this.getDonationsFromStorage().filter(d => d.userId === user.uid);
  }

  async getTotalDonations(): Promise<number> {
    return this.getDonationsFromStorage()
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
  }

  private getDonationsFromStorage(): Donation[] {
    try {
      return JSON.parse(localStorage.getItem('groman-donations') || '[]');
    } catch {
      return [];
    }
  }
}
