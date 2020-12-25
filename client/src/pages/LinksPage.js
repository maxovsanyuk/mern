import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";

// MATERIAL UI

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();

  const fetchLinks = useCallback(async () => {
    const fetchedLinks = await request(`/api/link`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });

    setLinks(fetchedLinks);
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Original</TableCell>
              <TableCell align="right">Splited</TableCell>
              <TableCell align="right">Open</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links
              ? links.map((link, i) => (
                  <TableRow key={link.to}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="right">{link.to}</TableCell>
                    <TableCell align="right">{link.from}</TableCell>
                    <TableCell align="right">
                      <Link to={`/detail/${link._id}`}>Open</Link>
                    </TableCell>
                  </TableRow>
                ))
              : "No one link jet..."}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
