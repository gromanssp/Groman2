import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private _user = new BehaviorSubject<User | null>(null);
  private _profile = new BehaviorSubject<UserProfile | null>(null);

  user$: Observable<User | null> = this._user.asObservable();
  profile$: Observable<UserProfile | null> = this._profile.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      this._user.next(user);
      if (user) {
        const profile = await this.getUserProfile(user.uid);
        this._profile.next(profile);
      } else {
        this._profile.next(null);
      }
    });
  }

  get currentUser(): User | null {
    return this._user.value;
  }

  get isAuthenticated(): boolean {
    return this._user.value !== null;
  }

  async register(email: string, password: string, displayName: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const profile: UserProfile = {
      uid: credential.user.uid,
      email,
      displayName,
      role: 'user',
      createdAt: new Date()
    };
    await setDoc(doc(this.firestore, 'users', credential.user.uid), profile);
    this._profile.next(profile);
    return credential.user;
  }

  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential.user;
  }

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    const exists = await this.getUserProfile(credential.user.uid);
    if (!exists) {
      const profile: UserProfile = {
        uid: credential.user.uid,
        email: credential.user.email || '',
        displayName: credential.user.displayName || '',
        role: 'user',
        createdAt: new Date()
      };
      await setDoc(doc(this.firestore, 'users', credential.user.uid), profile);
    }
    return credential.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this._user.next(null);
    this._profile.next(null);
  }

  private async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(this.firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  }
}
