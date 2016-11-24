import { TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';


export function CreateTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}