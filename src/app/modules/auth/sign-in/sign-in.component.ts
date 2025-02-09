import { CommonModule } from '@angular/common';
import { Component, inject, viewChild, ViewEncapsulation } from '@angular/core';
import {
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(UntypedFormBuilder);

  signInNgForm = viewChild<NgForm>('signInNgForm');

  signInForm: UntypedFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.signInForm.disable();

    const response = await this._authService.signIn(this.signInForm.value);

    if (!response) {
      this.signInForm.enable();
      this.signInNgForm()?.resetForm();
      return;
    }

    this._authService.accessToken = response.token;
    const redirectURL =
      this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
      '/signed-in-redirect';

    this._router.navigateByUrl(redirectURL);
  }
}
