import React, {useEffect, useRef} from 'react';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import PizzaBlockSkeleton from "../../components/PizzaBlockSkeleton/PizzaBlockSkeleton";
import PizzaBlock from "../../components/PizzaBlock/PizzaBlock";
import Pagination from "../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {filterSelector, setCurrentPage, setFilters} from "../../redux/features/filterSlice";
import {fetchPizzaList, pizzaSelector} from "../../redux/features/pizzaSlice";
import qs from "qs"
import {list} from "../../components/Sort/Sort";
import cartEmptyImg from "../../assets/img/empty-cart.png";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const {categoryId, sort, currentPage, searchValue} = useSelector(filterSelector)
    const {items, status} = useSelector(pizzaSelector)
    const dispatch = useDispatch()
    const isMounted = useRef(false);
    const isSearch = useRef(false);
    const navigate = useNavigate()

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const fetchPizzas = async () => {
        const listSort = sort.sortProp.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProp.replace('-', '')
        const categorySort = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        dispatch(fetchPizzaList({sortBy, categorySort, listSort, search, currentPage}))
    }

    useEffect(() => {
        if (window.location.search &&
            window.location.search !==
            "?sortProp=rating&categoryId=0&currentPage=1"
        ) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProp === params.sortProp);
            dispatch(
                setFilters({
                    ...params,
                    sort
                }),
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            const queryStr = qs.stringify({
                sortProp: sort.sortProp,
                categoryId: categoryId,
                currentPage: currentPage,
            })
            navigate(`?${queryStr}`)
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProp, currentPage]);

    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas()
        }
        window.scrollTo(0, 0);
        isSearch.current = false
    }, [categoryId, sort.sortProp, searchValue, currentPage]);


    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === "error" ? (
                    <div className={"content__error-info"}>
                        <h2>
                            Произошла ошибка <span>😕</span>
                        </h2>
                        <p>
                            Вероятней всего, неудалось получить список товаров.
                            <br/>
                            Пожалуйста попробуйте позже.
                        </p>
                        <img src={cartEmptyImg} alt="Empty cart"/>
                    </div>) : (
                    <>
                        <div className="content__items">
                            {
                                status === "loading" ? [...new Array(12)].map((_, index) => <PizzaBlockSkeleton
                                    key={index}/>) : items.map((pizza) => (
                                    <PizzaBlock id={pizza.id} key={pizza.id} name={pizza.title} price={pizza.price}
                                                imageUrl={pizza.imageUrl}
                                                size={pizza.sizes} types={pizza.types}/>
                                ))
                            }
                        </div>
                        <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
                    </>
                )
            }

        </>
    );
};

export default Main;
