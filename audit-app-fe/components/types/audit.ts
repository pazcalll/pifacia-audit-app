export type TAudit = {
  id: number;
  user_type: string;
  user_id: string;
  event: "created" | "updated" | "deleted" | "restored";
  auditable_type: string;
  auditable_id: string;
  old_values: object;
  new_values: object;
  url: string;
  ip_address: string;
  user_agent: string;
  tags: unknown;
  created_at: string;
  updated_at: string;

  auditable?: object;
  user?: object;
};
