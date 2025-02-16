import { ChangeEvent, CSSProperties, forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import { useFormik } from 'formik'
import useFileUpload from '../Hook/useFileUpload'
import { BasicImage } from '../../../lib/modaels/types/BasicImage'
import { validationSchema } from '../assete/validateSchema'

const cardBodyStyle : CSSProperties = {	
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '1rem',
}


const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface iProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const UploadImageCard: React.FC<iProps> = ({ isOpen, setIsOpen }) => {
    const { uploadProgress, uploadComplete, uploadError, imageId, uploadFile } = useFileUpload()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    useEffect(() => {
    if (!selectedFile) return
    const objectUrl = URL.createObjectURL(selectedFile)
    return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const {values, handleSubmit, touched, errors, handleChange, setFieldValue } = useFormik<BasicImage>({
        initialValues: {
            expiredDate: 1,
            phone: '',
            fileData: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!selectedFile) return
            await uploadFile(values)
        },
    })

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setFieldValue('fileData',file)
        }
    }

    return (
    <Dialog open={isOpen} TransitionComponent={Transition} keepMounted onClose={() => setIsOpen(false)}>
        <DialogTitle>{"What picture would you like to upload?"}</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent style={cardBodyStyle}>
            {
                selectedFile ?
                (<img style={{ width: '100%' }} src={URL.createObjectURL(selectedFile)} alt="Preview" />)
                : (<>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="file-upload" />
                    <label htmlFor="file-upload">
                    <Button variant="contained" color="secondary" startIcon={<CloudUploadIcon />} component="span">
                        {"Choose a picture"}
                    </Button>
                    </label>
                </>)
            }

            <TextField
                id="expiredDate"
                name="expiredDate"
                label="Expiration date"
                type="number"
                variant="standard"
                value={values.expiredDate}
                onChange={handleChange}
                error={touched.expiredDate && !!errors.expiredDate}
                helperText={touched.expiredDate && errors.expiredDate}
            />
            <TextField
                id="phone"
                name="phone"
                placeholder='+9725XXXXXXXX'
                label="Phone Number"
                variant="standard"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
            />

            {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ marginTop: 2, width: '100%' }} />}
            {uploadComplete && (
                <>
                <p style={{ color: 'green' }}>{"Upload complete!"}</p>
                <p style={{ color: 'green' }}>{`The image id also sent to your phone: ${values.phone}`}</p>
                {imageId && <p style={{ color: 'blue' }}>{"Image ID: "}{imageId}</p>} 
                </>
            )}
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        </DialogContent>

        <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
                Upload
            </Button>
        </DialogActions>
        </form>
    </Dialog>
    )
}

export default UploadImageCard
