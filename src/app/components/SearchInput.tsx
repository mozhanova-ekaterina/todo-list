import { useEffect, useState } from "react";
import taskStore from "../stores/taskStore";
import { observer } from "mobx-react-lite";
import { UiTextFiled } from "./uikit";

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
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});
