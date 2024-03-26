"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.symDecrypt = exports.symEncrypt = exports.importSymKey = exports.exportSymKey = exports.createRandomSymmetricKey = exports.rsaDecrypt = exports.rsaEncrypt = exports.importPrvKey = exports.importPubKey = exports.exportPrvKey = exports.exportPubKey = exports.generateRsaKeyPair = void 0;
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
function generateRsaKeyPair() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, publicKey, privateKey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, crypto.subtle.generateKey({
                        name: 'RSA-OAEP',
                        modulusLength: 2048,
                        publicExponent: new Uint8Array([1, 0, 1]),
                        hash: 'SHA-256'
                    }, true, ['encrypt', 'decrypt'])];
                case 1:
                    _a = _b.sent(), publicKey = _a.publicKey, privateKey = _a.privateKey;
                    return [2 /*return*/, { publicKey: { publicKey: publicKey }, privateKey: { privateKey: privateKey } }];
            }
        });
    });
}
exports.generateRsaKeyPair = generateRsaKeyPair;
// Export a crypto public key to a base64 string format
function exportPubKey(key) {
    return __awaiter(this, void 0, void 0, function () {
        var exportedKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, crypto.subtle.exportKey("raw", key)];
                case 1:
                    exportedKey = _a.sent();
                    return [2 /*return*/, arrayBufferToBase64(exportedKey)];
            }
        });
    });
}
exports.exportPubKey = exportPubKey;
// Export a crypto private key to a base64 string format
function exportPrvKey(key) {
    return __awaiter(this, void 0, void 0, function () {
        var exportedKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!key)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, crypto.subtle.exportKey("raw", key)];
                case 1:
                    exportedKey = _a.sent();
                    return [2 /*return*/, arrayBufferToBase64(exportedKey)];
            }
        });
    });
}
exports.exportPrvKey = exportPrvKey;
// Import a base64 string public key to its native format
function importPubKey(strKey) {
    return __awaiter(this, void 0, void 0, function () {
        var arrayBufferKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arrayBufferKey = base64ToArrayBuffer(strKey);
                    return [4 /*yield*/, crypto.subtle.importKey("raw", arrayBufferKey, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["encrypt"])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.importPubKey = importPubKey;
// Import a base64 string private key to its native format
function importPrvKey(strKey) {
    return __awaiter(this, void 0, void 0, function () {
        var arrayBufferKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arrayBufferKey = base64ToArrayBuffer(strKey);
                    return [4 /*yield*/, crypto.subtle.importKey("raw", arrayBufferKey, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["decrypt"])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.importPrvKey = importPrvKey;
// Encrypt a message using an RSA public key
function rsaEncrypt(b64Data, strPublicKey) {
    return __awaiter(this, void 0, void 0, function () {
        var data, publicKey, encryptedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = base64ToArrayBuffer(b64Data);
                    return [4 /*yield*/, importPubKey(strPublicKey)];
                case 1:
                    publicKey = _a.sent();
                    return [4 /*yield*/, crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data)];
                case 2:
                    encryptedData = _a.sent();
                    return [2 /*return*/, arrayBufferToBase64(encryptedData)];
            }
        });
    });
}
exports.rsaEncrypt = rsaEncrypt;
// Decrypts a message using an RSA private key
function rsaDecrypt(data, privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var encryptedData, decryptedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encryptedData = base64ToArrayBuffer(data);
                    return [4 /*yield*/, crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedData)];
                case 1:
                    decryptedData = _a.sent();
                    return [2 /*return*/, new TextDecoder().decode(decryptedData)];
            }
        });
    });
}
exports.rsaDecrypt = rsaDecrypt;
// ######################
// ### Symmetric keys ###
// ######################
// Generates a random symmetric key
function createRandomSymmetricKey() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, crypto.subtle.generateKey({ name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createRandomSymmetricKey = createRandomSymmetricKey;
// Export a crypto symmetric key to a base64 string format
function exportSymKey(key) {
    return __awaiter(this, void 0, void 0, function () {
        var exportedKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, crypto.subtle.exportKey("raw", key)];
                case 1:
                    exportedKey = _a.sent();
                    return [2 /*return*/, arrayBufferToBase64(exportedKey)];
            }
        });
    });
}
exports.exportSymKey = exportSymKey;
// Import a base64 string format to its crypto native format
function importSymKey(strKey) {
    return __awaiter(this, void 0, void 0, function () {
        var arrayBufferKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arrayBufferKey = base64ToArrayBuffer(strKey);
                    return [4 /*yield*/, crypto.subtle.importKey("raw", arrayBufferKey, { name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.importSymKey = importSymKey;
// Encrypt a message using a symmetric key
function symEncrypt(key, data) {
    return __awaiter(this, void 0, void 0, function () {
        var encoder, encodedData, encryptedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encoder = new TextEncoder();
                    encodedData = encoder.encode(data);
                    return [4 /*yield*/, crypto.subtle.encrypt({ name: "AES-CBC" }, key, encodedData)];
                case 1:
                    encryptedData = _a.sent();
                    return [2 /*return*/, arrayBufferToBase64(encryptedData)];
            }
        });
    });
}
exports.symEncrypt = symEncrypt;
// Decrypt a message using a symmetric key
function symDecrypt(strKey, encryptedData) {
    return __awaiter(this, void 0, void 0, function () {
        var key, arrayBufferData, decryptedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, importSymKey(strKey)];
                case 1:
                    key = _a.sent();
                    arrayBufferData = base64ToArrayBuffer(encryptedData);
                    return [4 /*yield*/, crypto.subtle.decrypt({ name: "AES-CBC" }, key, arrayBufferData)];
                case 2:
                    decryptedData = _a.sent();
                    return [2 /*return*/, new TextDecoder().decode(decryptedData)];
            }
        });
    });
}
exports.symDecrypt = symDecrypt;
