import React, { useEffect, useState } from "react";
import "./Loader.css";
import axios from "axios";

const Loader = () => {
    const [meme, setMeme] = useState("");

    useEffect(() => {
        generateMeme();
    }, []);

    const generateMeme = async () => {
        try {
            const response = await axios.get(
                "https://api.imgflip.com/get_memes"
            );

            const memes = response.data.data.memes;
            const randomIndex = Math.floor(Math.random() * memes.length);
            const memeURL = memes[randomIndex].url;

            setMeme(memeURL);
        } catch (error) {
            console.log("Error fetching memes:", error);
        }
    };

    return (
        <div className="loading">
            <div>
                {meme ? (
                    <img src={meme} alt="Meme" className="meme-image" />
                ) : (
                    <div className="loader"></div>
                )}
            </div>
        </div>
    );
};

export default Loader;
