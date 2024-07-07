import React from "react";

const DashboardMessages = () => {
	return (
		<div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
			<h1 className="text-center text-[30px] py-3 font-Poppins">
				All Messages
			</h1>

			{/* All Messages List */}
			<MessageList />
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
	return (
		<div className={`w-full flex p-3 px-3 cursor-pointer bg-[#00000010]`}>
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

export default DashboardMessages;
