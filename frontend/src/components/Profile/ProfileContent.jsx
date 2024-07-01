import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { MdTrackChanges } from "react-icons/md";
import {
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { johorCities } from "../../static/data";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [email, setEmail] = useState(user && user.email);
  const [name, setName] = useState(user && user.name);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setName(user.name || "");
      setPhoneNumber(user.phoneNumber || "");
      if (user.addresses && user.addresses[0]) {
        setAddress(user.addresses[0].address1 || "");
      }
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  return (
    <div className="w-full">
      {/* PROFILE */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  // onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !bg-transparent !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    readOnly
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Default Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !bg-transparent !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address}
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* ORDER */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* REFUNDS */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* TRACK ORDER */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* PAYMENT METHODS */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* ADDRESS */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "937rgh305wT#%HGkjds^d&d",
      orderItems: [
        {
          name: "iPhone 14 Pro Max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "RM " + orders.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className=" pl-8 pt-1 ">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "937rgh305wT#%HGkjds^d&d",
      orderItems: [
        {
          name: "iPhone 14 Pro Max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "RM " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className=" pl-8 pt-1 ">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "937rgh305wT#%HGkjds^d&d",
      orderItems: [
        {
          name: "iPhone 14 Pro Max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md !h-10`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARsAAACyCAMAAABFl5uBAAAAllBMVEUORZX///8AOpEAQJMAP5IAOZAAPZK6yN4JQ5QAPJFKcK0ANo8qXKIAMY33+fwvX6MANI5XerEALozv8/gVSpgoVZ2NosfL1ebg5/GXqMqjtNLT3Oqcrs43W5/q7/ZzjLsAKIpHaKbH0uSxv9jk6fJ6k79ef7UcUp09Y6SEmsJshbZFa6m2wdh+l8KjsM5UdK0AE4UAIIiTYgzZAAAMmklEQVR4nO2d63+ivBLHkQiOtaAW8H7Z9VKtbR/P+f//ueMFJZDfBHDzebqnzffF7gsFkyHMTOaSOo07w/ExiZ2fTJz0x6tMIE76fzRL2q6grx7dF0PC9ZNZlJdNq+vRTxfMFSKv25JlM3DFV4/pL0J4g0w2n4FdMzIUbG+yGQRfPZi/jmBwlU3LtaumCHmts2yirtU1KqIbnWQz8756HH8l3uwkm8S+UQhKGs7Kt7JBkD90xu5Xj+IvxR07R6uJMaLvWHXDQM/Oz95567CSsVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBYLDzl0Rojzv44tVLxBwvd8ipP5fL7fz+fJLhau1/yXm758t5QK5doEL7xdJ9BNNXc7iaG9X05W09GtJy5cjIat2evOc6u0fhGYlO73GNxZq4T1ZLvrNUsG04WX7q6f+gfw2YAbrPCC95nURpkjWo33gacXT7MXL/9ZF39vXL+PozNiRpFj+NrRrh1vDa/qpb/RAh/OcIG833uaLPSD2cx0BeTUO0LBRvWbFSg5jqcRullhKjrhUAKnc0iXRm8DPnxF68Z3DsPysTSGHX4s3gRfE/6uX5FPwu3st6tS8bxpGiH8JbpilA6GYnTzZ1XWQrxOK0im0Zjw7wcnmkZj+4DGOY/e7+2WaOHLxPzC6cAp3aQp3kP1w1AdhLursmYud25zI/EP7EUagZaKJ9gNtLqHv7f4DSbfWNxaJ+Cqmhab06nzVlEyp/eRMw0U87pq+idtqic7/KRZPCO24N+boe/fZemOwacfhVdUxGXrNiPqcks47WbGPPZO3aXTdPdrVvPMuRH58JJ7Xyg0U4U+rmZSyV5e2XADoR3S+jf+tD2KhDefoDekwa9krImzBr8AmqnczcSuxG7nmPaY0bfhSG4YaKsTnecPeG+uC7YH/YnjffI++ngnP3uKa6waXvORpzVzLRMth/QLKhDGqyAHfXlz13xijz5/kW/hV9c1Z5aM5mj2tZctjDTGN1/RvUc7eG+oaiUz62/Bxzmj0YF34OEUR8DtNFLw+GtC8PVnPEuB3ocw2zG7/4DP19IahP6PhogxCqJbcuHhzyxVSgc+AbiWm0f01Uk2d6/MTHWqunwpU8aZ4F3i26CMHBvQ/qx8bxdNPXzPlpiH1pX0CLFwL3eZTt62y8NyuX2btTb3xTVkptguW35DI4chid/o3sizpDlyblaZlSUXzXqfya7HKOLpNg4817/ger0g7s+uZugfLBu31K9eGGpyRtZwAbZUeESS9wK1QCiZDAHnER6Cdv7XTo5p4AymrNqgcj/gyUhzPAzIhMBAQE08lWaFd1PZCmwjM9YIn+F2ktzmfriHT1+zy7yjiyVUB1txdf+LXYpPaQxQQ0pmCuqrxoGbBYkmFA2JChq9pYn7VIdipNhUZdxB62shOxI+MnnZAySB3t5Ic+oVY8BZjS4x+hORZANooimNisqYEaH80GM090xlYK96xe2YWIBGV7dxsgn4A7C3W7x1G2piedlQAqQXZWOkHbrD6MWph9irP/Ok3teM94edzKIyfkGLoiW/eeIdfGOTGTzGmd2XJDaKdNQd4OY/qndh6NCoAPktg7yKxNvIvjwvbKayVwbK7hxrrrX6yVFHO/ilvmZsdKMeHRSoWOfl7iIblFdK0ExJOp2YTdBqV2f5Ay8r3IMtbKQJetfAR9uGUV7uAq2tvBPhIdP6mfkCWN+cf+qoT4nleFH17rAH/BDkoT0AJWjEuRAIdLfyjwZHrbK4l0PERvzWjldROj7wsg4+MqJmvD8nQLOSvW7y0ZqY5fwr2oOllQsyYN/vyiCuJB1qqwPZnIwlCMZ+GPH+cPZAVsZQExeCPNBvHslLC4a+bkTjpIJ00EDOKg04pgsz54XCbUNL2jVA4a3y2hruloa5he1qQwuLwa40lOkC5/z8iFCkxUjsDwf/JK+bYpQ/6OcdE7ybyskPZ7dk6cR6JYHCJJfUoDiqYjfj/eH8QRYCgZp4WngsAXIO8/FD5JvkiQYdNsl7wgMu/GW3i7KcTPCnLvB9yNYFFN22MAlohQpx53Z5dCFa9ljjC/O812/3VB2tK8GoAUxz3wO9oos2SoVdskBmSnnnoQtZYDXn1A7SKh/X1QE2hWENr0kLeCFW2iz3pKAZmmhJKJECogr5qcUSax1C8ejUgULmBNS2PAIKztztL8zkFgOyMGKqHvdKVJJZujCBKwfNf5O67wR258W3/kGQc3LzX2B2YFX0Hsp2U3fh4LyxcnsgHJSwu7/4IHj0YUYZ0w6olNQIwqyTUk1QwUylvOiqQ26AJIoAW5vw/t6AEo6pEdHg4N81BEIEhj4q6jnqIL8OHkpObl9XH5LSUi5Ffl8WNUSm1lAixgUPc3oxgi7apX8WtSU9owkylsJPYLFpnmIlLAzKZv4d2k30a4bNGASYW3RZsAReloXij8Ntx4KLd1KnX1oKGR7zM0NPT4oqojJMU6dbo+Df+anAaN1EcaugnW/xsTe/sy2rUcrnVmEIRBoHysxwKeO6oBTeeSuOrDsI4sMMjc5rp3ZvW6J2chsiWKgljwMYyo2Z7SaM9rY6uNYalEX10Duir/Oltr/VJm/lkC81wQ8M5eSeD95qM5lfGLGMenindVR1XIAm9142NDde6vSOFPyB0aGci0Cx+oUHi7DV2anPMExgXZ1SMIwH1gjLG6GoLTR6R5oaKsEobOmAxlyb2W7C4MrBewKGE/ji8LFWi7y5DmvQs8pklLBrrPOvNvD+NlXD0CUgKzz7BXYCIfDnsZmq9tQoODJhndV9gXbQjmT360Xmv+qOLjK03SRHXdyrX+BxoYwhDJNXdi98pub4vo0ngbzusIj6FUOxP7QmI7CWwmdVwxJyENkCWJUmTuvdeweQ31cJU94fMklgysihg71BYQ0L2oM657ZuyK2wAYPUr9LA4B4XBVTPT3PwRXVjwYNLsYZpeS5yXaphLPYHi9aKjFDYCe6mNjUMKK4jWF19O5w5rIaZMhzGGBSBwbRSM1XW0YzXTZrBYQowKsH3ptWjpEngAt6iwAJuOTH6u63vL8X6ZqsJrlXElPdHSXmnKy75gWZKqmaLp9ND7PKLpwmjP2loDPp9VVFq8x6VDSxmzAMbDOCGVEqX0/w0u9E48Rmj3sbtZtF1XmXZUD2mlHG5G4Ebk2Bt+yaLSIq0Hm+1bAZusTCW3JcDXq9XdaNrzKxA6X63IrgQRwarfZwTzoQgeU7T2Wsc9Dy3nVbod4LdG2cerz9WXqCvxZT3V+pjMUV0ZWYqH/gKF6vJ4G27XB6W28Ga9xuufht1HvX70mEY2jXAUL7MJ7aIMOUk1U3pGwg5rpHwKgX6OjaGRMP0qt4JcdyefPRoswBYzR7NlNS5AUUA9WB7lmuCS8fvzJg2TnhGRTYmXEZQQnRV5ShhVw9TW3GcnbwRMn8fGBUGyekR3E1SwvH6+sK3fBEnzxhQoG7K+2Pq91O4lAqs45OStrjcX0+qrWAfwPmkFYxw1LcXRHAfQ7tt4NKE0DmTEvUwP6NnnAYz4bMKeZ+lrW4vFqYUjkO8aphyIyozUzA/o2XWu84Hn6ww5dNeyHs19vdpuZbKE0tuSwv7IaTAFl9zjQm3qWiYkxXYgeAtu6EibF0NMGrhvE4d1ac0SDJT9faK0+5tXZALe0k15RGondZU7E8T/GNOzWL64KLMOtTz3sK37Hg2HO9b67LcwM005v0RG/xj+0qgGZLS9FrbV5TM5FmKK+ISL20YGqT1Hzl+i7k5E/xrsU+rrOhaPLUq+n6L2V5OtuGerZHW7CCdUD3fUQJnxUEOPAU+3Vw3RCfZtkp1TtjaivxxfjhGO9CqVlQjZagFjw3+adoqX9C0874Q+b3e++CD31ZNJwfRKz5eVEzXaJQk2QN1NBtDsb+zcLoATT5FvPZVFO1EwvVcv3uYfZzPx0wnEEaj6Wq9fReeB9b97vikUharEnv1GnNHk2J3XHNBU4Xx00n4rtd04iS5nqs6T2LyPZ+brkCUDf+BS/4ecufx6qVusVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLJZvAvsHRH88sWPoVMTvBz07xnpjvhui75jqjP52uGNnWP/Pr/8IyB86po5h/W5Q0nDM9Th8L7zZSTYR07P8sxHd6CSbRsvIn/z9XtD5pKHzEQEDY90x34bg3Al8OT7hU/NXCH8iFFxO8XbSLjWrczKEd+0fT4/daHU924Zzgcjbp93vtyNJolniu6bOZPi/hYTrJ7Nbu6V0XMtw3H/+2bvy+Lk/lg7S+R/FdcssxDsKTgAAAABJRU5ErkJggg=="
            alt=""
            className=" w-8 h-auto"
          />
          <h5 className=" pl-5 font-[600]">Nivima Dickson</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>5196 **** **** ****</h6>
          <h5 className=" pl-6 ">08/26</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className=" cursor-pointer " />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [postcodeDisabled, setPostcodeDisabled] = useState(true);
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setPostCode("");
    setPostcodeDisabled(!selectedCity);
  };

  const handlePostcodeChange = (e) => {
    setPostCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(city, address1, address2, postCode, addressType)
      );
      setOpen(false);
      setCity("");
      setAddress1("");
      setAddress2("");
      setPostCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (data) => {

  }

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={handleCityChange}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="">Select a city...</option>
                      {johorCities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <select
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      required
                      value={postCode}
                      onChange={handlePostcodeChange}
                      disabled={postcodeDisabled}
                    >
                      <option value="">Select a postcode...</option>
                      {city &&
                        johorCities
                          .find((c) => c.name === city)
                          ?.postcode.map((code) => (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md !h-10`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      {user &&
  user.addresses.map((item, index) => (
    <div
      className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
      key={index}
    >
      <div className="flex items-center flex-[1_1_20%]">
        <h5 className="pl-5 font-[600]">{item.addressType}</h5>
      </div>
      <div className="flex items-center flex-[1_1_50%]">
        <h6 className="text-[12px] 800px:text-[unset]">
          {item.address1} {item.address2}
        </h6>
      </div>
      <div className="flex items-center flex-[1_1_20%]">
        <h6 className="text-[12px] 800px:text-[unset]">
          {user && user.phoneNumber}
        </h6>
      </div>
      <div className="flex items-center flex-[1_1_10%] justify-end pl-8">
        <AiOutlineDelete
          size={25}
          className="cursor-pointer"
          onClick={() => handleDelete(item)}
        />
      </div>
    </div>
  ))}

        {/* <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
          <div className="flex items-center">
            <h5 className=" pl-5 font-[600]">Default Address</h5>
          </div>
          <div className="pl-8 flex items-center">
            <h6>Kolej Tun Ghaffar Baba, UTM</h6>
          </div>
          <div className="pl-8 flex items-center">
            <h6>0146830582</h6>
          </div>
          <div className="min-w-[10%] flex items-center justify-between pl-8">
            <AiOutlineDelete size={25} className=" cursor-pointer " />
          </div>
        </div> */}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
