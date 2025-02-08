import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SplashScreenService } from './services/splash-screen.service';

export const provideTheme = (): Array<Provider | EnvironmentProviders> => {
  const providers: Array<Provider | EnvironmentProviders> = [
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
    importProvidersFrom(MatDialogModule),
    provideEnvironmentInitializer(() => inject(SplashScreenService)),
  ];

  return providers;
};
