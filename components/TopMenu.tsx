import { DarkMode, LightMode, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import { logout } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function TopMenu() {
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const uid = userState.user ? userState.user.uid : null;

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        position: "absolute",
        top: 0,
        p: 2,
        width: "100vw",
        minHeight: "60px",
        flexDirection: "row",
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box sx={{ justifySelf: "start" }}>
        <Typography
          level="h2"
          fontWeight="xl"
          textAlign="center"
          onClick={handleHomeButton}
        >
          Script Vocab
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        {!uid && <Button onClick={handleSignIn}>Sign in</Button>}
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "solid", color: "primary" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            >
              Mode &nbsp; {mode === "dark" ? <LightMode /> : <DarkMode />}
            </MenuItem>
            {uid && (
              <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            )}
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
