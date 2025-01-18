import { ReactNode, useContext } from "react";
import { LocalContext } from "../LocalContext";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UserRoles } from "../Utils/Responses";
import { useRegisterMutation } from "../requests/mutations";
import Loader from "./Loader";

export type userObjectType = {
  name: string;
  role: UserRoles;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function AddUser() {
  // const validationSchema = yup.object().shape({
  //   name: yup.string().required(),
  //   role: yup.string().oneOf(Object.values(UserRoles)).required(),
  //   email: yup.string().required().email("Must be a email"),
  //   password: yup
  //     .string()
  //     .required("password is required")
  //     .min(8, "min 8 characters are required")
  //     .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
  //     .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
  //     .matches(/^(?=.*[0-9])/, "Must contain at least one number")
  //     .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  //   confirmPassword: yup
  //     .string()
  //     .required("confirm password is required")
  //     .oneOf([yup.ref("password")], "password must match")
  //     .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
  //     .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
  //     .matches(/^(?=.*[0-9])/, "Must contain at least one number")
  //     .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  // });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      role: UserRoles.user,
      email: "",
      password: "",
      confirmPassword: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  const { openUserDialog, setOpenUserDialog } = useContext(LocalContext);
  const { mutate, isPending, isSuccess, isError } = useRegisterMutation();
  if (isPending && !isError && !isSuccess) return <Loader />;
  const onSubmit = (data: userObjectType) => {
    console.log("onsubmit", data);
    const payload = {
      name: data.name,
      role: data.role,
      email: data.email,
      password: data.password,
    };
    mutate(payload);
    setOpenUserDialog(false);
    console.log("dataon onsubmit", data);
  };

  return (
    <>
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              height: 450,
              width: 500,
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              gap: 2.5,
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" alignSelf={"center"}>
              {" "}
              Add User
            </Typography>

            <TextField
              label="Name"
              sx={{ width: 300 }}
              {...register("name")}
              placeholder="Name"
            />

            <Autocomplete
              sx={{ width: 300 }}
              renderInput={function (
                params: AutocompleteRenderInputParams
              ): ReactNode {
                return (
                  <>
                    <TextField
                      {...params}
                      label="Role"
                      fullWidth
                      style={{
                        backgroundColor: "inherit",
                      }}
                      {...register("role")}
                    />
                  </>
                );
              }}
              options={[
                { label: "user", id: 1 },
                { label: "admin", id: 2 },
              ]}
            ></Autocomplete>
            <TextField
              label="Email"
              placeholder="mail"
              sx={{ width: 300 }}
              {...register("email")}
            />
            <TextField
              label="Password"
              placeholder="Password"
              type="password"
              sx={{ width: 300 }}
              {...register("password")}
            />
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              sx={{ width: 300 }}
              {...register("confirmPassword")}
            />
          </DialogContent>
          <Divider />
          <DialogActions sx={{ margin: "5px", marginRight: "20px" }}>
            <Button variant="outlined" onClick={() => setOpenUserDialog(false)}>
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
