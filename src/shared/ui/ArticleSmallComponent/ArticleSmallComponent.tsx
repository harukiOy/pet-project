import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames';
import { Article } from '@/enteties/Article/model/types/article';
import { Views } from '@/shared/ui/Views';
import { getArticleRoute } from '@/shared/config/routeConfig/routeConfig';
import cls from './ArticleSmallComponent.module.scss';
import { AppLink } from '@/shared/ui/AppLink';
import Image from '@/shared/ui/Image/Image';

interface Props {
    article: Article
}

const ArticleSmallComponent: FC<Props> = ({ article }) => {
    const { t } = useTranslation();

    return (
        <AppLink to={getArticleRoute(article.id)} className={classNames(cls.ArticleSmallComponent, {}, [])}>
            <div className={cls.ArticleSmallComponentHeader}>
                <Image src={article?.img} height={150} />
                <p className={cls.createdAt}>{article?.createdAt}</p>
            </div>
            <div className={cls.ArticleSmallComponentFooter}>
                <div className={cls.articleInfo}>
                    <p className={cls.articleType}>{article?.type?.slice(0, 2).join(' ')}</p>
                    <Views views={article?.views} />
                </div>
                <div>
                    <p className={cls.articleTitle}>{article?.title}</p>
                </div>
            </div>
        </AppLink>
    );
};

export default ArticleSmallComponent;
