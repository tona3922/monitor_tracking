import React, { useState } from "react";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import avatar from "../../image/avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import { updatebyid, update, selectUser } from "../../storage/figures/user";
export const Profile = () => {
  const [showSidebar, setShowSideBar] = useState();
  const [btn, setBtn] = useState("Edit");
  const [edit, setEdit] = useState("edit");
  const handleChange = () => {
    if (btn === "Edit") {
      setBtn("Save");
      setEdit("editsave");
    } else {
      setBtn("Edit");
      setEdit("edit");
      console.log(user);
      dispatch(updatebyid(user));
    }
  };
  const [user, setUser] = useState(useSelector(selectUser));
  const dispatch = useDispatch();
  const handleValue = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="home">
      <Sidebar isOpen={showSidebar} setIsOpen={setShowSideBar} />
      <div className="profile">
        <Navbar
          isOpen={showSidebar}
          setIsOpen={setShowSideBar}
          title={"Dashboard"}
        />
        <div className="btnedit">
          <button className={edit} onClick={handleChange}>
            {btn}
          </button>
        </div>
        <div className="form">
          <div className="image">
            <img src={avatar} alt="" />
          </div>
          <div className="info">
            <div className="detail">
              <div className="title">Full Name</div>
              <input
                className="rendertitle"
                value={user.name}
                type="text"
                readOnly={btn === "Edit"}
                name="name"
                onChange={handleValue}
              />
              {/* <div className="rendertitle">{user.name}</div> */}
            </div>
            <div className="detail">
              <div className="title">User name</div>
              <input
                className="rendertitle"
                value={user.username}
                type="text"
                readOnly={btn === "Edit"}
                name="username"
                onChange={handleValue}
              />
            </div>
            <div className="detail">
              <div className="title">Email</div>
              <input
                className="rendertitle"
                value={user.email}
                type="text"
                readOnly={btn === "Edit"}
                name="email"
                onChange={handleValue}
              />
              {/* <div className="rendertitle">{user.email}</div> */}
            </div>
            <div className="detail">
              <div className="title">Password</div>
              <input
                className="rendertitle"
                value={user.password}
                type="text"
                readOnly={btn === "Edit"}
                name="password"
                onChange={handleValue}
              />
              {/* <div className="rendertitle">{user.password}</div> */}
            </div>
            <div className="detail">
              <div className="title">Phone</div>
              <input
                className="rendertitle"
                value={user.phone}
                type="text"
                readOnly={btn === "Edit"}
                name="phone"
                onChange={handleValue}
              />
              {/* <div className="rendertitle">{user.phone}</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export default Profile;
