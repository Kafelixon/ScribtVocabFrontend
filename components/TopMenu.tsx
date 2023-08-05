import { DarkMode, LightMode, MoreVert } from '@mui/icons-material';
import { Box,Button, Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function TopMenu() {
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const uid = userState.user ? userState.user.uid : null;

  // useEffect(() => {
  //   const loadSettings = async () => {
  //     const theme = await getUserSettings();

  //     if (theme) {
  //       setMode(theme);
  //     }
  //   }

  //   loadSettings();
  // }, []);

  // useEffect(() => {
  //   setUserSettings(mode);
  // }, [mode]);
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
        justifyContent: "flex-end",
        gap: 1,
      }}
    >
      <Button>Sign in</Button>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "solid", color: "primary" } }}
        >
          <MoreVert />
        </MenuButton>
        <Menu>
          <MenuItem onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            Mode &nbsp; {mode === "dark" ? <LightMode /> : <DarkMode />}
          </MenuItem>
          <MenuItem>Sign in</MenuItem>
          {uid && (
            <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
          )}
        </Menu>
      </Dropdown>
    </Box>
  );
}
