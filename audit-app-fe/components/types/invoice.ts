import { TItem } from "./item";
import { TUser } from "./user";

export type TInvoice = {
  id: string;
  user_id: string;
  code: string;
  total_price: number;
  transfer_evidence_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user?: TUser;
  invoice_items?: TInvoiceItem[];
};

export type TInvoiceItem = {
  id: string;
  invoice_id: string;
  item_id: string;
  item_object: TItem;
  quantity: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
