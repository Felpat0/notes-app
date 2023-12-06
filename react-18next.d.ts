import "react-i18next";
import { resources } from "./src/localization/i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: (typeof resources)["en"];
    }
}
