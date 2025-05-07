import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface ExtendedRequest extends NextRequest {
  userId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: any;
}

const JWT_SECRET = "default-secret";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export const getTokenId = (req: ExtendedRequest) => {
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value;
  const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
    id: string;
    iat: number;
    exp: number;
  };

  req.userId = Number(decoded.id);
  const id = Number(decoded.id);
  return id;
};

export default getTokenId;
