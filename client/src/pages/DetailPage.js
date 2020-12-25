import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../Components/Loader";

import styled from "styled-components";

const DetailBox = styled.div`
  width: 100%;
  height: available;
`;

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetchedLink = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setLink(fetchedLink);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  useEffect(() => {
    refresh && window.location.reload(false);
  }, [refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    link && (
      <DetailBox>
        <h2>Link</h2>
        <p>
          <div>
            Your link:
            <a
              href={link.to}
              target="_blank"
              useRef="noopener noreferrer"
              onClick={() => setRefresh(true)}
            >
              {link.to}
            </a>
          </div>
          <div>
            From:
            <a href={link.from} target="_blank" useRef="noopener noreferrer">
              {link.from}
            </a>
          </div>
          <p>Date: {new Date(link.date).toLocaleDateString()}</p>
          Links counter : <strong>{link.clicks}</strong>
        </p>
      </DetailBox>
    )
  );
};
