import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import{Box,Button,Typography,Modal,IconButton,InputLabel,FormControl,Select,MenuItem, Alert,Stack} from "@mui/material"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({open,handleConfirm,handleClose,handleCancel}) {
return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton sx={{float:"right"}} onClick={handleClose}><CloseIcon/></IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Job Post will be updated with the new values
          </Typography>
          <Stack direction="row" spacing={2} sx={{mt:2}}>
            <Button variant="contained" color="success" onClick={handleConfirm}>Update</Button>
            <Button variant="contained" color='error' onClick={handleCancel}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
