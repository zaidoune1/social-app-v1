// token verify

export type TokenReq = {};

export type TokenRes = {
  message?: string;
};

// refresh token

export type RefreshTokenReq = {
  id: string;
};

export type RefreshTokenRes = {
  tokenAccess: string;
};
