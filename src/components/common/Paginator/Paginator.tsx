import styles from "./Paginator.module.css";
import React, {useState} from "react";

type PropsType = {
    totalProductsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalProductsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    let [paginationPage, setPaginationPage] = useState(1)

    let pagesCount = Math.ceil(totalProductsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let startPage = (portionSize * paginationPage) - portionSize + 1
    let endPage = startPage + portionSize - 1
    let showPrev = startPage > portionSize;
    let showNext = pagesCount > endPage;

    const onPrevPage = () => {
        setPaginationPage(paginationPage - 1)
    }

    const onNextPage = () => {
        setPaginationPage(paginationPage + 1)
    }

    return (
        <div className={styles.paginatorWrapper}>
            {showPrev && <button onClick={() => {
                onPrevPage()
            }}>Prev</button>}
            {
                pages.filter(page => (page >= startPage && page <= endPage)).map(page => {
                    return <span key={page}
                                 onClick={() => {
                                     onPageChanged(page)
                                 }}
                                 className={styles.numberBox + ' ' + (currentPage === page ? styles.selectedPage : undefined)}>

                        {page}
                    </span>
                })
            }
            {showNext && <button onClick={() => {
                onNextPage()
            }}>Next</button>}
        </div>
    )
}

export default Paginator