export interface Book {
  id: string;
  title: string;
  class: string;
  program: string;
  subject: string;
  quantity: number;
  lastUpdated: string;
  type: 'inward' | 'outward';
  purchasedFrom?: string;
  sentTo?: string;
  receivedBy?: string;
  sentBy?: string;
  inwardDate?: string;
  outwardDate?: string;
  transportType: string;
  lrNumber: string;
  autoCharges: number;
}

export interface NewBookFormData {
  title: string;
  class: string;
  program: string;
  subject: string;
  quantity: number;
  type: 'inward' | 'outward';
  purchasedFrom: string;
  sentTo: string;
  receivedBy: string;
  sentBy: string;
  inwardDate: string;
  outwardDate: string;
  transportType: string;
  lrNumber: string;
  autoCharges: number;
}