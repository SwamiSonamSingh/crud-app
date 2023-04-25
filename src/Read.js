import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./read.scss";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';

const NoDataView=()=>{
    return(
        <div className="ui-user-details__noData">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBwabFhnIac4r7lHJVg13Fue60HnmfwBwAYQ&usqp=CAU" alt="No Data"/>
        </div>
    )
}
const Read = () => {
    const [data, setData] = useState([]);

    async function getData() {
        axios
            .get("https://6447ae997bb84f5a3e45ac18.mockapi.io/users")
            .then((res) => {
                setData(res.data);
            },);
    }
    function handleDelete(id) {
        axios
            .delete(
                `https://6447ae997bb84f5a3e45ac18.mockapi.io/users/${id}`
            )
            .then(() => {
                getData();
            });
    }
    const setToLocalStorage = (id, name, email, age, contactNumber, address) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("age", age);
        localStorage.setItem("contactNumber", contactNumber);
        localStorage.setItem("address", address);
    };

    useEffect(() => {
        getData();
    }, []);
    console.log(data.length)
    return (
        <div className="ui-user-details">
            <div className="ui-user-details__heading">
                <div className="ui-user-details__heading__title">User Details</div>
                <Link to="/crud-app">
                    <div className="ui-user-details__heading__action">
                        <AddCircleOutlineRoundedIcon />
                    </div>
                </Link>
            </div>
            <div className="ui-user-details__table">
                <div className="ui-user-details__table__columns">
                    <div className="ui-user-details__table__columns__userId">User ID</div>
                    <div className="ui-user-details__table__columns__name">Name</div>
                    <div className="ui-user-details__table__columns__email">Email</div>
                    <div className="ui-user-details__table__columns__age">Age</div>
                    <div className="ui-user-details__table__columns__contactNumber">Contact Number</div>
                    <div className="ui-user-details__table__columns__address">Address</div>
                    <div className="ui-user-details__table__columns__actions">Actions</div>
                </div>
                <div>{data.length===0 ? <NoDataView/>: <> {data.map((eachData, dataIndex) => {
                    return (
                        <div className="ui-user-details__table__data" key={dataIndex}>
                            <div className="ui-user-details__table__data__userId">{eachData.id}</div>
                            <div className="ui-user-details__table__data__name">{eachData.name}</div>
                            <div className="ui-user-details__table__data__email">{eachData.email}</div>
                            <div className="ui-user-details__table__data__age">{eachData.age}</div>
                            <div className="ui-user-details__table__data__contactNumber">{eachData.contactNumber}</div>
                            <div className="ui-user-details__table__data__address">{eachData.address}</div>
                            <div className="ui-user-details__table__data__actions">
                                <Link to="/update">
                                    <div
                                        className="ui-user-details__table__data__actions__edit"
                                        onClick={() =>
                                            setToLocalStorage(
                                                eachData.id,
                                                eachData.name,
                                                eachData.email,
                                                eachData.age,
                                                eachData.contactNumber,
                                                eachData.address
                                            )
                                        }
                                    >
                                        <EditIcon />
                                    </div>
                                </Link>
                                <div
                                    className="ui-user-details__table__data__actions__delete"
                                    onClick={() => handleDelete(eachData.id)}
                                >
                                    <DeleteOutlineRoundedIcon />
                                </div>
                            </div>
                        </div>
                    );
                })}</>}</div>
            </div>
        </div>
    );
};

export default Read;
