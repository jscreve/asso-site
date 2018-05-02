export class MemberResource {
  public user: UserResource;
  public memberPayments: string[];
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
