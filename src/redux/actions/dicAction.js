import { saveWordDic, unSaveWordDic } from "../../helper/api";
import { DIC_SAVE_WORD, DIC_UNSAVE_WORD } from "../actions/actionTypes";

export async function saveWord({ index, uid }) {
  const res = await saveWordDic(uid, index + 1);
  if (res) {
    return {
      type: DIC_SAVE_WORD,
      payload: res,
    };
  }
}

export function unSaveWord({ index, uid }) {
  const res = unSaveWordDic(uid, index + 1);

  return {
    type: DIC_UNSAVE_WORD,
    payload: res,
  };
}
