import { CSSProperties, useState } from 'react'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import { SUB_TITLE_MSG } from './consts'
import UpludImageCard from './Components/UploadImageCard'
import GetImageCard from './Components/GetImageCard'

const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  gap: '30px'
}

const title: CSSProperties = {
  color: '#070433',
  fontSize: '3em',
  fontWeight: 'bold',
  marginTop: '30px'
}

const subTitle: CSSProperties = {
  fontSize: '2em',
  maxWidth: '1000px',
  color: 'rgb(255 0 0)'
}

const buttonsStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '50%',
  marginTop: '30px'
}

const buttonStyle: CSSProperties = {
  marginTop: '30px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  width: '300px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
}

const App = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isGetDialogOpen, setIsGetDialogOpen] = useState(false)

  const toggleOpenCloseUploadCard = () => {
    setIsUploadDialogOpen(!isUploadDialogOpen)
  }

  const toggleOpenCloseGetCard = () => {
    setIsGetDialogOpen(!isGetDialogOpen)
  }

  return (
    <div style={container}>
      <div style={title}>{"Welcome to Yair's photo uploading system"}</div>
      <div style={subTitle} dangerouslySetInnerHTML={{ __html: SUB_TITLE_MSG }} />
      <div style={buttonsStyle}>
        <Button style={buttonStyle} variant="contained" onClick={toggleOpenCloseUploadCard}>
          <CloudUploadIcon />
          {"Upload Image"}
        </Button>
        {isUploadDialogOpen && <UpludImageCard isOpen={isUploadDialogOpen} setIsOpen={setIsUploadDialogOpen} />}

        <Button style={buttonStyle} variant="contained" onClick={toggleOpenCloseGetCard}>
          <ImageSearchIcon />
          {"Get Image"}
        </Button>
        {isGetDialogOpen && <GetImageCard isOpen={isGetDialogOpen} setIsOpen={setIsGetDialogOpen} />}
      </div>
    </div>
  )
}

export default App
