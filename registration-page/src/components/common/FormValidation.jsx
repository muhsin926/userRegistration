import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(3, "must be at least 3 characters long")
    .max(25, "maximum charecter upto 25")
    .matches(/^\s*\S.*$/, "Whitespace is not allowed"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  address: yup.string().required("address is required"),
  profile: yup
    .mixed()
    .test("required", "please select your profile photo", (value) => {
      return value && value.length;
    }),
});
