import DataModel from "./DataModel";
import IArticuloPromocionDto from "./IArticuloPromocionDto";

export default interface IPromocionDetalle
  extends DataModel<IPromocionDetalle> {
  cantidad: number;
  articuloManufacturadoDto: IArticuloPromocionDto;
}
