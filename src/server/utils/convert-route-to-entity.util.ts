const mapping: Record<string, string> = {
  apps: 'app',
  'app-administrators': 'app_administrator',
  'app-developers': 'app_developer',
  owners: 'owner',
  subscribers: 'subscriber',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
