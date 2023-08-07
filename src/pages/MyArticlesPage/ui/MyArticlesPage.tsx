import {useTranslation} from 'react-i18next';
import {ChangeEvent, FC, useCallback, useEffect} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './MyArticlesPage.module.scss';
import {useAppDispatch, useAppSelector} from '@/app/providers/ReduxProvider/config/hooks';
import {userDataSelector} from '@/enteties/User/model/selectors/userDataSelector';
import {
    getMyArticles,
    resetPage,
    setNextPage,
    setPrevPage,
    setSearchQuery
} from '@/pages/MyArticlesPage/model/slice/myArticlesSlice';
import {getAllMyArticles} from '@/pages/MyArticlesPage/model/services/getMyArticles';
import {
    myArticleHaveMoreLoading,
    myArticlePageLoading,
    myArticlePageSelector,
    myArticlesQuerySelector
} from '@/pages/MyArticlesPage/model/selectors/myArticlesSelectors';
import {Loader} from '@/shared/ui/Loader';
import Stack, {StackPosition} from '@/shared/ui/Stack/ui/Stack';
import MyArticleButtons from '@/pages/MyArticlesPage/ui/MyArticleButtons/MyArticleButtons';
import UserHasntArticles from '@/pages/MyArticlesPage/ui/UserHasntArticles/UserHasntArticles';
import {Input, ThemeInput} from "@/shared/ui/Input";
import {useDebounce} from "@/shared/lib/useDebounce/useDebounce";
import {Button} from "@/shared/ui/Button";

interface Props {
}

const MyArticlesPage: FC<Props> = () => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const user = useAppSelector(userDataSelector);
    const articles = useAppSelector(getMyArticles.selectAll);
    const query = useAppSelector(myArticlesQuerySelector)
    const page = useAppSelector(myArticlePageSelector)
    const haveMore = useAppSelector(myArticleHaveMoreLoading)
    const isLoading = useAppSelector(myArticlePageLoading);


    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        dispatch(getAllMyArticles(user.id));
    }, [dispatch, user, page]);

    useEffect(() => {
        dispatch(getAllMyArticles(user.id));
        dispatch(resetPage())
    }, [dispatch, debouncedQuery])


    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.currentTarget.value))
    }, [dispatch])

    const setNextPageHandler = () => {
        dispatch(setNextPage())
    }
    const setPrevPageHandler = () => {
        dispatch(setPrevPage())
    }

    if (isLoading) {
        return (
            <Stack>
                <Input theme={ThemeInput.OUTLINE} onChange={searchHandler} placeholder={'Search...'} value={query}/>
                <Stack childrenPosition={StackPosition.CENTER}>
                    <Loader/>
                </Stack>

            </Stack>

        );
    }


    return (
        <div className={classNames(cls.MyArticlesPage, {}, [])}>
            <Input theme={ThemeInput.OUTLINE} onChange={searchHandler} placeholder={'Search...'} value={query}/>
            {articles.length === 0 ? (
                <>
                    <UserHasntArticles/>
                </>
            ) : (
                <div>
                    <div>
                        {articles.map((article) => (
                            <div key={article.id} className={cls.articleWrapper}>
                                <div>
                                    {article.title}
                                </div>
                                <MyArticleButtons user={user} articleId={article.id}
                                                  className={cls.articleButtonsWrapper}/>
                            </div>
                        ))}
                    </div>
                    <Stack childrenPosition={StackPosition.RIGHT}>
                        <Button disabled={page <= 1} onClick={setPrevPageHandler}>{'<'}</Button>
                        <Button disabled={!haveMore} onClick={setNextPageHandler}>{'>'}</Button>
                    </Stack>

                </div>
            )}

        </div>
    );
};
export default MyArticlesPage;