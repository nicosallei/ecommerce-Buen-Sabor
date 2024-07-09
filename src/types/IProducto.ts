import DataModel from "./DataModel";
import ICategoria from "./ICategoria";
import ImagenArticulo from "./ImagenArticulo";

export default interface IPdoructo extends DataModel<IPdoructo> {
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  imagenes: ImagenArticulo;
  categoria: ICategoria;
}
