import React, { useRef, useEffect, useState } from "react";
import { Scope } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import "./App.css";

import Input from "./components/Form/Input";

// const initialData = {
//   email: "joao_leite@hotmail.com.br",
//   address: {
//     city: "São Luis"
//   }
// };

function App() {
  const formRef = useRef(null);

  async function handleSubimit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string()
          .email("digite um email válido")
          .required("email is required"),
        password: Yup.string()
          .min(8, "a senha deve conter no minimo 8 caracteres")
          .required("password is required"),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, "minimo de 3 caracteres")
            .required("city is required")
        })
      });

      await schema.validate(data, {
        abortEarly: false
      });

      // if (data.name === "") {
      //   //formRef.current.serFieldError("name", "Name is required");
      //   formRef.current.setErros({
      //     name: "name is required",
      //     address: {
      //       city: "city is required"
      //     }
      //   });
      // }
      formRef.current.setErros({});

      reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErros(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: "joao",
        email: "teste@teste.com",
        address: {
          city: "Bacurituba"
        }
      });
    }, 2000);
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
      <Form ref={formRef} onSubmit={handleSubimit}>
        <Input type="text" name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />

        <Scope path="address">
          <Input type="text" name="street" />
          <Input type="number" name="number" />
          <Input type="text" name="neighborhood" />
          <Input type="text" name="city" />
          <Input type="text" name="state" />
        </Scope>
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
