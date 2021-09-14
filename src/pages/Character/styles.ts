import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "100%",
    },
    media: {
      paddingBottom: "100%",
      width: "100%",
    },
    list: {
      width: "100%",
    },
  })
);
