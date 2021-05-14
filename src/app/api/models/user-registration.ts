/* tslint:disable */
export interface UserRegistration {
  id?: string;
  email: string;
  country?: string;
  nick?: string;
  password: string;
  affiliate_slug?: null | string;
  recaptcha_token?: string;
  recaptchaToken?: string;
  news_agree: boolean;
}
