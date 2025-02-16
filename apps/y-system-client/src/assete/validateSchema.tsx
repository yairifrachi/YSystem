import * as Yup from 'yup'

export const validationSchema = Yup.object({
  expiredDate: Yup.number()
    .required('Expiration Date is required')
    .min(1, 'Expiration date must be greater than 0 and max 20')
    .max(20, 'Expiration date must be greater than 0 and max 20'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\+9725\d{8}$/, 'Phone number must be a valid Israeli mobile number (+9725XXXXXXXX)'),
})
