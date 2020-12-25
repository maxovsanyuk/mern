import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

import styled from "styled-components";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const CreatePageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .link {
    margin: 40px 0 0 0;
    width: 40%;
    font-size: 18px;
  }
`;

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        data && history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <CreatePageBox>
      <TextField
        id="standard-basic"
        label="paste some link..."
        className="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyPress={pressHandler}
      />
    </CreatePageBox>
  );
};
