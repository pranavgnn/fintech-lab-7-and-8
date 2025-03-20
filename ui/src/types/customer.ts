export interface CustomerIdentification {
  type: number;
  item: string;
}

export interface CustomerProofOfId {
  type: string;
  value: string;
  startDate: string;
  endDate: string;
}

export interface CustomerName {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface CustomerContact {
  email: string;
  phone: string;
  alternatePhone?: string;
}

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CustomerDetails {
  name: CustomerName;
  contact: CustomerContact;
  address: CustomerAddress;
  customerIdentifications: CustomerIdentification[];
  customerProofOfIds: CustomerProofOfId[];
}
