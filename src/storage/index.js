import * as SecureStore from 'expo-secure-store';

// secure store setter
export const setValueToStore = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

// secure store getter
export const getValueFormStore = async (key) => {
    return await SecureStore.getItemAsync(key);
}

// delete value
export const deleteValueFormStore = async (key) => {
    return await SecureStore.deleteItemAsync(key);
}

