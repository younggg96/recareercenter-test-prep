import React from 'react';
import { View } from 'react-native';
// redux
import { useDispatch } from 'react-redux';
import { TopBar } from '../../../components/topBar/topBar';

export const VideosListScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1 }}>
            <TopBar title="Videos" navigation={navigation} hasBack={true}  />
        </View>
    );
};