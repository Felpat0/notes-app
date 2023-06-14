import { ScrollView, StyleSheet } from "react-native";
import { Button } from "./../../UI/components/Button";
import { Input } from "./../../UI/components/Input";
import { themeColors } from "./../../UI/theme/colors";
import { Checkbox } from "./../../UI/components/Checkbox";
import { useWindowDimensions } from "react-native";
import { getDeviceType } from "./../../UI/utils";
import { Text } from "./../../UI/components/Text";
import { Card } from "./../../UI/components/Card";
import { Modal } from "./../../UI/components/Modal";
import { useState } from "react";
import { DatePicker } from "./../../UI/components/DatePicker";
import { Calendar } from "./../../UI/components/Calendar";
import { logout } from "../../firebase";

export default function TestScreen() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const dimensions = useWindowDimensions();
    //return <RichEditor />;
    return (
        <ScrollView style={styles.container}>
            <Text style={{ color: "white" }}>
                {dimensions.width} x {dimensions.height} (
                {getDeviceType(dimensions.width)})
            </Text>
            <Button width={"100%"} onPress={logout}>
                Logout
            </Button>
            <Input
                variant={"default"}
                style={{ marginBottom: 10 }}
                placeholder={"Placeholder"}
            />
            <Checkbox checked={true}>Totti</Checkbox>
            <Text variant={"title"}>Title</Text>
            <Text variant={"subtitle"}>Subtitle</Text>
            <Text variant={"paragraph"}>Paragraph</Text>
            <Card title={"Title"} subtitle={"Subtitle"} />
            <Modal title={"Modal Title"} visible={isModalOpen}>
                <Text>Modal content</Text>
                <Button width={"100%"} onPress={() => setIsModalOpen(false)}>
                    Close Modal
                </Button>
            </Modal>
            <Button width={"100%"} onPress={() => setIsModalOpen(true)}>
                Open Modal
            </Button>
            <DatePicker
                date={selectedDate}
                onChange={(event, date) => setSelectedDate(date)}
            />
            <Calendar
                selectedDate={selectedDate}
                onChange={setSelectedDate}
                datesToMark={[new Date(), new Date("2023-05-15")]}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.background.primary,
        padding: 20,
    },
});
