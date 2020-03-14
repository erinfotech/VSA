import React, {useState, useEffect} from 'react';
import axios from '../../../../axios/axios'
import {withRouter, useParams, Link} from 'react-router-dom';

const EditVideo = (props) => {
    const [video, setVideo] = useState({});
    const {id} = useParams();

    useEffect(() => {
        debugger;
        axios.get("/api/video/" + id).then((data) => {
            setVideo(data.data);
        });
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.history.push('/admin');
        props.onSubmit(
            {
                "videoID": id,
                "name": e.target.name.value,
                "description": e.target.description.value,
                "imgLink": e.target.imgLink.value,
            },
        );
    };

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setVideo({paramName: paramValue});
    };

    return (
        <div className="container border-warning" style={{border: "1px solid black", padding: "1em"}}>
            <div className="form-group">
                <div className="col-md-1"/>
                <form onSubmit={onFormSubmit}>
                    <h4 className="text-upper text-left text-danger">Edit Video</h4>
                    <div className="form-group row">
                        <label htmlFor="video" className="col-sm-4 offset-sm-1 text-left text-dark">Name</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={handleTermOnChange} value={video.name}
                                   className="form-control" id="video" name={"name"}
                                   placeholder="Video name" required maxLength="50"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="video" className="col-sm-4 offset-sm-1 text-left text-dark">Description</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={handleTermOnChange} value={video.description}
                                   className="form-control" id="video" name={"description"}
                                   placeholder="Video description" required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="video" className="col-sm-4 offset-sm-1 text-left text-dark">Image Link</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={handleTermOnChange} value={video.imgLink}
                                   className="form-control" id="video" name={"imgLink"}
                                   placeholder="Image link" required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div
                            className="offset-sm-1 col-sm-1  text-center">
                        </div>
                        <div
                            className="offset-sm-1 col-sm-1  text-center">
                        </div>
                        <div
                            className="offset-sm-1 col-sm-1  text-center">
                            <button type="submit"
                                    className="btn btn-primary text-upper">
                                Save
                            </button>
                        </div>
                        <div
                            className="offset-sm-1 col-sm-1  text-center">
                            <button
                                type="reset"
                                className="btn btn-warning text-upper">
                                Reset
                            </button>
                        </div>
                        <div
                            className="offset-sm-1 col-sm-1  text-center">
                            <Link to={"/admin"}
                                  className="btn btn-danger text-upper">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
                <div className="col-md-1"/>
            </div>
        </div>
    )
};

export default withRouter(EditVideo);