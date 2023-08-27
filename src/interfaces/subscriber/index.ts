import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SubscriberInterface {
  id?: string;
  user_id: string;
  subscription_type?: string;
  subscription_status?: string;
  subscription_start_date?: any;
  subscription_end_date?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SubscriberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  subscription_type?: string;
  subscription_status?: string;
}
