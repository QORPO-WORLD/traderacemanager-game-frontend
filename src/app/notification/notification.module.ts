import {NgModule} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {NotificationResource} from './resources/notification.resource';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
/**
 * @Author: open-source GPL
 * @Date: 13.08.2018 12:55
 */
@NgModule({
    imports: [
        ReactiveFormsModule,
        HttpClientModule,
    ],
    declarations: [
    ],
    providers: [
        NotificationService,
        NotificationResource
    ],
    exports: [
    ]
})
export class NofiticationModule {
}
