import { Component, ViewChild }   from '@angular/core';
import { SplashScreen }           from '@ionic-native/splash-screen';
import { StatusBar }              from '@ionic-native/status-bar';
import { TranslateService }       from '@ngx-translate/core';
import { Config, Nav, Platform }  from 'ionic-angular';
import { FirstRunPage }           from '../pages/pages';

@Component({
    template: `
        <ion-menu [content]="content">
            <ion-header>
              <ion-toolbar>
                <ion-title>Pages</ion-title>
              </ion-toolbar>
            </ion-header>
        
            <ion-content>
              <ion-list>
                <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p.component)">
                  {{p.title}}
                </button>
              </ion-list>
            </ion-content>
    
        </ion-menu>
        <ion-nav #content [root]="rootPage"></ion-nav>
        `
})
export class MyApp {
    rootPage = FirstRunPage;

    @ViewChild(Nav) nav: Nav;


    pages:any[] = [
        {title: 'login', component: 'LoginPage'},
        {title: 'order_list', component: 'OrderListPage'},
        {title: 'order_detail', component: 'OrderDetailPage'},
        {title: 'order_map', component: 'OrderMapPage'},
        {title: 'order_confirm', component: 'OrderConfirmPage'},
        {title: 'profile', component: 'ProfilePage'},
        {title: 'map', component: 'MapPage'},
        {title: 'main', component: 'MainPage'}
    ]

    constructor(
        private translate:TranslateService,
        private platform:Platform,
        private config:Config,
        private statusBar:StatusBar,
        private splashScreen:SplashScreen) {
            this.initTranslate();
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('ru'); // Set your language here
        }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page);
    }
}
