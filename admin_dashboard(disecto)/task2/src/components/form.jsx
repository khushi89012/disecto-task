
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import {AddItem} from '../Redux/action'

export default function Form() {

    const dispatch = useDispatch();
    const data = useSelector(state=>state)

    const [form, setForm] = React.useState({
        title : "",
        description : "",
        image : ""
    });
    const [images, setImages] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.title && form.description && form.image) {
            axios.post('https://login-signup-prod.herokuapp.com/products',{
                title : form.title,
                description : form.description,
                image : form.image
            })
            .then(res=>{
                console.log(res)
                dispatch(AddItem(res.data))
                setForm({
                    name : "",
                    description : "",
                    images : ""
                })
                setImages("")
                setImage(null)
                setSuccess("Product Added Successfully")
            }
            )
            .catch(err=>{
                setError(err.response.data.error)
            }
            )
        }
        else {
            setError("Please fill all the fields")
        }
    }

  return (
    <div className="container"
    style={{ 
        // display: "flex",
        width: "50%",

    }}
    >
        <h1>Create Collection</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={form.description} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Images</label>
                <input type="url" className="form-control" name="image" onChange={handleChange} value={form.image}/>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Create collection"/>
            </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
    </div>
    );
}
