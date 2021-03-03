/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  // back rootUrl: string = 'https://dev-api.traderacemanager.com';
  rootUrl: string = '/api/';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
