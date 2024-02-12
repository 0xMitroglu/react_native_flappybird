import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import ObstacleTop from "../components/ObstacleTop";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  engine.gravity.y = 0.5;

  const pipeSizeA = getPipeSizePosPair();
  const pipeSizeB = getPipeSizePosPair(windowWidth * 0.95);

  return {
    physics: { engine, world },

    Bird: Bird(world, "green", { x: 150, y: 112 }, { width: 40, height: 40 }),

    Floor: Floor(
      world,
      "green",
      { x: windowWidth / 2, y: windowHeight },
      { width: windowWidth, height: 50 }
    ),

    ObstacleTop1: ObstacleTop(
      world,
      "ObstacleTop1",
      "red",
      pipeSizeA.pipeTop.pos,
      pipeSizeA.pipeTop.size
    ),

    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "red",
      pipeSizeA.pipeBottom.pos,
      pipeSizeA.pipeBottom.size
    ),

    ObstacleTop2: ObstacleTop(
      world,
      "ObstacleTop2",
      "red",
      pipeSizeB.pipeTop.pos,
      pipeSizeB.pipeTop.size
    ),

    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "red",
      pipeSizeB.pipeBottom.pos,
      pipeSizeB.pipeBottom.size
    ),
  };
};
