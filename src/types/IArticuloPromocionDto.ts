import DataModel from "./DataModel";
import ImagenArticulo from "./ImagenArticulo";

export default interface IArticuloPromocionDto
  extends DataModel<IArticuloPromocionDto> {
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  tiempoEstimadoMinutos: number;
  preparacion: string;
  codigo: string;
  imagen: ImagenArticulo;
}
