import React, { useEffect, useState } from 'react';
import { imageDb } from "../Config";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";

const Images = () => {
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);
    const [loading, setLoading] = useState(false); // Add a loading state
    let id=localStorage.getItem('token')
    // console.log(id)

    const handleClick = () => {
        let imgRef = ref(imageDb, `files/${v4()}`)
      console.log(imgRef)
        uploadBytes(imgRef, img).then(() => {
            // After uploading, refresh the image list
            fetchImages();
           
        
        });
    }
   

    const fetchImages = async () => {
        setLoading(true); // Set loading to true
        
        const imgRef = ref(imageDb, "files");
        const imgs = await listAll(imgRef);
        const urls = await Promise.all(imgs.items.map(val => getDownloadURL(val)));
    
        setImgUrl(urls);
        setLoading(false); // Set loading to false
    }

    useEffect(() => {
        fetchImages(); // Call fetchImages only once on mount
    }, []);
   
    return (
        <div>
            <input type='file' onChange={(e) => setImg(e.target.files[0])} />
            <button onClick={handleClick}>Upload</button>
            <br />
            <br />
            {loading ? (
                <p>Loading...</p>
            ) : (
                
                imgUrl.map((dataUrl, index) => (
                    <div key={index} >
                        <img src={dataUrl} alt={`Uploaded ${index}`} height="20px" />
                        
                    </div>
                ))
            )}
        </div>
    )
}

export default Images;