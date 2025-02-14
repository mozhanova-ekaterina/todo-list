import { useEffect, useState } from "react";
import UiTextFiled from "./uikit/fields/UiTextFiled";
import taskStore from "../stores/taskStore";
import { observer } from "mobx-react-lite";

export default observer(function SearchInput() {
  const [value, setValue] = useState<string>(taskStore.searchQuery);
  
  useEffect(() => {
    taskStore.setSearchQuery(value);
  }, [value]);
  
  return (
    <UiTextFiled
      size="sm"
      label="Поиск..."
      type="search"
      placeholder=""
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});
