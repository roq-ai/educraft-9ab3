import { UserInterface } from 'interfaces/user';
import { OwnerInterface } from 'interfaces/owner';
import { GetQueryInterface } from 'interfaces';

export interface AppDeveloperInterface {
  id?: string;
  user_id: string;
  owner_id: string;
  access_level?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  owner?: OwnerInterface;
  _count?: {};
}

export interface AppDeveloperGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  owner_id?: string;
  access_level?: string;
  status?: string;
}
