export type JwtPayload = {
    sub: string;
    tenantId: string;
    email: string;
    isSuperAdmin: boolean;
};
export type AuthUser = {
    id: string;
    tenantId: string;
    email: string;
    isSuperAdmin: boolean;
};
