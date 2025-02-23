import { observer } from "mobx-react-lite";
import themeStore from "../stores/themeStore";
import { UiButton } from "./uikit";
import { ThemeToggleIcon } from "./uikit/icons";

export default observer(function ThemeToggle() {
  return (
    <UiButton
      onClick={() => themeStore.toggleTheme()}
      icon={<ThemeToggleIcon />}
      circle
      color={themeStore.isDark ? "primary" : "default"}
      variant={themeStore.isDark ? "solid" : "outline"}
    />
  );
});
