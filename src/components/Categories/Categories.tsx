import React, {useState} from 'react';
import {categorySelector, setCategoryId} from "../../redux/features/filterSlice";
import {useDispatch, useSelector} from "react-redux";

function Categories() {
    const dispatch = useDispatch()
    const categoryId = useSelector(categorySelector)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((name, index) => (
                    <li key={index} onClick={() => dispatch(setCategoryId(index))}
                        className={categoryId === index ? 'active' : ''}>{name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;