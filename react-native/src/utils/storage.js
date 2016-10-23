/*
 * @providesModule storage
 * @flow
 */

const AUTH_TOKEN = "auth_token";
const USER_ID = "user_id";

export function storeToken(AsyncStorage: any, token: string) {
  return AsyncStorage.setItem(AUTH_TOKEN, token);
}

export function retrieveToken(AsyncStorage: any) {
  return AsyncStorage.getItem(AUTH_TOKEN);
}

export function storeId(AsyncStorage: any, id: number) {
  return AsyncStorage.setItem(USER_ID, id.toString());
}

export function retrieveId(AsyncStorage: any) {
  return AsyncStorage.getItem(USER_ID);
}
