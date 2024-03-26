"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.symDecrypt = exports.symEncrypt = exports.importSymKey = exports.exportSymKey = exports.createRandomSymmetricKey = exports.rsaDecrypt = exports.rsaEncrypt = exports.importPrvKey = exports.importPubKey = exports.exportPrvKey = exports.exportPubKey = exports.generateRsaKeyPair = void 0;
const crypto = __importStar(require("crypto"));
// #############
// ### Utils ###
// #############
// Function to convert ArrayBuffer to Base64 string
function arrayBufferToBase64(buffer) {
    return Buffer.from(buffer).toString("base64");
}
// Function to convert Base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
    var buff = Buffer.from(base64, "base64");
    return buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength);
}
async function generateRsaKeyPair() {
    const { publicKey, privateKey } = await crypto.subtle.generateKey({
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
    }, true, ['encrypt', 'decrypt']);
    return { publicKey: { publicKey }, privateKey: { privateKey } };
}
exports.generateRsaKeyPair = generateRsaKeyPair;
// Export a crypto public key to a base64 string format
async function exportPubKey(key) {
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    return arrayBufferToBase64(exportedKey);
}
exports.exportPubKey = exportPubKey;
// Export a crypto private key to a base64 string format
async function exportPrvKey(key) {
    if (!key)
        return null;
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    return arrayBufferToBase64(exportedKey);
}
exports.exportPrvKey = exportPrvKey;
// Import a base64 string public key to its native format
async function importPubKey(strKey) {
    const arrayBufferKey = base64ToArrayBuffer(strKey);
    return await crypto.subtle.importKey("raw", arrayBufferKey, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["encrypt"]);
}
exports.importPubKey = importPubKey;
// Import a base64 string private key to its native format
async function importPrvKey(strKey) {
    const arrayBufferKey = base64ToArrayBuffer(strKey);
    return await crypto.subtle.importKey("raw", arrayBufferKey, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["decrypt"]);
}
exports.importPrvKey = importPrvKey;
// Encrypt a message using an RSA public key
async function rsaEncrypt(b64Data, strPublicKey) {
    const data = base64ToArrayBuffer(b64Data);
    const publicKey = await importPubKey(strPublicKey);
    const encryptedData = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data);
    return arrayBufferToBase64(encryptedData);
}
exports.rsaEncrypt = rsaEncrypt;
// Decrypts a message using an RSA private key
async function rsaDecrypt(data, privateKey) {
    const encryptedData = base64ToArrayBuffer(data);
    const decryptedData = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedData);
    return new TextDecoder().decode(decryptedData);
}
exports.rsaDecrypt = rsaDecrypt;
// ######################
// ### Symmetric keys ###
// ######################
// Generates a random symmetric key
async function createRandomSymmetricKey() {
    return await crypto.subtle.generateKey({ name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"]);
}
exports.createRandomSymmetricKey = createRandomSymmetricKey;
// Export a crypto symmetric key to a base64 string format
async function exportSymKey(key) {
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    return arrayBufferToBase64(exportedKey);
}
exports.exportSymKey = exportSymKey;
// Import a base64 string format to its crypto native format
async function importSymKey(strKey) {
    const arrayBufferKey = base64ToArrayBuffer(strKey);
    return await crypto.subtle.importKey("raw", arrayBufferKey, { name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"]);
}
exports.importSymKey = importSymKey;
// Encrypt a message using a symmetric key
async function symEncrypt(key, data) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC" }, key, encodedData);
    return arrayBufferToBase64(encryptedData);
}
exports.symEncrypt = symEncrypt;
// Decrypt a message using a symmetric key
async function symDecrypt(strKey, encryptedData) {
    const key = await importSymKey(strKey);
    const arrayBufferData = base64ToArrayBuffer(encryptedData);
    const decryptedData = await crypto.subtle.decrypt({ name: "AES-CBC" }, key, arrayBufferData);
    return new TextDecoder().decode(decryptedData);
}
exports.symDecrypt = symDecrypt;
