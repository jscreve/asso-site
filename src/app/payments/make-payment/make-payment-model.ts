export class MakePaymentModel {
  public last_name: string;
  public names: string;
  public address: string;
  public postal_code: string;
  public city: string;
  public country: string;
  public email: string;
  public phone: string;
  public amount: number;
}

export class MakePaymentRessource {
  public user: UserModelRessource;
  public amount: number;
  public token: string;
}

export class UserModelRessource {
  public last_name: string;
  public names: string;
  public email: string;
  public phone: string;
  public address: AddressModelRessource;
}

export class AddressModelRessource {
  public street: string;
  public postalCode: string;
  public city: string;
  public country: string;
}
