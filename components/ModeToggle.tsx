import { DarkMode, LightMode, MoreVert } from '@mui/icons-material';
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function ModeToggle({ sx = {} }) {
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
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        sx={{
          ...sx,
        }}
      >
        <MoreVert />
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
          Mode &nbsp; {mode === "dark" ? <LightMode /> : <DarkMode />}
        </MenuItem>
        <MenuItem>My account</MenuItem>
        {uid && <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>}
      </Menu>
    </Dropdown>
  );
}
