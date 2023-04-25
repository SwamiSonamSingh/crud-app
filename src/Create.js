import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Create.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Create() {

    // initializing some hooks for setting states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAdress] = useState("");
    const history = useNavigate();
    const [userNameError, setUserNameError] = useState(false)
    const [emailError,setEmailError]=useState(false)
    const [disable, setDisable] = useState(false)
    const [phoneNumberError, setPhoneNumberError]= useState(false)
    const [addressError,setAddressError]=useState(false)
    const header = { "Access-Control-Allow-Origin": "*" };
    var validEmail = /^[a-zA-z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/;

    //validation for name field
    useEffect(() => {
        if (name.length > 0 && name.length <= 3)
            setUserNameError('At least 3 characters required')
        else
            setUserNameError(false)
    }, [name, setName])

    //validation for submit button
    useEffect(() => {
        if (userNameError || emailError || phoneNumberError || addressError)
            setDisable(true)
        else if(name.length===0 || email.length===0 || age.length===0 || address.length===0 || contactNumber.length===0){
            setDisable(true)
        }
        else
            setDisable(false)
    })

    //validation for email field
    useEffect(() => {
        if (email.length === 0) {
            setEmailError('');
        }
        else if (email.length <= 4)
            setEmailError('Too short to be an email')
        else if (!email.includes('@')) {
            setEmailError('Email must contain "@"')
        }
        else if (email.endsWith('@') || email.startsWith('@') || !email.match(validEmail))
            setEmailError('Invalid format')
        else
            setEmailError(false)
    }, [email, setEmail])

    // validation for contact field
    useEffect(()=>{
        if(contactNumber.length>0 && contactNumber.length<=9){
            setPhoneNumberError('Contact number should contain 10 characters')
        }
        else if(contactNumber.length>10){
            setPhoneNumberError('Contact number should less than 10 characters')
        }
        else if(contactNumber.length==10){
            setPhoneNumberError(false)
        }
    }, [contactNumber,setContactNumber])

    //validation for address field
    useEffect(()=>{
        if(address.length>0 && address.length<=10){
            setAddressError('Please enter correct address')
        }
        else
        setAddressError(false)
    }, [address,setAdress])

    //handling submit form data
    const handleSubmit = (e) => {
        // e.preventDefault();
        axios
            .post(
                "https://6447ae997bb84f5a3e45ac18.mockapi.io/users",
                {
                    name: name,
                    age: age,
                    email: email,
                    contactNumber: contactNumber,
                    address: address,
                    header,
                }
            )
            .then(() => {
                history("/details");
            });
    }

    //rendering the view
    return (
        <div className="ui-add-users">
            <div className="ui-add-users__head">
                <div className="ui-add-users__head__title">Add User Details</div>
                <Link to="/details">
                    <div className="ui-add-users__head__icon">
                        <VisibilityIcon />
                    </div>
                </Link>
            </div>
            <div className="ui-add-users__form">
                <div className="ui-add-users__form__name">
                    <label className="ui-add-users__form__name__label">Name<span className="required">*</span> </label>
                    <input
                        className="ui-add-users__form__name__field"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span>{userNameError}</span>
                </div>
                <div className="ui-add-users__form__email">
                    <label className="ui-add-users__form__email__label">Email Address <span className="required">*</span></label>
                    <input
                        className="ui-add-users__form__email__field"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>{emailError}</span>
                </div>
                <div className="ui-add-users__form__age">
                    <label className="ui-add-users__form__age__label">Age </label>
                    <input
                        className="ui-add-users__form__age__field"
                        type="number"
                        placeholder="Age"
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="ui-add-users__form__contact">
                    <label className="ui-add-users__form__contact__label">Contact Number<span className="required">*</span> </label>
                    <input
                        className="ui-add-users__form__contact__field"
                        type="number"
                        placeholder="Contact number"
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                    <span>{phoneNumberError}</span>
                </div>
                <div className="ui-add-users__form__address">
                    <label className="ui-add-users__form__address__label">Address <span className="required">*</span></label>
                    <input
                        className="ui-add-users__form__address__field"
                        type="text"
                        placeholder="Address"
                        onChange={(e) => setAdress(e.target.value)}
                    />
                    <span>{addressError}</span>
                </div>
            </div>
            <div className={`ui-add-users__action__${disable}`} onClick={()=>{
                !disable&&handleSubmit()
            }}>
                Submit
            </div>
        </div>
    );
}

export default Create;
