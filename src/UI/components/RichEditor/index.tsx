import {
    RichEditor as RNRichEditor,
    RichEditorProps,
    RichToolbar,
} from "react-native-pell-rich-editor";
import { View } from "react-native";
import { richEditorStyle } from "./style";
import React from "react";
import { themeColors } from "../../theme/colors";
import { constants } from "../../config/constants";

type Props = typeof RichEditorProps;

export const RichEditor: React.FC<Props> = (props) => {
    const richText =
        React.createRef<typeof RNRichEditor>() ||
        React.useRef<typeof RNRichEditor>();

    return (
        <View style={richEditorStyle.container}>
            <RNRichEditor
                ref={richText}
                style={richEditorStyle.editor}
                editorStyle={{
                    backgroundColor: themeColors.background.primary,
                    color: themeColors.text.paragraph.primary,
                }}
                androidLayerType={"software"}
                {...props}
            />
            <RichToolbar
                editor={richText}
                style={richEditorStyle.toolbar}
                actions={constants.richEditorToolbarActions}
            />
        </View>
    );
};
