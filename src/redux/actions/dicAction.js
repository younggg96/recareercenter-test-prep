import { getDicSavedIDList, getDicSavedList, saveWordDic, unSaveWordDic } from "../../helper/api";
import { DIC_SAVE_WORD, DIC_UNSAVE_WORD, GET_SAVED_WORD, GET_SAVED_WORD_LIST } from "../actions/actionTypes";

export async function getSavedWord(uid) {
  const res = await getDicSavedIDList(uid);
  if (res) {
    return {
      type: GET_SAVED_WORD,
      payload: res,
    };
  }
}

export async function getSavedWordList(uid) {
  const res = await getDicSavedList(uid);
  console.log('aaa',res)
  if (res) {
    return {
      type: GET_SAVED_WORD_LIST,
      payload: res,
    };
  }
}

export async function saveWord(uid, did) {
  const res = await saveWordDic(uid, did);
  if (res) {
    return {
      type: DIC_SAVE_WORD,
      payload: res,
    };
  }
}

export async function unSaveWord(uid, did) {
  const res = await unSaveWordDic(uid, did);
  if (res) {
    return {
      type: DIC_UNSAVE_WORD,
      payload: res,
    };
  }
}
