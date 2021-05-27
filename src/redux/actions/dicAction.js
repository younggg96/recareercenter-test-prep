import { DIC_SAVE_WORD, DIC_UNSAVE_WORD } from "../actions/actionTypes";

export function saveWord(wordObj) {
  return {
    type: DIC_SAVE_WORD,
    payload: { id: wordObj.index, item: {...wordObj.item, saved: true} },
  };
}

export function unSaveWord(id) {
  return {
    type: DIC_UNSAVE_WORD,
    payload: { id },
  };
}
