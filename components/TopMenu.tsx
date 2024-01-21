import MenuIcon from "@mui/icons-material/Menu";
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
        top: -1,
        p: 2,
        width: "100vw",
        minHeight: "60px",
        flexDirection: "row",
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        gap: 1,
        zIndex: 1,
        // Glassmorphism properties
        backgroundColor: "rgba(255, 255, 255, 0.4)", // semi-transparent white
        backdropFilter: "blur(10px)", // blur effect
        borderRadius: "10px", // rounded corners
        boxShadow: "0 8px 32px 0 rgba(31, 38, 31, 0.17)", // shadow
      }}
    >
      <Box sx={{ justifySelf: "start" }}>
        <Typography
          level="h2"
          fontWeight="xl"
          textAlign="center"
          onClick={navigateToHome}
        >
          Vocapy
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
            sx={{
              borderRadius: "8px", // Apple squircle border radius
              height: "40px",
              // padding: 1,
            }}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "plain", color: "neutral" } }}
          >
            <MenuIcon sx={{ fontSize: "38px" }} />
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
