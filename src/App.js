/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const App: () => React$Node = () => {

  const [imageArray, setImageArray] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    imageAPI()
  }, [])

  onRefreshAction = useCallback(() => {
    // console.log("onRefreshAction")
    imageAPI()
  }, [refreshing, imageArray])

  const imageAPI = () => {
    setRefreshing(true)
    fetch(`https://picsum.photos/v2/list?page=${page + 1}&limit=10`)
      .then(response => response.json())
      .then(data => {
        setImageArray(data)
        setRefreshing(false)
      }).catch(error => {
        setRefreshing(false)
      })
    setPage(page + 1)
  }


  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshAction}
            colors={["white"]}
            progressBackgroundColor={"black"}
            tintColor="white" />}
        >
          <FlatList style={{ flex: 1 }}
            data={imageArray}
            horizontal
            renderItem={({ index, item }) => {
              return (<ListItem
                index={index}
                size={imageArray.length}
                author={item.author}
                data={item}
              />)
            }}
            pagingEnabled
          />
        </ScrollView>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;


function ListItem({ index, size, data }) {

  const imageURL = () => `https://picsum.photos/id/${data.id}/200/300`

  return (
    <View style={{ flex: 1, width: Dimensions.get("screen").width, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 200, height: 300 }}
        resizeMode="contain"
        source={{ uri: imageURL() }} />
      <View style={{ position: "absolute", width: "100%", height: 80, top: 0, alignItems: "center", justifyContent: "center", }}>
        <Text style={{ fontSize: 25, fontWeight: "600", color: "white", backgroundColor: "black", borderRadius: 10, overflow: "hidden" }}>{`  ${data.author}  `}</Text>
      </View>

      <View style={{ position: "absolute", width: "100%", height: 65, bottom: 0, alignItems: "center", justifyContent: "center", }}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "white", backgroundColor: "black", borderRadius: 10, overflow: "hidden" }}>{`  ${index + 1}/${size}  `}</Text>
      </View>
    </View>
  )
}
