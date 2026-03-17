import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);

  displayName = '';
  email = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  avatarUrl = '';
  saveStatus: 'idle' | 'saved' | 'error' = 'idle';
  passwordStatus: 'idle' | 'saved' | 'mismatch' = 'idle';

  ngOnInit(): void {
    this.authService.profile$.subscribe(profile => {
      if (profile) {
        this.displayName = profile.displayName;
        this.email = profile.email;
        this.updateAvatarUrl();
      }
    });
  }

  updateAvatarUrl(): void {
    this.avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.displayName)}&size=96&background=6366f1&color=fff&bold=true`;
  }

  saveProfile(): void {
    this.updateAvatarUrl();
    this.saveStatus = 'saved';
    setTimeout(() => {
      this.saveStatus = 'idle';
    }, 2000);
  }

  savePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordStatus = 'mismatch';
      setTimeout(() => {
        this.passwordStatus = 'idle';
      }, 2000);
      return;
    }
    this.passwordStatus = 'saved';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    setTimeout(() => {
      this.passwordStatus = 'idle';
    }, 2000);
  }
}
