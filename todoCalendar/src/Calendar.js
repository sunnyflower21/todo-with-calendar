import dayjs from "dayjs";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { getDayColor, getDayText } from "./utill";

const columnSize = 35;
const Column = ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
  hasTodo,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "#c2c2c2" : "transparent",
        borderRadius: columnSize / 2,
      }}
    >
      <Text style={{ color, opacity, fontWeight: hasTodo ? "bold" : "normal" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ArrowButton = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingHorizontal: 20, paddingVertical: 15 }}
    >
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  );
};

export default ({
  columns,
  todoList,
  onPressLeftArrow,
  onPressHeaderDate,
  onPressRightArrow,
  onPressDate,
  selectedDate,
}) => {
  // const currentDateText = dayjs(seletedDate).format('YYYY.MM.DD');
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD.");
    return (
      <View>
        {/* < 2023.11.15 > */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton
            iconName={"arrow-left"}
            onPress={onPressLeftArrow}
          ></ArrowButton>
          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButton
            iconName={"arrow-right"}
            onPress={onPressRightArrow}
          ></ArrowButton>
        </View>
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              ></Column>
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = getDayColor(day);
    const onPress = () => onPressDate(date);

    const isCurrnetMonth = dayjs(date).isSame(selectedDate, "month");
    const isSelected = dayjs(date).isSame(selectedDate, "date");

    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrnetMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
      ></Column>
    );
  };
  return (
    <FlatList
      data={columns}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column=${index}`}
      numColumns={7}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    ></FlatList>
  );
};
