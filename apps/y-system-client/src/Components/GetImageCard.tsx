import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import useFetchImage from '../Hook/useFetchImage'

const Transition = Slide as React.ComponentType<TransitionProps & { children: React.ReactElement<any, any> }>

interface iProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const GetImageDialog: React.FC<iProps> = ({ isOpen, setIsOpen }) => {
  const [imageId, setImageId] = useState<string>('')

  const { imageSrc, error, fetchImage } = useFetchImage()

  const handleFetchImage = async () => {
    if (!imageId) return
    fetchImage(imageId)
  }

  return (
    <Dialog open={isOpen} TransitionComponent={Transition} keepMounted onClose={() => setIsOpen(false)}>
      <DialogTitle>Find an Image</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Image ID"
          variant="standard"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />

        {imageSrc && <img src={imageSrc} alt="Fetched" style={{ width: '100%', marginTop: 10 }} />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
        <Button onClick={handleFetchImage} variant="contained" color="primary">
          Fetch Image
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GetImageDialog
