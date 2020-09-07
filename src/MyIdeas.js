import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import Fab from "@material-ui/core/Fab";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar, Button, Hidden, Grid } from "@material-ui/core";
import { DataContext } from "./DataContext";
import { reject, concat, map } from "lodash";
import { AuthContext } from "./AuthContext";
import { useHistory } from "react-router-dom";
import { Idea } from "./Idea";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    minHeight: 128,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    minHeight: 128,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
}));

export default function MyIdeas() {
  const { auth, setAuth, initialize, signOut } = React.useContext(AuthContext);
  const { data, setData, getMe, getIdeas } = React.useContext(DataContext);
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [ideas, setIdeas] = React.useState([]);
  const [me, setMe] = React.useState({});
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getApiData = async () => {
    await getMe(auth);
    await getIdeas({ jwt: auth.jwt, page: 1 });
    setLoaded(true);
  };

  const logOut = async () => {
    await signOut(auth);
    history.push("sign-in");
  };

  const removeIdea = async (id) => {
    setIdeas(reject(ideas, (idea) => idea.id === id));
  };

  const syncIdea = async (remoteIdea, localIdea) => {
    const syncedIdeas = map(ideas, (idea) =>
      idea.id === localIdea.id ? remoteIdea : idea
    );
    setIdeas(syncedIdeas);
  };

  React.useEffect(() => {
    initialize()
      .then(getApiData)
      .catch(() => history.push("sign-in"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.jwt]);

  React.useEffect(() => {
    if (data.me) {
      setMe(data.me);
    }
  }, [data.me]);

  React.useEffect(() => {
    if (data.ideas) {
      setIdeas(data.ideas);
    }
  }, [data.ideas]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        color="inherit"
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            color="textPrimary"
            noWrap
            className={classes.title}
          >
            <Box ml={12}>My Ideas</Box>
          </Typography>
          <Box mr={12}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() =>
                setIdeas(
                  concat(
                    {
                      id: ideas.length,
                      edit: true,
                      impact: 1,
                      ease: 1,
                      confidence: 1,
                      remote: false,
                    },
                    ideas
                  )
                )
              }
            >
              <Avatar
                style={{ height: "100%", width: "100%", opacity: 0.8 }}
                src="https://small-project-api.herokuapp.com/mockup/web/assets/btn_addanidea.png"
              />
            </Fab>
          </Box>
        </Toolbar>
        <Box marginX={open ? 12 : 0}>
          <Divider />
        </Box>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <Button className={classes.toolbarIcon} onClick={handleDrawerClose}>
          <Box
            flexGrow={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Avatar
              src={
                "https://small-project-api.herokuapp.com/mockup/web/assets/IdeaPool_icon.png"
              }
            />
            <Box m={1}>
              <Typography color="secondary">The Idea Pool</Typography>
            </Box>
          </Box>
        </Button>
        <Divider />
        {/* sidebar things go here */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mt={2.5}>
            {open ? (
              <Avatar style={{ height: 80, width: 80 }} src={me.avatar_url} />
            ) : (
              <Avatar src={me.avatar_url} />
            )}
          </Box>
          <Box mt={1}>
            {open ? (
              <Typography color="secondary">{me && me.name}</Typography>
            ) : (
              <Typography color="secondary">
                {me && `${me.name.split(" ")[0][0]}${me.name.split(" ")[1][0]}`}
              </Typography>
            )}
          </Box>
          <Box mt={2}>
            {open ? (
              <Button onClick={logOut}>
                <Typography color="textPrimary">Logout</Typography>
              </Button>
            ) : (
              <IconButton onClick={logOut} color="secondary">
                <ExitToAppIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Hidden smDown>
            <Box m={8}>
              {ideas.length ? (
                map(ideas, (idea) => (
                  <Idea
                    i={idea}
                    key={idea.id}
                    removeIdea={removeIdea}
                    syncIdea={syncIdea}
                  />
                ))
              ) : loaded ? (
                <Box m={20}>
                  <Grid container justify="center">
                    <Grid item>
                      <img src="https://small-project-api.herokuapp.com/mockup/web/assets/bulb.png" />
                      <Typography>Got Ideas?</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : null}
            </Box>
          </Hidden>
        </Container>
      </main>
    </div>
  );
}
