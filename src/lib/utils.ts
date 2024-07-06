import { IUser } from "../types/interfaces";

export function shortCircuit(value: IUser | {}, callback: React.FC<void>) {
  console.log("value", value);
  if (value) {
    console.log(!value);
    return callback();
  } else {
    return null;
  }
}

export function isOlderThan(date: number | string) {
  // Obtiene la fecha actual y resta 10 días

  const dateContent = new Date(date).getTime() * 1000;
  const today = new Date().getTime();

  const tenDaysAgo = today - 10 * 24 * 60 * 60 * 1000;

  // Convierte el contenido de la celda a una fecha
  // const dateContent = new Date().setDate(date);

  console.log(dateContent);

  console.log(today);
  console.log("tenDaysAgo", tenDaysAgo);

  // Compara las fechas
  return tenDaysAgo > dateContent;
}
