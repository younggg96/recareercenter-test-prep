import axios from "axios"
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
        // console.log(BASE_URL + `/examData/getExamData?uid=${uid}`, res.data);
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
        // console.log(BASE_URL + `/examData/getExamListById?id=${edid}`, res.data);
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
        return res.data;
    } catch (error) {
        Alert.alert("Error", `${error.message}`);
    }

}