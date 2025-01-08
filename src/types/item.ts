export interface Item {
  id: string;
  title: string;
  class: string;
  program: string;
  subject: string;
  initialStock: number;
}

export interface ItemFormData {
  title: string;
  class: string;
  program: string;
  subject: string;
  initialStock: number;
}