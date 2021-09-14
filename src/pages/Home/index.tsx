import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputBase,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useLazyQuery } from "@apollo/react-hooks";
import { Skeleton, Pagination, AlertTitle, Alert } from "@material-ui/lab";

import { useStyles } from "./styles";
import { ICharacters } from "shared/interfaces";
import { GET_CHARACTERS } from "shared/graphQL/queries";

export const Home: React.FC = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [characters, setCharacters] = useState<ICharacters[]>([]);

  const [getCharacters, { loading: loadingChar, data: dataChar }] =
    useLazyQuery(GET_CHARACTERS);

  const { search, searchIcon, inputRoot, input, card, media } = useStyles();

  useEffect(() => {
    getCharacters({
      variables: { limit: (activePage - 1) * 20, offset: 20 },
    });
  }, [getCharacters, activePage]);

  useEffect(() => {
    if (dataChar) {
      const { data, total } = dataChar.charactersWithTotal;
      setCharacters(data);
      setTotalPages(Math.round(total / 20));
    }
  }, [dataChar]);

  const skeleton = (
    <Grid container item lg={3} md={3} sm={4}>
      <Card className={card}>
        <CardActionArea>
          <Skeleton className={media} variant="rect" animation="wave" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="label">
              <Skeleton variant="rect" animation="wave" width="40%" />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box marginTop={2} />

      <Grid container justifyContent="flex-end">
        <div className={search}>
          <div className={searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: inputRoot,
              input: input,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={({ target }) => setSearchParam(target.value)}
          />
        </div>
      </Grid>

      <Box marginBottom={3} />

      <Grid container spacing={2}>
        {loadingChar
          ? Array(12).fill(skeleton)
          : characters?.map((item) => (
              <Grid container item lg={3} md={3} sm={4} key={item.id}>
                <Card className={card}>
                  <CardActionArea>
                    <CardMedia
                      className={media}
                      image={item.thumbnail}
                      title={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="label">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Box marginTop={3} />

      <Grid container justifyContent="center">
        {totalPages > 0 && (
          <Pagination
            color="primary"
            count={totalPages}
            page={activePage}
            onChange={(_, page: number) => setActivePage(page)}
          />
        )}
      </Grid>

      <Box marginBottom={3} />

      {!loadingChar && characters?.length < 1 && (
        <Grid item sm={12}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Oh! No results for "
            <i
              style={{
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              {searchParam.trimEnd()}
            </i>
            " — <b>Tray again!</b>
          </Alert>
        </Grid>
      )}
    </Container>
  );
};
