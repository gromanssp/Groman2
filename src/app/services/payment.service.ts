import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, orderBy, Timestamp } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

export interface Donation {
  id?: string;
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
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  async createDonation(amount: number, message?: string): Promise<string> {
    const user = this.authService.currentUser;
    const donation: Omit<Donation, 'id'> = {
      userId: user?.uid || 'anonymous',
      email: user?.email || 'anonymous',
      amount,
      currency: 'USD',
      status: 'pending',
      createdAt: new Date(),
      message
    };

    const docRef = await addDoc(collection(this.firestore, 'donations'), {
      ...donation,
      createdAt: Timestamp.fromDate(donation.createdAt)
    });
    return docRef.id;
  }

  async completeDonation(donationId: string): Promise<void> {
    const { doc, updateDoc } = await import('@angular/fire/firestore');
    const donationRef = doc(this.firestore, 'donations', donationId);
    await updateDoc(donationRef, { status: 'completed' });
  }

  async getUserDonations(): Promise<Donation[]> {
    const user = this.authService.currentUser;
    if (!user) return [];

    const q = query(
      collection(this.firestore, 'donations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: (d.data()['createdAt'] as Timestamp).toDate()
    } as Donation));
  }

  async getTotalDonations(): Promise<number> {
    const q = query(
      collection(this.firestore, 'donations'),
      where('status', '==', 'completed')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.reduce((sum, d) => sum + (d.data()['amount'] as number), 0);
  }
}
