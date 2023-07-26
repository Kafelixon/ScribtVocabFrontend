import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DragEvent, useState } from 'react';

const Root = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    minHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'dashed',
    borderColor: theme.palette.text.secondary,
    borderWidth: 2,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

interface DropZoneProps {
    onDrop: (files: File[]) => void;
}

export default function DropZone({ onDrop }: DropZoneProps) {
    const [highlight, setHighlight] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHighlight(true);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHighlight(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHighlight(false);
        const files = Array.from(event.dataTransfer.files);
        setSelectedFile(files[0]);
        onDrop(files);
    };

    return (
        <Root
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: 'pointer' }}
            sx={{ ...(highlight && { borderColor: 'primary.main' }) }}
        >
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => {
                    if (e.target.files !== null) {
                        console.log( e.target.files[0]);
                        const filesArray = Array.from(e.target.files);
                        onDrop(filesArray);
                        setSelectedFile(filesArray[0]);
                    }
                }}
            />
            
            <label htmlFor="fileInput">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    gap={1}
                >
                    <CloudUploadIcon fontSize="large" />{selectedFile ? (
                <Typography variant="h6">{selectedFile.name}</Typography>
            ) : (
                    <Typography >
                        Drag and drop a file here or click to select a file
                    </Typography>
                )}
                </Box>
            </label>
        </Root>
    );
}

// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Card, { CardProps } from '@mui/joy/Card';
// import Typography from '@mui/joy/Typography';

// interface DropZoneProps extends Omit<CardProps, 'onFileSelect'> {
//     setFile: React.Dispatch<React.SetStateAction<File | null>>;
// };


// export default function DropZone({ setFile, sx, ...props }: DropZoneProps) {
//     const fileInput = React.useRef(null);

//     return (
//         <><input
//             ref={fileInput}
//             type="file"
//             style={{ display: 'none' }}
//             onChange={(e) => {
//                 setFile(e.target.files ? e.target.files[0] : null);
//             }}
//         />
//             <Card
//                 variant="outlined"
//                 {...props}
//                 sx={[
//                     {
//                         borderRadius: 'sm',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 1,
//                         alignItems: 'center',
//                         flexGrow: 1,
//                     },
//                     ...(Array.isArray(sx) ? sx : [sx]),
//                 ]}
//                 onClick={() => {
//                     if (fileInput.current) {
//                         (fileInput.current as HTMLInputElement).click();
//                     }
//                 }}
//             >
//                 <Box sx={{ p: 1, bgcolor: 'background.level1', borderRadius: '50%' }}>
//                     <Box
//                         sx={{
//                             width: 32,
//                             height: 32,
//                             borderRadius: '50%',
//                             bgcolor: 'background.level2',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <i data-feather="upload-cloud" />
//                     </Box>
//                 </Box>
//                 <Typography level="body2" textAlign="center">
//                     Click to upload
//                     <Typography level="body2" sx={{ textDecoration: 'line-through' }}> or drag and drop</Typography>
//                     <br /> SVG, PNG, JPG or GIF (max. 800x400px)
//                 </Typography>
//             </Card>
//         </>
//     );
// }
