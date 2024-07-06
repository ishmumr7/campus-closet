import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";
import { loadUser } from "../../redux/actions/user";

const ShopSettings = () => {
	const { user } = useSelector((state) => state.user);
	const [avatar, setAvatar] = useState();
	const [name, setName] = useState(user && user.name);
	const [description, setDescription] = useState(
		user && user.description ? user.description : ""
	);
	const [address, setAddress] = useState(user && user.address);
	const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
	const [postCode, setPostcode] = useState(user && user.postCode);

	const dispatch = useDispatch();

	const handleImage = async (e) => {
		e.preventDefault();

    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios.put(`${server}/user/update-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res) => {
      dispatch(loadUser);
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
	};

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/seller/update-seller-info`,
        {
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadUser());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
				<div className="w-full flex items-center justify-center">
					<div className="relative">
						<img
							src={avatar ? URL.createObjectURL(avatar) : `${backend_url}/${user.avatar}`}
							alt=""
							className="w-[200px] h-[200px] rounded-full cursor-pointer"
						/>
						<div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
							<input
								type="file"
								id="image"
								className="hidden"
								onChange={handleImage}
							/>
							<label htmlFor="image">
								<AiOutlineCamera />
							</label>
						</div>
					</div>
				</div>

				{/* shop info */}
				<form
					aria-aria-required={true}
					className="flex flex-col items-center"
					onSubmit={updateHandler}
				>
					<div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
						<div className="w-full pl-[3%]">
							<label className="block pb-2">Shop Name</label>
						</div>
						<input
							type="name"
							placeholder={`${user.name}`}
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              readOnly
						/>
					</div>
					<div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
						<div className="w-full pl-[3%]">
							<label className="block pb-2">Shop description</label>
						</div>
						<textarea
							placeholder={`${
								user?.description
									? user.description
									: "Enter your shop description"
							}`}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
						/>
					</div>
					

					<div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
						<input
							type="submit"
							value="Update Shop"
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							readOnly
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ShopSettings;
