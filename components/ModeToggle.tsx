import { DarkMode, LightMode } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';

export function ModeToggle({ sx = {} }) {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      sx={{
        width: 40,
        height: 40,
        padding: 0,
        minWidth: 0,
        borderRadius: '50%',
        ...sx,
      }}
    >
      {mode === 'dark' ? <LightMode/> : <DarkMode/>}
    </Button>
  );
}
