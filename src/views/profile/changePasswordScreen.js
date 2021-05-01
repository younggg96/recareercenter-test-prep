import React from "react";
// form
import { Controller, useForm } from "react-hook-form";
// redux
import { useDispatch, useSelector } from "react-redux";

// style
import { View, TouchableWithoutFeedback } from "react-native";
import { Button, Icon, Input, Text } from "@ui-kitten/components";
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/settings/changePasswordStyle";

export const ChangePasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { userData } = useSelector((state) => state.userReducer);

  const submitNewPassword = (data) => {
    dispatch(changePassword(data.password));
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Change Password" navigation={navigation} />
      <View style={styles.passwordInput}>
        <Controller
          name="password"
          rules={{ required: true, minLength: 8 }}
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              label="Password"
              size="large"
              caption={
                errors.password ? (
                  <Text status="danger" category="c2">
                    Should contain at least 8 symbols
                  </Text>
                ) : (
                  ""
                )
              }
              placeholder="Enter your new Password"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              value={value}
            />
          )}
        />
        <Button status="primary" onPress={handleSubmit(submitNewPassword)}>
          Submit
        </Button>
      </View>
    </View>
  );
};
