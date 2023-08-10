import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/constants/localStorage';

export const getArticleById = createAsyncThunk('article/getArticleById', async (id: string, thunkAPI) => {
    try {
        const res = await axios.get(`https://production-project-server-psi-ivory.vercel.app/articles?id=${id}`, {
            headers: {
                authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
            },
        });

        return res.data[0];
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
