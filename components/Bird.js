import Matter from "matter-js";
import React from "react";
import { Image, View } from "react-native";

const Bird = (props) => {
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
      <Image source={require("../assets/flappy-bird.png")} />
    </View>
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Bird",
  });

  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};
