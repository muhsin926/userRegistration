import { useState } from "react";
import blank_profile from "../../assets/image/blank-profile.jfif";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { schema } from "../common/FormValidation";
import backgroundImage from "../../assets/image/watercolor.png";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    profile: "",
    address: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const convert2Base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const fileUpload = async (e) => {
    alert("f");
    const file = e.target.files[0];
    const profile = await convert2Base64(file);
    alert(profile);
    setUserDetails({ ...userDetails, profile: profile });
  };

  const submitHandler = () => {
    try {
      axios
        .post("http://localhost:7000/user-details", userDetails)
        .then((res) => {
          if (res.data.status) {
            localStorage.setItem("userId", res.data.id);
            navigate("/");
          } else {
            console.log(res.data);
          }
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section
      className="p-3 flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className=" p-6 rounded-lg   border border-gray-300 w-96 "
        style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
      >
        <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor="profile" className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <img
                className="object-cover w-20 h-20 rounded-full"
                src={userDetails.profile ? userDetails.profile : blank_profile}
                alt=""
              />
              <h4>Profile</h4>
              <p className="mb-4 text-red-600">{errors.profile?.message}</p>
            </div>
          </label>
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={(e) => fileUpload(e)}
            {...register("profile")}
            hidden
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            className="border border-gray-300 w-full p-3 rounded mb-4 mt-1"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            value={userDetails.name}
            {...register("name")}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
          <p className="mb-4 text-red-600">{errors.name?.message}</p>
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            placeholder="Enter strong password"
            id="pwd"
            name="password"
            className="border border-gray-300 w-full p-3 rounded mb-4 mt-1"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            value={userDetails.password}
            {...register("password")}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <p className="mb-4 text-red-600">{errors.password?.message}</p>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            id="address"
            name="address"
            className="border border-gray-300 w-full p-3 rounded mb-4 mt-1"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            value={userDetails.address}
            {...register("address")}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
          />
          <p className="mb-4 text-red-600">{errors.address?.message}</p>
          <button type="submit" className="p-3 w-full bg-blue-300 rounded">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
