import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import useMenuPages from "../hooks/useMenuPages";
import PageLink from "./PageLink";
import { GetMenuPages, GetMenuPages_pages } from "../hooks/types/GetMenuPages";
import { Link } from "../../../config/i18n";
import usePageLink from "../hooks/usePageLink";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

type Props = {
  header: React.ReactNode;
};

const PageMenuList = ({ parentPageId }: { parentPageId?: string }) => {
  const { pages } = useMenuPages(parentPageId);
  if (!pages?.length) {
    return null;
  }

  return (
    <List style={parentPageId ? { paddingLeft: 10 } : null}>
      {pages.map((page, index) => (
        <Fragment key={page.id}>
          <PageLink
            page={page}
            key={page.id}
            Component={(props) => <ListItem button component="a" {...props} />}
          >
            <ListItemText primary={page.navigationTitle} />
          </PageLink>
          <PageMenuList parentPageId={page.id} />
        </Fragment>
      ))}
    </List>
  );
};

const HomePageButton = () => {
  const link = usePageLink({ path: "/" });
  if (!link) {
    return null;
  }
  return (
    <Link href={link.href} as={link.as} passHref>
      <ListItem button component="a">
        <ListItemText primary={link.navigationTitle} />
      </ListItem>
    </Link>
  );
};
const MainMenu: React.ComponentType<Props> = ({ header, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <HomePageButton />
      <Divider />

      <PageMenuList />

      <Divider />
      <List>
        <Link href="/admin" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Area" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {header}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MainMenu;
