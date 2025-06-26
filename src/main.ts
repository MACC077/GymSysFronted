import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import localeEnUs from '@angular/common/locales/en';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEsCo);//Manejar Moneda Local
registerLocaleData(localeEnUs);//Manejar Moneda Extranjera

// Detectar idioma/región del navegador
const userLocale = navigator.language || 'es-CO'; // ej. 'en-US', 'es-CO', 'fr-FR'

bootstrapApplication(App,{
  ...appConfig,
  providers:[
    ...(appConfig.providers || []),
    { provide: LOCALE_ID, useValue:userLocale}
  ]
}).catch((err) => console.error(err));

