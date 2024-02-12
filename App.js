import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    // Load best score when the component mounts
    loadBestScore();
  }, []);

  const loadBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem("bestScore");
      if (value !== null) {
        setBestScore(parseInt(value));
      } else {
        setBestScore(0);
      }
    } catch (error) {
      console.error("Error loading best score:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/fb-game-background.png")}
        style={styles.backgroundImage}>
        <Text
          style={{ textAlign: "right", fontSize: 30, fontWeight: "bold", margin: 20, zIndex: 1 }}>
          points: {currentPoints}
          {"\n"}
          Best Score: {bestScore}
        </Text>
        <GameEngine
          ref={(ref) => setGameEngine(ref)}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case "game_over":
                setRunning(false);
                gameEngine.stop();
                if (currentPoints > bestScore) {
                  setBestScore(currentPoints);
                }
                break;
              case "new_point":
                setCurrentPoints(currentPoints + 1);
                break;
            }
          }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}>
          <StatusBar style="auto" hidden />
          <Image source={require("./assets/bottom-background.png")} style={styles.floorImage} />
        </GameEngine>

        {!running ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{ backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 10 }}
              onPress={() => {
                setCurrentPoints(0);
                setRunning(true);
                gameEngine.swap(entities());
              }}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>START GAME</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  floorImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -123,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
