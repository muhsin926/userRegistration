import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../common/FormValidation";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const EditDetails = ({ user, setEdit }) => {
  const [userDetails, setUserDetails] = useState({
    name: user.name || "",
    password: user.password || "",
    profile: user.profile || "",
    address: user.address || "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitHandle = () => {
    alert("fdfd");
    try {
      axios
        .patch(
          `http://localhost:7000/user-details?userId=${user?._id}`,
          userDetails
        )
        .then((res) => {
          res.data.status ? setEdit(false) : alert(res.data.err);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandle)}
      className="gird grid-cols-12 p-3 gap-2"
    >
      <div className="md:col-span-6 col-span-12 ">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={userDetails?.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
          {...register("name")}
          className="border border-gray-300 w-full p-3 rounded mb-4 mt-1"
        />
        <p className="mb-4 text-red-600">{errors.name?.message}</p>
      </div>
      <div className="md:col-span-6 col-span-12 ">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          value={userDetails?.address}
          onChange={(e) =>
            setUserDetails({ ...userDetails, address: e.target.value })
          }
          {...register("address")}
          className="border border-gray-300 w-full p-3 rounded mb-4 mt-1"
        />
        <p className="mb-4 text-red-600">{errors.address?.message}</p>
      </div>
      <div className="md:col-span-6 col-span-12 ">
        <label htmlFor="profile">Profile</label>
        <input
          type="file"
          value={userDetails?.profile}
          onChange={(e) =>
            setUserDetails({ ...userDetails, profile: e.target.value })
          }
          {...register("profile")}
          className="border border-gray-300 w-full p-3 rounded mb-4 mt-1"
        />
        <p className="mb-4 text-red-600">{errors.profile?.message}</p>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-b hover:bg-gradient-to-t from-gray-400 rounded-md to-black text-white py-1 px-5"
      >
        Save
      </button>
    </form>
  );
};

export default EditDetails;
