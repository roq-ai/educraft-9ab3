interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['App Owner'],
  customerRoles: ['Subscribers'],
  tenantRoles: ['App Owner', 'App Administrator', 'App Developer'],
  tenantName: 'Owner',
  applicationName: 'Educraft',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
