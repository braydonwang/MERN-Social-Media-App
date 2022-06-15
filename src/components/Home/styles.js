import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    fontSize: "50px",
    fontWeight: "700",
    background:
      "linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  image: {
    marginRight: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
