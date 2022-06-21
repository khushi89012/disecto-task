
import React,{useState,useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {AddItem} from '../Redux/action'

export default function Form() {

    const dispatch = useDispatch();
    const data = useSelector(state=>state)

    const [form, setForm] = React.useState({
        name : "",
        description : "",
        images : ""
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
        if(form.name && form.description && images) {
            setError(null);
            setSuccess("Collection created successfully");
            dispatch(AddItem(form))

        }
        else{
            setError("Please fill all the fields");
        }
        // console.log(form)
    }
    console.log(data)
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
                <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={form.description} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Images</label>
                <input type="url" className="form-control" name="images" onChange={handleChange} value={form.images}/>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={() => {
                    if(form.name && form.description && images.length > 0){
                        setSuccess("Collection created successfully");
                        setForm({
                            name : "",
                            description : "",
                            images : []
                        });
                        setImages([]);
                        setImage(null);
                    }
                    else{
                        setError("Please fill all the fields");
                    }
                }}>Create Collection</button>
            </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
    </div>
    );
}
