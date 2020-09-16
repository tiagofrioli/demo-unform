import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

// import { Container } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  //console.log(inputRef.current);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <Input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </div>
  );
}
