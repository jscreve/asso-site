export class MemberResource {
  public user: UserResource;
  public memberPayments: string[];
  public linky: LinkyResource;
  public authorities: string[];
  public username: string;
  public password: string;
}

export class UserResource {
  public last_name: string;
  public names: string;
  public address: string;
  public postal_code: string;
  public city: string;
  public country: string;
  public email: string;
  public phone: string;
}

export class LinkyResource {
  public activated: boolean;
  public threshold: number;
  public username: string;
  public password: string;
  public energyYesterday: number;
  public lowestPowerYesterday: number;
}
