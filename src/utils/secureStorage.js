// const encryptionKeyName = "encryptionKey"; // Stored in sessionStorage

// async function generateKey() {
//   return await crypto.subtle.generateKey(
//     { name: "AES-GCM", length: 256 },
//     true,
//     ["encrypt", "decrypt"]
//   );
// }

// async function getKey() {
//   let keyData = sessionStorage.getItem(encryptionKeyName);
//   if (keyData) {
//     return await crypto.subtle.importKey(
//       "jwk",
//       JSON.parse(keyData),
//       { name: "AES-GCM" },
//       true,
//       ["encrypt", "decrypt"]
//     );
//   } else {
//     const key = await generateKey();
//     sessionStorage.setItem(
//       encryptionKeyName,
//       JSON.stringify(await crypto.subtle.exportKey("jwk", key))
//     );
//     return key;
//   }
// }

// async function encryptData(data) {
//   const key = await getKey();
//   const encoder = new TextEncoder();
//   const encodedData = encoder.encode(JSON.stringify(data));
//   const iv = crypto.getRandomValues(new Uint8Array(12));

//   const encrypted = await crypto.subtle.encrypt(
//     { name: "AES-GCM", iv },
//     key,
//     encodedData
//   );

//   return {
//     iv: btoa(String.fromCharCode(...iv)),
//     encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
//   };
// }

// async function decryptData(encryptedData) {
//   if (!encryptedData) return null;

//   const key = await getKey();
//   const ivArray = Uint8Array.from(atob(encryptedData.iv), (c) =>
//     c.charCodeAt(0)
//   );
//   const encryptedArray = Uint8Array.from(atob(encryptedData.encrypted), (c) =>
//     c.charCodeAt(0)
//   );

//   const decrypted = await crypto.subtle.decrypt(
//     { name: "AES-GCM", iv: ivArray },
//     key,
//     encryptedArray
//   );

//   return JSON.parse(new TextDecoder().decode(decrypted));
// }

// export async function setSecureItem(key, value) {
//   console.log(value,"=>>>>>>>>>")
//   const encryptedValue = await encryptData(value);
//   localStorage.setItem(key, JSON.stringify(encryptedValue));
// }

// export async function getSecureItem(key) {
//   const encryptedData = JSON.parse(localStorage.getItem(key));
//   return await decryptData(encryptedData);
// }

// export function removeSecureItem(key) {
//   localStorage.removeItem(key);
// }

// export function clearSecureStorage() {
//   localStorage.clear();
// }
