import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useHttp } from "../hooks/http.hook";

import get from "lodash/get";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const auth = useContext(AuthContext);

  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changesHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", form);
      data && setAlertMessage({ message: data.message, type: "success" });
      data && setAlertMessage({ message: "success login", type: "success" });
      auth.login(data?.token, data?.userId);
    } catch (e) {}
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", form);
      data && setAlertMessage({ message: data.message, type: "success" });
    } catch (e) {}
  };

  useEffect(() => {
    if (error) {
      setAlertMessage({ message: error, type: "warning" });
      setTimeout(() => {
        clearError();
      }, 1500);
    }
  }, [error]);

  useEffect(() => {
    get(alertMessage, "message") &&
      setTimeout(() => {
        setAlertMessage({});
      }, 1500);
  }, [get(alertMessage, "message")]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        required
        name="email"
        label="Email"
        variant="outlined"
        value={form.email}
        style={{ margin: "20px 0", width: "40%" }}
        onChange={changesHandler}
      />
      <TextField
        required
        name="password"
        variant="outlined"
        value={form.password}
        label="Password"
        style={{ width: "40%" }}
        onChange={changesHandler}
      />

      <div style={{ display: "flex", margin: "30px 0 0 0 " }}>
        <Button disabled={loading} variant="contained" onClick={loginHandler}>
          Login
        </Button>
        <Button
          disabled={loading}
          onClick={registerHandler}
          variant="contained"
          color="primary"
          style={{ margin: "0 0 0 20px" }}
        >
          Registration
        </Button>
      </div>

      {get(alertMessage, "message") && (
        <Alert severity={alertMessage?.type}>{alertMessage?.message}</Alert>
      )}
    </div>
  );
};
