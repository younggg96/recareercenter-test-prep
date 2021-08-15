import axios from "axios"
import { Alert } from "react-native";
import { BASE_URL } from "../../config"

export const postExamRecord = async (data) => {
    try {
        await axios({
            method: 'post',
            url: BASE_URL + '/exams/saveExam',
            data: {
                uid: data.uid,
                score: data.score,
                date: new Date().toISOString().slice(0, 10),
                recordQuestions: data.recordQuestions
            }
        });
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getExamData = async (uid) => {
    try {
        const res = await axios.get(BASE_URL + `/examData/getExamData?uid=${uid}`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getExamList = async (edid) => {
    try {
        const res = await axios.get(BASE_URL + `/examData/getExamListById?id=${edid}`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getExamDetails = async (eid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/exams/findExamDetail' + `?eid=${eid}`
        });
        console.log(res);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getDicSavedList = async (uid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/users/getSavedDictionar' + `?uid=${uid}`
        });
        console.log(res);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getDicSavedIDList = async (uid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/users/getSavedDictionarId' + `?uid=${uid}`
        });
        console.log(res);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const saveWordDic = async (uid, did) => {
    console.log('url' + BASE_URL + '/users/saveDictionary' + `?uid=${uid}` + `&did=${did}`);
    try {
        const res = await axios({
            method: 'post',
            url: BASE_URL + '/users/saveDictionary' + `?uid=${uid}` + `&did=${did}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const unSaveWordDic = async (uid, did) => {
    try {
        const res = await axios({
            method: 'post',
            url: BASE_URL + '/users/deleteDictionary' + `?uid=${uid}` + `did=${did}`
        });
        console.log(res);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}