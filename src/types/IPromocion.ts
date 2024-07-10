import DataModel from "./DataModel";
import IPromocionDetalle from "./IPromocionDetalle"; // Replace "actual-module-path" with the actual path to the module that exports LocalDate and LocalTime.

export default interface IPromocion extends DataModel<IPromocion> {
  denominacion: string;
  fechaDesde: string;
  fechaHasta: string;
  horaDesde: string;
  horaHasta: string;
  descripcionDescuento: string;
  precioPromocional: number;
  imagen: string;
  promocionDetalles: IPromocionDetalle[];
}
