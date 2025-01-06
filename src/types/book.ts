export interface Book {
  id: string;
  title: string;
  class: string;
  program: string;
  subject: string;
  quantity: number;
  lastUpdated: string;
  purchasedFrom: string;
  receivedBy: string;
  inwardDate: string;
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
  purchasedFrom: string;
  receivedBy: string;
  inwardDate: string;
  transportType: string;
  lrNumber: string;
  autoCharges: number;
}