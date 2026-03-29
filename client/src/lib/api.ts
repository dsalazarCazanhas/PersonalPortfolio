import { CV } from "./types";
import cvData from "../../statics/content.json";

export function getCV(): CV {
  return cvData as CV;
}
