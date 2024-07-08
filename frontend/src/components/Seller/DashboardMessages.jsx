import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import { AiOutlineArrowDown, AiOutlineSend } from "react-icons/ai";
import { format } from "timeago.js";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
	const { user } = useSelector((state) => state.user);
	const [conversations, setConversations] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [currentChat, setCurrentChat] = useState();
	const [messages, setMessages] = useState([]);
	const [userData, setUserData] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [activeStatus, setActiveStatus] = useState(false);
	const [images, setImages] = useState();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		socketId.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	});

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

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

	useEffect(() => {
		if (user) {
			const sellerId = user?._id;
			socketId.emit("addUser", sellerId);
			socketId.on("getUsers", (data) => {
				setOnlineUsers(data);
			});
		}
	}, [user]);

	const onlineCheck = (chat) => {
		const chatMembers = chat.members.find((member) => member !== user?._id);
		const online = onlineUsers.find((user) => user.userId === chatMembers);

		return online ? true : false;
	};

	// get messages
	useEffect(() => {
		const getMessage = async () => {
			try {
				const response = await axios.get(
					`${server}/message/get-all-messages/${currentChat?._id}`
				);
				setMessages(response.data.messages);
			} catch (error) {
				console.log(error);
			}
		};
		getMessage();
	}, [currentChat]);

	// create new message
	const sendMessageHandler = async (e) => {
		e.preventDefault();

		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(
			(member) => member.id !== user._id
		);

		socketId.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		});

		try {
			if (newMessage !== "" && newMessage.trim() !== "") {
				await axios
					.post(`${server}/message/create-new-message`, message)
					.then((res) => {
						setMessages([...messages, res.data.message]);
						updateLastMessage();
					})
					.catch((error) => {
						console.log(error);
					});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateLastMessage = async () => {
		socketId.emit("updateLastMessage", {
			lastMessage: newMessage,
			lastMessageId: user._id,
		});

		await axios
			.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
				lastMessage: newMessage,
				lastMessageId: user._id,
			})
			.then((res) => {
				setNewMessage("");
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
								setCurrentChat={setCurrentChat}
								me={user._id}
								userData={userData}
								setUserData={setUserData}
								online={onlineCheck(item)}
								setActiveStatus={setActiveStatus}
							/>
						))}
				</>
			)}

			{open && (
				<SellerInbox
					setOpen={setOpen}
					newMessage={newMessage}
					setNewMessage={setNewMessage}
					sendMessageHandler={sendMessageHandler}
					messages={messages}
					sellerId={user._id}
					userData={userData}
					activeStatus={activeStatus}
				/>
			)}
		</div>
	);
};

const MessageList = ({
	data,
	index,
	setOpen,
	setCurrentChat,
	me,
	userData,
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

	useEffect(() => {
		setActiveStatus(online);
		const userId = data.members.find((user) => user != me);

		const getUser = async () => {
			try {
				const res = await axios.get(`${server}/user/user-info/${userId}`);
				setUserData(res.data.user);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, [me, data]);

	return (
		<div
			className={`w-full flex p-3 px-3 ${
				active === index ? "bg-[#00000010]" : "bg-transparent"
			}  cursor-pointer`}
			onClick={(e) =>
				setActive(index) || handleClick(data._id) || setCurrentChat(data)
			}
		>
			<div className="relative">
				<img
					src={
						userData?.avatar
							? `${backend_url}/${userData?.avatar}`
							: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
					}
					alt=""
					className="w-[50px] h-[50px] rounded-full mr-2"
				/>
				{/* Active Indaicator */}
				{online ? (
					<div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
				) : (
					<div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
				)}
			</div>

			<div className="pl-3">
				{/* NAME */}
				<h1 className="text-[18px]">{userData?.name}</h1>
				<p className="text-[16px] text[#000c]">
					{data.lastMessageId !== userData?._id ? "You: " : ""}
					{data?.lastMessage}
				</p>
			</div>
		</div>
	);
};

const SellerInbox = ({
	scrollRef,
	setOpen,
	newMessage,
	setNewMessage,
	sendMessageHandler,
	messages,
	sellerId,
	userData,
	activeStatus,
	handleImageUpload,
}) => {
	return (
		<div className="w-full min-h-full flex flex-col justify-between">
			<div className="w-full flex p-3 items-center justify-between bg-slate-200">
				<div className="flex">
					<img
						src={
							userData?.avatar
								? `${backend_url}/${userData?.avatar}`
								: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						}
						alt=""
						className="w-[50px] h-[50px] rounded-full mr-2"
					/>
					<div className="pl-3">
						<h1 className="text-[18px] font-[600]">{userData?.name}</h1>
						<h1>{activeStatus ? "Active Now" : ""}</h1>
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
				{messages &&
					messages.map((item, index) => {
						return (
							<div
								className={`flex w-full my-2 ${
									item.sender === sellerId ? "justify-end" : "justify-start"
								}`}
								ref={scrollRef}
							>
								{item.sender !== sellerId && (
									<img
										src={`${userData?.avatar?.url}`}
										className="w-[40px] h-[40px] rounded-full mr-3"
										alt=""
									/>
								)}
								{item.images && (
									<img
										src={`${item.images?.url}`}
										className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
										alt=""
									/>
								)}
								{item.text !== "" && (
									<div className="flex flex-col justify-end items-end">
										<div
											className={`w-max p-2 rounded ${
												item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
											} text-[#fff] h-min`}
										>
											<p>{item.text}</p>
										</div>

										<p className="text-[10px] text-[#000000d3] pt-1">
											{format(item.createdAt)}
										</p>
									</div>
								)}
							</div>
						);
					})}

				{/* <div className="flex w-full my-2">
					<img
						src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						alt=""
						className="w-[40px] h-[40px] rounded-full mr-2"
					/>
					<div className="w-max p-2 rounded bg-slate-400 h-min">
						<p>hello</p>
					</div>
				</div>
				<div className="flex w-full justify-end my-2">
					<div className="w-max p-2 rounded bg-slate-400 h-min">
						<p>hello</p>
					</div>
				</div> */}
			</div>

			{/* Send message input */}
			<form
				className="p-3 relative w-full flex justify-between items-center"
				onSubmit={sendMessageHandler}
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
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
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
