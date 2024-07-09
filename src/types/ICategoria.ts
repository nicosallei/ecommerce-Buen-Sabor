import DataModel from "./DataModel";

export default interface ICategoria extends DataModel<ICategoria> {
  nombre: string;
  descripcion: string;
  imagen: string;
}
