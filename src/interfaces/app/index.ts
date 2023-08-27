import { OwnerInterface } from 'interfaces/owner';
import { GetQueryInterface } from 'interfaces';

export interface AppInterface {
  id?: string;
  name: string;
  version?: string;
  owner_id: string;
  status?: string;
  created_at?: any;
  updated_at?: any;

  owner?: OwnerInterface;
  _count?: {};
}

export interface AppGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  version?: string;
  owner_id?: string;
  status?: string;
}
