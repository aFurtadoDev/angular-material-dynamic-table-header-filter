import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppTranslationService {
  private onLanguageChanged = new Subject<string>();
  languageChanged$ = this.onLanguageChanged.asObservable();

  constructor(private translate: TranslateService) {
    this.addLanguages(['en', 'pt']);
    this.setDefaultLanguage('pt');
  }

  addLanguages(lang: string[]): void {
    this.translate.addLangs(lang);
  }

  setDefaultLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  getDefaultLanguage(): string {
    return this.translate.defaultLang;
  }

  getBrowserLanguage(): string {
    return this.translate.getBrowserLang();
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  getLoadedLanguages(): string[] {
    return this.translate.langs;
  }

  useBrowserLanguage(): string | void {
    const browserLang = this.getBrowserLanguage();

    if (browserLang.match(/en|pt/)) {
      this.changeLanguage(browserLang);
      return browserLang;
    }
  }

  useDefaultLangage(): string {
    return this.changeLanguage(null);
  }

  changeLanguage(language: string): string {
    if (!language) {
      language = this.getDefaultLanguage();
    }

    if (language !== this.translate.currentLang) {
      setTimeout(() => {
        this.translate.use(language);
        this.onLanguageChanged.next(language);
      });
    }

    return language;
  }

  getTranslation(
    key: string | Array<string>,
    interpolateParams?: object
  ): string | any {
    return this.translate.instant(key, interpolateParams);
  }

  getTranslationAsync(
    key: string | Array<string>,
    interpolateParams?: object
  ): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class TranslateLanguageLoader implements TranslateLoader {
  public getTranslation(lang: string): any {
    // console.log('TranslateLanguageLoader');
    // Note Dynamic require(variable) will not work. Require is always at compile time
    switch (lang) {
      case 'en':
        return of(require('src/app/assets/i18N/en.json'));
      // case 'fr':
      //   return of(require('../assets/locale/fr.json'));
      // case 'de':
      //   return of(require('../assets/locale/de.json'));
      case 'pt':
        return of(require('src/app/assets/i18N/pt.json'));
      // case 'ar':
      //   return of(require('../assets/locale/ar.json'));
      // case 'ko':
      //   return of(require('../assets/locale/ko.json'));
      default:
    }
  }
}
