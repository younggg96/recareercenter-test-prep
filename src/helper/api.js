import axios from "axios"
import { Alert } from "react-native";
import { BASE_URL } from "../../config"

export const postExamRecord = async (data) => {
    try {
        const res = await axios({
            method: 'post',
            url: BASE_URL + '/exams/saveExam',
            data: {
                uid: data.uid,
                score: data.score,
                date: new Date().toISOString().slice(0, 10),
                recordQuestions: data.recordQuestions
            }
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const updateNotification = async ({ uid, status, hours, mins }) => {
    try {
        const res = await axios({
            method: 'post',
            url: BASE_URL + '/users/updateNotification',
            data: {
                uid, status, hours, mins
            }
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const findUser = async (uid) => {
    try {
        const res = axios.get(BASE_URL + `/users/findUser?uid=${uid}`);
        if (res) {
            return res;
        }
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getSliderData = async (uid) => {
    try {
        const res = await axios.get(BASE_URL + '/slides/findAll');
        if (res) {
            return res.data;
        }
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getExamData = async (uid) => {
    console.log(uid)
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
        const res = await axios.get(BASE_URL + `/exams/findExamDetail?eid=${eid}`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getDicSavedList = async (uid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/users/getSavedDictionary' + `?uid=${uid}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getDicSavedIDList = async (uid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/users/getSavedDictionaryId' + `?uid=${uid}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const saveWordDic = async (uid, did) => {
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
            url: BASE_URL + '/users/deleteDictionary' + `?uid=${uid}` + `&did=${did}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getQuestionCategories = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/questionCategories/findAll'
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getCategoryById = async (cid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/questions/findByCategoryId' + `?id=${cid}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const GetRandomCategoryQuestion = async (cid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/questions/findForCategory' + `?id=${cid}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const addStatusQuestion = async (bodyObj) => {
    try {
        const res = await axios({
            method: 'post',
            url: BASE_URL + '/core/updateFamiliarQuestion',
            data: bodyObj
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getStatusQuestions = async (uid, cid) => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/core/findUserFamiliarQuestion' + `?uid=${uid}` + `&cid=${cid}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getAllVideos = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/videos/findAll'
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const changeMembership = async (uid, membershipType) => {
    try {
        const res = await axios({
            method: 'put',
            url: BASE_URL + '/users/updateUserMembership' + `?uid=${uid}` + `&membership=${membershipType}`
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
        return null;
    }
}

export const addPractice = async (uid) => {
    try {
        const res = await axios.post(BASE_URL + `/users/addPractice?uid=${uid}`);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}



