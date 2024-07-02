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
