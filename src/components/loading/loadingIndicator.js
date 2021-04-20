import React from "react";
import { Spinner } from "@ui-kitten/components";

export const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner status='basic' size='small' />
    </View>
);