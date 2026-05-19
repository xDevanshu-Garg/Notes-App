import axios from "axios";

import { getUserInfo } from "../utils/auth";

const API_URL = `${import.meta.env.VITE_API_URL}/notes`;


// Get token from localStorage
const getToken = () => {

    const userInfo = getUserInfo();

    return userInfo?.token;
};


// Config with headers
const getConfig = () => {

    return {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    };

};


// GET NOTES
export const getNotes = async () => {

    const response = await axios.get(
        API_URL,
        getConfig()
    );

    return response.data;
};


// CREATE NOTE
export const createNote = async (noteData) => {

    const response = await axios.post(
        API_URL,
        noteData,
        getConfig()
    );

    return response.data;
};


// DELETE NOTE
export const deleteNote = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`,
        getConfig()
    );

    return response.data;
};

// UPDATE NOTE
export const updateNote = async (id, noteData) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        noteData,
        getConfig()
    );

    return response.data;
};