import { useState } from "react";
import { ITask } from "../types";

export const useValidation = () => {
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validateForm = (task: ITask) => {
    let isValid = true;
    if (!task.title.trim()) {
      setErrors({ ...errors, title: "Задача не введена" });
      isValid = false;
    }
    if (task.title.length > 50) {
      setErrors({
        ...errors,
        title: "Заголовок не дошлжен превышать 50 символов",
      });
      isValid = false;
    }
    if (task.description && task.description?.length > 200) {
      setErrors({
        ...errors,
        description: "Описание не должно превышать 200 символов",
      });
      isValid = false;
    }

    return isValid;
  };

  const resetErrors = () => setErrors({ title: "", description: "" });

  return { errors, validateForm, resetErrors };
};
