// addArticle

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleBlocks } from '@/enteties/Article/model/types/article';

interface Props {
    title: string,
    subtitle: string,
    img: string,
    views: number,
    type: string[],
    blocks: ArticleBlocks[]
}

const initialState: Props = {
    title: '',
    subtitle: '',
    img: '',
    views: 0,
    type: [],
    blocks: [],
};

const addArticleSlice = createSlice({
    name: 'addArticle',
    initialState,
    reducers: {
        setArticleTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setArticleSubTitle: (state, action: PayloadAction<string>) => {
            state.subtitle = action.payload;
        },
        setArticlePreviewImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        setArticleTypes: (state, action: PayloadAction<string[]>) => {
            state.type = action.payload;
        },
        setArticleBlocks: (state, action: PayloadAction<ArticleBlocks[]>) => {
            state.blocks = action.payload;
        },
    },

});

export default addArticleSlice.reducer;

export const {
    setArticleTitle, setArticleBlocks, setArticlePreviewImg, setArticleSubTitle, setArticleTypes,
} = addArticleSlice.actions;