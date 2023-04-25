import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./update.scss";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Update = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
        setAge(localStorage.getItem("age"));
        setContactNumber(localStorage.getItem("contactNumber"));
        setAddress(localStorage.getItem("address"));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Id...", id);
        axios
            .put(
                `https://6447ae997bb84f5a3e45ac18.mockapi.io/users/${id}`,
                {
                    name: name,
                    age: age,
                    email: email,
                    contactNumber: contactNumber,
                    address: address,
                }
            )
            .then(() => {
                navigate("/details");
            });
    };

    return (
        <div className="ui-update-user-data">
            <div className="ui-update-user-data__title">Update User Data</div>
            <div className="ui-update-user-data__form">
                <div className="ui-update-user-data__form__name">
                    <label className="ui-update-user-data__form__name__label">
                        Name:{" "}
                    </label>
                    <input
                        className="ui-update-user-data__form__name__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="ui-update-user-data__form__email">
                    <label className="ui-update-user-data__form__email__label">
                        Email Address:{" "}
                    </label>
                    <input
                        className="ui-update-user-data__form__email__input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="ui-update-user-data__form__age">
                    <label className="ui-update-user-data__form__age__label">Age: </label>
                    <input
                        className="ui-update-user-data__form__age__input"
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="ui-update-user-data__form__contactNumber">
                    <label className="ui-update-user-data__form__contactNumber__label">
                        Contact number:{" "}
                    </label>
                    <input
                        className="ui-update-user-data__form__contactNumber__input"
                        type="number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>
                <div className="ui-update-user-data__form__address">
                    <label className="ui-update-user-data__form__address__label">
                        Address:{" "}
                    </label>
                    <input
                        className="ui-update-user-data__form__address__input"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value, '')}
                    />
                </div>
            </div>
            <div className="ui-update-user-data__actions">
                <div className="ui-update-user-data__actions__update">
                    <Link to="/details" onClick={handleUpdate}><SaveAltIcon/></Link>
                </div>
                <div className="ui-update-user-data__actions__back">
                    <Link to="/details"><KeyboardBackspaceIcon/></Link>
                </div>
            </div>
        </div>
    );
};

export default Update;
