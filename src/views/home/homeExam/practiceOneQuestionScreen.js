import React from "react";
// ui
import { View } from "react-native";
import { Button, Radio, RadioGroup, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../../components/topBar/topBar";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../styles/home/home/praceticeStyle";
import { doQuestion } from "../../../redux/actions/userAction";
import { Review } from "./practiceScreen";
import { addStatusQuestion } from "../../../helper/api";
import { getStatusQuestionReduxStore } from "../../../redux/actions/questionAction";

export const PracticeOneQuestionScreen = ({ route, navigation }) => {
	// pass params from All List Screen
	const { data, cid } = route.params;
	const { userData } = useSelector((state) => state.userReducer);
	const { withStatusList } = useSelector((state) => state.questionReducer);
	const dispatch = useDispatch();
	/* states */
	// select item
	const [selectedIndex, setSelectedIndex] = React.useState(-1);
	// show result
	const [showResult, setShowResult] = React.useState(false);
	// res includes pick item and correction
	const [res, setRes] = React.useState({});

	// result
	const getResult = () => {
		setSelectedIndex(-1);
		setShowResult(true);
		dispatch(doQuestion(userData.uid));
		const itemRes = {
			res: selectedIndex === parseInt(data.correct_ans) - 1,
			pick: selectedIndex,
		};
		setRes(itemRes);
	};

	const changeStatus = (status) => {
		const obj = {
			uid: userData.uid,
			categoryId: cid,
			questionId: data.id,
			status
		}
		const res = addStatusQuestion(obj);
		setTimeout(() => {
			dispatch(getStatusQuestionReduxStore(userData.uid, cid));
		}, 500)
		navigation.navigate("AllCategroyListScreen");
	}

	return (
		<React.Fragment>
			{
				!showResult ? (
					<View style={{ flex: 1 }}>
						<TopBar title={`Question ${data.id}`} navigation={navigation} hasBack={true} />
						<ScrollView showsVerticalScrollIndicator={false}>
							<View style={styles.questionCard}>
								<View>
									<Text category="s1" style={styles.questionTitle}>
										Question: {`${data.questionName}`}
									</Text>
								</View>
								<RadioGroup
									selectedIndex={selectedIndex}
									onChange={(index) => setSelectedIndex(index)}
								>
									<Radio>{`A. ${data.answer_1}`}</Radio>
									<Radio>{`B. ${data.answer_2}`}</Radio>
									{data.answer_3 ? <Radio>{`C. ${data.answer_3}`}</Radio> : <></>}
									{data.answer_4 ? <Radio>{`D. ${data.answer_4}`}</Radio> : <></>}
								</RadioGroup>
								<Button
									style={styles.button}
									onPress={getResult}
									disabled={selectedIndex === -1 ? true : false}
								>
									Submit
								</Button>
							</View>
						</ScrollView>
					</View>
				) : (
					// result
					<View style={{ flex: 1, justifyContent: "space-between" }}>
						<View>
							<TopBar
								title={`Question ${data.id} answer`}
								navigation={navigation}
								hasBack={true}
							/>
							<Review
								result={res}
								question={data}
								currentQuestion={data.id - 1}
							/>
						</View>
						<View>
							<Text
								category="s2"
								appearance="hint"
								style={{ paddingHorizontal: 24 }}
							>
								What's your feedback?
							</Text>
							<View
								style={{
									...styles.questionCard,
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Button
									style={{ ...styles.button, marginTop: 0, minWidth: 100 }}
									onPress={() => changeStatus('unknow')}
									status="danger"
								>
									Don't Know
								</Button>
								<Button
									style={{ ...styles.button, marginTop: 0, minWidth: 100 }}
									onPress={() => changeStatus('familiar')}
									status="warning"
								>
									Familar
								</Button>
								<Button
									style={{ ...styles.button, marginTop: 0, minWidth: 100 }}
									onPress={() => changeStatus('know')}
									status="success"
								>
									Know
								</Button>
							</View>
						</View>
					</View>
				)
			}
		</React.Fragment>
	)
}