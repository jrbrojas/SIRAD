export class UtilsService {
  static getImageDataUrlFromLocalPath(localPath: string): Promise<string> {
      return new Promise((resolve, reject) => {
          let canvas = document.createElement('canvas');
          let image = new Image();
          image.onload = () => {
              canvas.height = image.height;
              canvas.width = image.width;
              (canvas as any).getContext("2d").drawImage(image, 0, 0);
              resolve(canvas.toDataURL("image/png"));
          }
          image.onerror = () => reject("Imagen no disponible");
          image.src = localPath;
      })
  }
}
