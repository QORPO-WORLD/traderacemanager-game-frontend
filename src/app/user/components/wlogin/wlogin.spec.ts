/**
 * @Author: open-source GPL
 * @Date: 25.09.2018 15:11
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login';

import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material-module/material-module.module';
import {Injector} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthResource} from '../../resources/auth.resource';
import {CommonModule} from '../../../common/common.module';
import {HttpHandler} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [LoginComponent],
});

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            providers: [
                Injector,
                HttpHandler,
                AuthService,
                AuthResource,
            ],
            imports: [
                BrowserAnimationsModule,
                RouterTestingModule,
                FormsModule,
                BrowserModule,
                MaterialModule,
                CommonModule
            ],
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
