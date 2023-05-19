import axios from "axios";
import { useEffect, useState } from "react";
import blank from "../../assets/image/blank-profile.jfif";
import { useNavigate } from "react-router-dom";
import EditDetails from "./EditDetails";

const Home = () => {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(import.meta.env.VITE);
    getUser();
  }, [edit]);

  const userId = localStorage.getItem("userId");
  const getUser = () => {
    try {
      axios
        .get(`http://localhost:7000/user-details?userId=${userId}`)
        .then((res) => {
          if (res.data.status) {
            setUser(res.data.user);
            console.log(res.data.user);
          } else alert(res.data.err.message);
        });
    } catch (err) {
      alert(err.message);
    }
  };
  const deleteUserAccount = () => {
    try {
      axios
        .delete(`http://localhost:7000/user-details?userId=${userId}`)
        .then((res) => {
          if (res.data.status) {
            navigate("/registration");
          } else alert(res.data.err.message);
        });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <section className="flex flex-col  justify-center items-center pt-10">
      <div className="md:w-5/6 w-full m-5 mt-4 flex justify-between relative h-40 rounded-tl-[4rem] bg-gradient-to-r from-violet-200 to-fuchsia-200">
        <div>
          <div className="flex items-center justify-center w-24 rounded-full bg-white h-28 left-12 top-32 absolute ">
            <img
              src={user?.profile ? user?.profile : blank}
              className="w-26 h-26 rounded-full"
              alt="Profile photo"
            />
          </div>
        </div>
      </div>
      <div className="flex  justify-between items-start w-4/6 md:pl-14 pl-20 ">
        {" "}
        <div>
          <h1 className="text-lg font-medium">{user?.name}</h1>
          {edit ? (
            <h1>Update your photo and personal details</h1>
          ) : (
            <>
              <h1 className="">{user?.address}</h1>
            </>
          )}
        </div>
        <div>
          <button
            onClick={() => setEdit(!edit)}
            className="bg-gradient-to-b hover:bg-gradient-to-t from-gray-400 rounded-md to-black text-white py-1 px-5"
          >
            Edit
          </button>
          <button
            onClick={deleteUserAccount}
            className=" ml-3 bg-gradient-to-b hover:bg-gradient-to-t from-gray-900 rounded-md to-red-700 text-white py-1 px-5"
          >
            Delete
          </button>
        </div>
      </div>
      {edit && <EditDetails user={user} setEdit={setEdit} />}
    </section>
  );
};

export default Home;
