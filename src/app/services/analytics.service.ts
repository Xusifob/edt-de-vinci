import {Injectable} from '@angular/core';



declare var ga:Function;


@Injectable()
export class GoogleAnalyticsService {


    /**
     *
     * @param view
     */
    static trackView(view)
    {
        console.log('track',view);
        ga('send', 'pageview', view);
    }

    /**
     *
     * @param category
     * @param action
     * @param label
     * @param value
     */
    static trackEvent(category,action,label,value)
    {
        ga('send', 'event',category,action,label,value);
    }

}