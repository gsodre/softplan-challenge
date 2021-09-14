import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Alert, Skeleton } from "@material-ui/lab";
import { ArrowBack, Edit, Star } from "@material-ui/icons";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { useStyles } from "./styles";
import { ICharacters } from "shared/interfaces";
import { GET_CHARACTER_BY_ID, UPDATE_CHARACTER } from "shared/graphQL/queries";

export const Character: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [character, setCharacter] = useState<ICharacters>();
  const [getCharacters, { loading, data }] = useLazyQuery(GET_CHARACTER_BY_ID);
  const [updateCharacter] = useMutation(UPDATE_CHARACTER);

  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { card, list, media } = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = useCallback(
    async (event: any) => {
      await updateCharacter({
        variables: {
          id,
          name: event.target.name.value,
          description: event.target.description.value,
        },
      });

      setModalOpen(false);
      setSnackbarOpen(true);
      event.preventDefault();
    },
    [id, updateCharacter]
  );

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleExpandClick = () => setExpanded(!expanded);

  useEffect(() => {
    if (data) {
      setCharacter(data.getCharacter);
    }
  }, [data, setCharacter]);

  useEffect(() => {
    getCharacters({ variables: { id: Number(id) } });
  }, [getCharacters, id]);

  const skeleton = (
    <Card className={card}>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        action={<Skeleton variant="circle" width={40} height={40} />}
        title={
          <Typography variant="h4">
            <Skeleton variant="text" width="40%" />
          </Typography>
        }
      />
      <Skeleton variant="rect" className={media} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Skeleton width="100%" />
          <Skeleton width="95%" />
          <Skeleton width="75%" />
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Container maxWidth="lg">
        <Box marginTop={2} />
        <Grid container justifyContent="center">
          <Grid container item lg={6} md={8} sm={10}>
            {loading ? (
              skeleton
            ) : (
              <Card className={card}>
                <CardHeader
                  avatar={
                    <IconButton
                      aria-label="go back"
                      onClick={() => history.goBack()}
                    >
                      <ArrowBack />
                    </IconButton>
                  }
                  action={
                    <IconButton
                      aria-label="edit character"
                      onClick={() => setModalOpen(true)}
                    >
                      <Edit />
                    </IconButton>
                  }
                  title={
                    <Typography variant="h4">{character?.name}</Typography>
                  }
                />
                <CardMedia
                  className={media}
                  image={character?.thumbnail}
                  title={character?.name}
                />
                <CardContent>
                  <Typography variant="body2" color="primary" component="p">
                    {character?.description
                      ? character?.description
                      : "Character without description"}
                  </Typography>
                </CardContent>

                <CardActions style={{ justifyContent: "flex-end" }}>
                  <Button onClick={handleExpandClick} color="primary">
                    {expanded ? "Hide your series" : "Show your series"}
                  </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    {character?.series?.map((item: any) => (
                      <List
                        component="nav"
                        className={list}
                        aria-label="contacts"
                        key={item.name}
                      >
                        <ListItem button>
                          <ListItemIcon>
                            <Star />
                          </ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      </List>
                    ))}
                  </CardContent>
                </Collapse>
              </Card>
            )}
          </Grid>
        </Grid>
        <Box marginBottom={3} />
      </Container>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Character edit</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              To change this character, enter the new data to be updated.
            </DialogContentText>
            <TextField
              id="name"
              autoFocus
              fullWidth
              margin="dense"
              label="Name character"
              defaultValue={character?.name}
              autoComplete="off"
            />
            <Box marginBottom={2} />
            <TextField
              rows={5}
              fullWidth
              multiline
              margin="dense"
              id="description"
              label="Description character"
              defaultValue={character?.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Character modified successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
