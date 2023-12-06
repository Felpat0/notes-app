import { View } from "react-native";
import { richEditorStyle } from "./style";
import React from "react";
import { themeColors } from "../../theme/colors";
import { constants } from "../../config/constants";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";

type Props = QuillEditor["props"];

export const RichEditor: React.FC<Props> = (props) => {
    const richText =
        React.createRef<QuillEditor>() || React.useRef<QuillEditor>();

    return (
        <View style={richEditorStyle.container}>
            <QuillEditor
                ref={richText}
                style={richEditorStyle.editor}
                theme={{
                    background: themeColors.background.primary,
                    color: themeColors.text.paragraph.primary,
                    placeholder: themeColors.text.paragraph.secondary,
                }}
                {...props}
            />
            <QuillToolbar
                editor={richText}
                options={constants.richEditorToolbarActions}
                theme={"dark"}
            />
        </View>
    );
};
