'use client'

import { useState } from "react";

export default function EditorCard({ handleSubmit, handleImageChange, closeEditor, loading, profilePic }) {
    const [imagePreview, setImagePreview] = useState(profilePic);

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        handleImageChange(event)
    };

    return (
        <div className='absolute z-40 flex flex-col w-full items-center p-10'>
            <div className="w-60 h-60 bg-primary2 rounded-[100px]">
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-[100px]" />
                ) : (
                    <img src="placeholder-image.png" alt="img" className="w-full h-full object-cover rounded-[100px]" />
                )}
            </div>
            <div>
                <input type='file' name='profilePic' id='profilePic' onChange={handleChange} className="max-w-[200px] mt-10" />
                <div className="flex justify-center gap-20 mt-24">
                    <button onClick={handleSubmit}>
                        <img src="tick.svg" className="invert w-16" />
                    </button>
                    <div>
                        <button onClick={closeEditor}>
                            <img src="/close.svg" className="invert w-16" />
                        </button>
                    </div>
                </div>
            </div>

            {
                loading && 
                <div className="fixed h-screen w-screen bg-black opacity-80 text-center flex justify-center items-center">
                    Loading...
                </div>
            }
        </div>
    );
}
