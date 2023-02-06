import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

import Calendar from "./src/Calendar";
import { useCalendar } from "./src/hook/use-calender";
import { runPracticeDayjs } from "./src/practice-dayjs";
import { bottomSpace, getCalendarColumns, ITEM_WIDTH } from "./src/utill";
import { useTodoList } from "./src/hook/use-todo";
import BackgroundImg from "./assets/img-paper-background.jpg";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import TodoList from "./src/TodoList";
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";
import Test from "./src/Test";

const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const {
    filterTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
    todoList,
  } = useTodoList(selectedDate);
  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;
  const flatListRef = useRef(null);

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
        todoList={todoList}
      />
      <Margin height={15}></Margin>

      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 10 / 2,
          backgroundColor: "#a3a3a3",
          alignSelf: "center",
        }}
      ></View>
      <Margin height={15}></Margin>
    </View>
  );

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제 고?", "", [
        {
          style: "cancel",
          text: "아니요",
        },
        {
          text: "네",
          onPress: () => removeTodo(todo.id),
        },
      ]);
    };

    return (
      <Pressable
        style={styles.renderContainer}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Text style={styles.contentText}>{todo.content}</Text>
        <Ionicons
          name="ios-checkmark"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
        ></Ionicons>
      </Pressable>
    );
  };

  const onPressPlus = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const onFocus = () => {
    scrollToEnd();
  };

  useEffect(() => {
    runPracticeDayjs();
  }, []);

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image style={styles.img} source={BackgroundImg}></Image>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <FlatList
            data={filterTodoList}
            keyExtractor={(_, index) => `column=${index}`}
            ref={flatListRef}
            style={{ flex: 1 }}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{ paddingTop: statusBarHeight + 60 }}
          ></FlatList>
          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format("M.D")} 에 추가할 투두`}
            onPressPlus={onPressPlus}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          ></AddTodoInput>
        </View>
      </KeyboardAvoidingView>
      <Margin height={100}></Margin>

      {/* ios 시뮬레이터 on off cmd  + shift k */}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
    // <View style={styles.container}>
    //   <Test></Test>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  renderContainer: {
    flexDirection: "row",
    width: ITEM_WIDTH,
    borderBottomWidth: 1,
    borderColor: "#a6a6a6",
    alignSelf: "center", //내 자신을 센타로
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  contentText: {
    fontSize: 14,
    color: "#595959",
    flex: 1, //차지할 수 있을만큼 쫙피셈
  },
});
