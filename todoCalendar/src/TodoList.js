import dayjs from "dayjs";
import { TouchableOpacity, View, Text, FlatList } from "react-native";

export default ({ todoList }) => {
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={todoList}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column=${index}`}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    ></FlatList>
  );
};
