import React from "react";
import { useSelector } from "react-redux";
import { getTags, getTagsLoadingStatus } from "../../../store/tags";
import style from "./tags.module.css";
const Tags = () => {
    const tagsList = useSelector(getTags());
    const isLoading = useSelector(getTagsLoadingStatus());
    console.log("tagsList", tagsList, isLoading);
    return (
        <ul className={style.tags__list}>
            {!isLoading && tagsList.map((tag) => (
                <li key={ tag._id } className={style.tag__item} role="button">
                    <div className={style.tag__img}>
                        <img src={tag.img} alt="Tags" className={style.tag__pic}/>
                    </div>
                    <div>{ tag.name }
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Tags;
