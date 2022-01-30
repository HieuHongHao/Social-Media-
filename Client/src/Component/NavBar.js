import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#101F33",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
function RenderIcon(props) {
  const text = props.text;
  switch (text) {
    case "Home":
      return (
        <HomeIcon
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
          fontSize="large"
        />
      );
    case "Posts":
      return (
        <AllInboxIcon
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
          fontSize="large"
        
        />
      );
    case "Log out":
      return (
        <ExitToAppIcon
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
          fontSize="large"
        />
      );
    default:
      return (
        <PeopleIcon
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
          fontSize="large"
        />
      );
  }
}
export default function NavBar(props) {
  const classes = useStyles();
  const text = props.text;
  const handelCurrent = props.handelCurrent;
  return (
    <>
      <AppBar
        postion="relative"
        className={classes.appBar}
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(2,0,36,1) 18%, rgba(6,103,144,1) 57%)",
        }}
      >
        <Toolbar>
          <Typography color="inherit" variant="h4">
            {text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar
          style={{
            backgroundColor:
              "linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(2,0,36,1) 18%, rgba(6,103,144,1) 57%)",
          }}
        />
        <div className={classes.toolbar}>
          <Divider />
          <List>
            {["Home", "Posts", "Users","Log out"].map((text, index) => (
              <Link to = {text === "Log out"? "/logout" : `/${text.toLowerCase()}`} key={index}>
                <ListItem button key={text} onClick={() => handelCurrent(text)}>
                  <ListItemIcon>
                    <RenderIcon text={text} />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    primaryTypographyProps={{
                      variant: "h5",
                    }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
