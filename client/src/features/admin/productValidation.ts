import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  genre: yup.string().required(),
  type: yup.string().required(),
  price: yup
    .number()
    .required()
    .moreThan(100, "Price must be greater than 100"),
  quantityInStock: yup
    .number()
    .required()
    .min(0, "Quantity cannot be less than 0"),
  description: yup.string().required(),
  file: yup.mixed().required("Please provide an image"), // Make the file required directly
});
