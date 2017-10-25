import {Component}                                  from '@angular/core';
import {IonicPage, NavController, NavParams}        from 'ionic-angular';

import {Item}                                       from '../../models/item';
import {Api}                                        from '../../providers/api/api';

/**
 * params = [
 *      'method',           // request type
 *      'fulfilled',        // 1 - all , 0 - unfulfilled
 *      'master_name',
 *      'page_number',
 *      'on_page'
 * ] *
 */

@IonicPage()
@Component({
    selector: 'page-order-list',
    templateUrl: 'order-list.html'
})
export class OrderListPage {
    items:Item[];
    params: any;
    user: any;
    item: any;

    constructor(public navCtrl:NavController,
                public api:Api,
                public navParams:NavParams) {

        this.user = navParams.get('user');
        this.params = ['requests', '0', this.user.Master, '1', '3'];
        this.api.get(this.params)
            .subscribe(data => this.items = data.json());
    }

    ionViewDidLoad() {
    }

    openDetail(item, user) {
        this.navCtrl.push('OrderDetailPage', {
            item: item,
            user: user
        });
    }

    openMap(items) {
        /*for(var i = 0; i < items.length; i++){
            this.api.getMapCoord(items[i].Address)
                .subscribe(data => this.items_coord[i] = data.json() ) ;
        }  */

        this.navCtrl.push('MapPage', {
            items: items
        });
    }
}
