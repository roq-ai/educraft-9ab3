import { AppInterface } from 'interfaces/app';
import { AppAdministratorInterface } from 'interfaces/app-administrator';
import { AppDeveloperInterface } from 'interfaces/app-developer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OwnerInterface {
  id?: string;
  description?: string;
  last_login?: any;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  app?: AppInterface[];
  app_administrator?: AppAdministratorInterface[];
  app_developer?: AppDeveloperInterface[];
  user?: UserInterface;
  _count?: {
    app?: number;
    app_administrator?: number;
    app_developer?: number;
  };
}

export interface OwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
