import { Component }                   from '@angular/core';
import { IonicPage, NavController }    from 'ionic-angular';
import { Api }                         from '../../providers/api/api';
import { Storage }                     from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-modal-remains',
    templateUrl: 'modal-remains.html'
})
export class ModalRemainsPage {
    remains: any;
    user: any;
    params: any;
    select_count: string[] = [];

    constructor(
        public navCtrl: NavController,
        public api: Api,
        private storage: Storage) {

        this.storage.get('user').then(val => {
            this.user = val;
            this.params = ['remains', this.user.Master];
            this.api.get(this.params)
                .subscribe(data => this.remains = data.json());
        });

        for(let i = 1; i <= 10; i++) {
            let name = 'remains_'+i;
            this.select_count.push(name);
        }
    }
}
