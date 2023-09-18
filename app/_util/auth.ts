"use server";
import { cookies } from "next/headers";

// トークンをCookieにセットする
export async function setAccessToken(idToken: string, accessToken: string) {
  cookies().set("id_token", idToken, {secure: true});
  cookies().set("access_token", accessToken, { secure: true });
}