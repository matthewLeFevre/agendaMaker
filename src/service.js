export function createKey(length = 7) {
  let id = "";
  let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }

  return id;
};

export const URL = 'https://localhost:44385/';
