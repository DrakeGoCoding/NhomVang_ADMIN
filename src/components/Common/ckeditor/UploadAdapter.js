class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.url = "http://localhost:5543/image/upload";
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise(async (resolve, reject) => {
          const toBase64 = file =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
            });

          try {
            const cFile = await toBase64(file);
            const data = await fetch(this.url, {
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify({ image: cFile })
            });
            if (data.status === 201) {
              this.loader.uploaded = true;
              resolve({ default: await data.json() });
            } else {
              reject(`Couldn't upload file: ${file.name}`);
            }
          } catch (error) {
            console.log(error);
          }
        })
    );
  }
}

export default function UploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new UploadAdapter(loader);
  };
}
