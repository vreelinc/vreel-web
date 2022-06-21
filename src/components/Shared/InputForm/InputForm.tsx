import React from "react";

const InputForm: React.FC<{
  type: any;
  id?: string;
  name: string;
  placeholder: string;
  customClass?: string;
}> = ({ type, id, name, placeholder, customClass }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={` ${customClass}`}
    />
  );
};

export default InputForm;
