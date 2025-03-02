import * as CryptoJS from "crypto-js";

// import "dotenv";

// const secretKey = process.env.SECRET_KEY || "sett";

const secretKey = "sett";

const encrypt = (plainVar: string): string => {
    return CryptoJS.AES.encrypt(plainVar, secretKey).toString();
}

const decrypt = (encryptedVar: string): string => {
    return CryptoJS.AES.decrypt(encryptedVar, secretKey).toString(CryptoJS.enc.Utf8);
}

export const getEcryptedLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);

    if (data) return decrypt(data);
}

export const setEcryptedLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, encrypt(value));
}