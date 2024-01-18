import { MoreVert } from "@mui/icons-material";
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
import { logout } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function TopMenu() {
  const navigate = useNavigate();
  // const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const uid = userState.user ? userState.user.uid : null;

  const navigateToSignIn = () => {
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToTranslation = () => {
    navigate("/translate");
  };

  const navigateToPersonalDictionary = () => {
    navigate("/dictionary");
  };

  const navigateToSettingsPage = () => {
    navigate("/settings");
  };

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        p: 2,
        width: "100vw",
        minHeight: "60px",
        flexDirection: "row",
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        gap: 1,
        zIndex: 1,
      }}
    >
      <Box sx={{ justifySelf: "start" }}>
        <Typography
          level="h2"
          fontWeight="xl"
          textAlign="center"
          onClick={navigateToHome}
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
        {!uid && <Button onClick={navigateToSignIn}>Sign in</Button>}
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "solid", color: "primary" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={navigateToTranslation}>Translation</MenuItem>
            {uid && (
              <>
                <MenuItem onClick={navigateToPersonalDictionary}>
                  Dictionary
                </MenuItem>
                <MenuItem onClick={navigateToSettingsPage}>Settings</MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
              </>
            )}
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
