import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowDown, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";

const DashboardMessages = () => {
	const { user } = useSelector((state) => state.user);
	const [conversations, setConversations] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const messageList = axios
			.get(`${server}/conversation/get-all-conversation-seller/${user._id}`, {
				withCredentials: true,
			})
			.then((res) => setConversations(res.data.conversations))
			.catch((error) => {
				console.log(error);
			});
	}, [user]);
	console.log(conversations);

	return (
		<div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
			{!open && (
				<>
					<h1 className="text-center text-[30px] py-3 font-Poppins">
						All Messages
					</h1>

					{/* All Messages List */}
					{conversations &&
						conversations.map((item, index) => (
							<MessageList
								key={index}
								data={item}
								index={index}
								setOpen={setOpen}
							/>
						))}
				</>
			)}

			{open && <SellerInbox setOpen={setOpen} />}
		</div>
	);
};

const MessageList = ({
	data,
	index,
	setOpen,
	setCurrentChat,
	me,
	setUserData,
	online,
	setActiveStatus,
	isLoading,
}) => {
	const [active, setActive] = useState(0);
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`?${id}`);
		setOpen(true);
	};

	return (
		<div
			className={`w-full flex p-3 px-3 ${
				active === index ? "bg-[#00000010]" : "bg-transparent"
			}  cursor-pointer`}
			onClick={(e) => setActive(index) || handleClick(data._id)}
		>
			<div className="relative">
				<img
					src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
					alt=""
					className="w-[50px] h-[50px] rounded-full mr-2"
				/>
				<div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
			</div>
			<div className="pl-3">
				<h1 className="text-[18px]">Tahzeeb</h1>
				<p className="text-[16px] text[#000c]">
					Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Pariatur, libero.
				</p>
			</div>
		</div>
	);
};

const SellerInbox = ({ setOpen }) => {
	return (
		<div className="w-full min-h-full flex flex-col justify-between">
			<div className="w-full flex p-3 items-center justify-between bg-slate-200">
				<div className="flex">
					<img
						src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						alt=""
						className="w-[50px] h-[50px] rounded-full mr-2"
					/>
					<div className="pl-3">
						<h1 className="text-[18px] font-[600]">{`userData?.name`}</h1>
						<h1>{`activeStatus ? "Active Now" : ""`}</h1>
					</div>
				</div>
				<AiOutlineArrowDown
					size={20}
					className="cursor-pointer"
					onClick={() => setOpen(false)}
				/>
			</div>

			{/* Messages */}
			<div className="px-3 h-[65vh] py-3 overflow-y-scroll">
				<div className="flex w-full my-2">
					<img
						src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						alt=""
						className="w-[40px] h-[40px] rounded-full mr-2"
					/>
					<div className="w-max p-2 rounded bg-slate-400 h-min">
						<p>hello</p>
					</div>
				</div>
			</div>
			<div className="flex w-full justify-end my-2">
					<div className="w-max p-2 rounded bg-slate-400 h-min">
						<p>hello</p>
					</div>
			</div>

			{/* Send message input */}
			<form
				className="p-3 relative w-full flex justify-between items-center"
				// onSubmit={sendMessageHandler}
			>
				<div className="w-[30px]">
					<input
						type="file"
						name=""
						id="image"
						className="hidden"
						// onChange={handleImageUpload}
					/>
					<label htmlFor="image">
						<TfiGallery className="cursor-pointer" size={20} />
					</label>
				</div>
				<div className="w-full">
					<input
						type="text"
						required
						placeholder="Enter your message..."
						// value={newMessage}
						// onChange={(e) => setNewMessage(e.target.value)}
						className={`${styles.input}`}
					/>
					<input type="submit" value="Send" className="hidden" id="send" />
					<label htmlFor="send">
						<AiOutlineSend
							size={20}
							className="absolute right-4 top-5 cursor-pointer"
						/>
					</label>
				</div>
			</form>
		</div>
	);
};

export default DashboardMessages;
