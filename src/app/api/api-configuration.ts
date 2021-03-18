/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
   rootUrl: string = 'https://dev-api.traderacemanager.com';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}

