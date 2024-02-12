import Matter from "matter-js";
import React from "react";
import { Image, View } from "react-native";

const Obstacle = (props) => {
  const withBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - withBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: withBody,
        height: heightBody,
      }}>
      <Image
        source={require("../assets/flappybird-pipe.png")}
        style={{ width: withBody, height: heightBody / 3 }}
      />
    </View>
  );
};

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: label,
    isStatic: true,
  });

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
