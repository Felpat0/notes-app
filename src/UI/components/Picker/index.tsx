import {
    PickerItemProps,
    PickerProps,
    Picker as RNPicker,
} from "@react-native-picker/picker";

type Props = {
    options: PickerItemProps[];
} & PickerProps;

export const Picker: React.FC<Props> = (props: Props) => {
    return (
        <RNPicker {...props}>
            {props.options.map((option, index) => (
                <RNPicker.Item key={index} {...option} />
            ))}
        </RNPicker>
    );
};
