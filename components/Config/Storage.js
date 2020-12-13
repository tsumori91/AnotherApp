import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Storage = {
  getItem: async function (key) {
    let item = await AsyncStorage.getItem(key);
    if (JSON.parse(item) === null) {
      return null;
    }
    return JSON.parse(item);
  },
  setItem: async function (key, value) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
