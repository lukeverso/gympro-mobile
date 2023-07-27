export const urlToBlob = async (uri: string) => {
     return new Promise<Blob>((resolve, reject) => { // Indicamos que o Promise vai resolver com um objeto Blob
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
               resolve(xhr.response as Blob); // Fazemos uma asserção de tipo aqui para informar ao TypeScript que é um Blob
          };
          xhr.onerror = function () {
               reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
     });
};
