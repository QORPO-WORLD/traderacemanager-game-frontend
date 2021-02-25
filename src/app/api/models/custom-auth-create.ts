/* tslint:disable */
import { UserRegistration } from './user-registration';
import { JwtData } from './jwt-data';
export interface CustomAuthCreate {
  user?: UserRegistration;
  jwt?: JwtData;
}
