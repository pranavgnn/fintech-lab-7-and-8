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

export interface CustomerData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  customerIdentifications?: CustomerIdentification[];
  customerProofOfIds?: CustomerProofOfId[];
}
