export interface authResponse {
  ok:boolean,
  msg : string
  uid? : string,
  name?:string,
  token? : string,
  email? :string
}


export interface Login {
  access_token: string;
  expires_in:   number;
  username:   string;
}


export interface Usuario {

  uid:string,
  name:string,
  email:string
}


export interface authGecelca {
  token?: string,
  expiracion? : string
}
