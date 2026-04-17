export type JwtPayload = {
  sub: string;
  tenantId: string | null;
  email: string;
  isSuperAdmin: boolean;
};

export type AuthUser = {
  id: string;
  tenantId: string | null;
  email: string;
  isSuperAdmin: boolean;
};
