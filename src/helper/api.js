import axios from "axios"
import { Alert } from "react-native";
import { BASE_URL } from "../../config";

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

export const updateNotification = async (uid, status) => {
    let push = 0;
    if (status) {
        push = 1;
    }
    try {
        const res = axios.post(BASE_URL + `/users/changePushStatus?uid=${uid}&push=${push}`);
        return res;
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
        Alert.alert("Error", `${error.message}${error}!`);
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

export const getCourseList = async () => {
    try {
        const res = await axios.get(BASE_URL + '/course/getCourseList');
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getCourseById = async (uid) => {
    try {
        const res = await axios.get(BASE_URL + `/course/findCourseById?cid=${uid}`);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const addClockIn = async (uid, cid, chapter, hour, date) => {
    try {
        const res = await axios({
            method: 'post',
            url: BASE_URL + '/clockIn/addClockIn',
            data: {
                uid, cid, chapter, hour: 0, date
            }
        });
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const getUserClockInList = async (uid) => {
    try {
        const res = await axios.get(BASE_URL + `/clockIn/getUserClockInList?uid=${uid}`);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const saveExpoToken = async (uid, expoToken) => {
    try {
        const res = await axios.post(BASE_URL + `/users/saveExpoToken?uid=${uid}&expoToken=${expoToken}`);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

export const updateUserProfile = async (uid, name) => {
    try {
        const res = await axios.put(BASE_URL + `/users/updateDisplayName?uid=${uid}&name=${name}`);
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }
}

