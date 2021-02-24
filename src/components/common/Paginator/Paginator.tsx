import React, {useState} from "react";
import styled from "styled-components";

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
        <PaginatorWrapper>
            {showPrev && <button onClick={() => {
                onPrevPage()
            }}>Prev</button>}
            {pages.filter(page => (page >= startPage && page <= endPage)).map(page => {
                return <NumberBox key={page}
                                  onClick={() => {onPageChanged(page)}}
                                  isSelected={(currentPage === page)}>
                    {page}
                </NumberBox>
            })}
            {showNext && <button onClick={() => {onNextPage()}}>Next</button>}
        </PaginatorWrapper>
    )
}

export default Paginator

type NumberBoxType = {
    isSelected: boolean
}

const PaginatorWrapper = styled.div`
    border-radius: 5px;
    padding: 5px;
    background-color: #DCEBF1;
    margin-bottom: 20px;
`

const NumberBox = styled.span`
    padding: 0 5px;
    border: solid 1px gray;
    font-size: 13px;
    ${(props: NumberBoxType) => props.isSelected && 
        "font-weight: bold; background-color: lightgray;"
    }       
`