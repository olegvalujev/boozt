import React, {useState} from "react";
import styled from "styled-components";
import {SortingType} from "../../../redux/product-reducer";


const Paginator: React.FC<PropsType> = React.memo((props) => {
    const {totalProductsCount, pageSize, onPageChanged, currentPage, portionSize = 10} = props
    const currentPaginationPage = Math.ceil(currentPage/pageSize)
    let [paginationPage, setPaginationPage] = useState(currentPaginationPage || 1)

    let pagesCount = Math.ceil(totalProductsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let startPage = (portionSize * paginationPage) - portionSize + 1
    let endPage = startPage + portionSize - 1
    let showPrev = startPage > portionSize;
    let showNext = pagesCount > paginationPage;

    const onPrevPage = () => {
        setPaginationPage(paginationPage - 1)
    }

    const onNextPage = () => {
        setPaginationPage(paginationPage + 1)
    }

    const toggleSortingOrder = () => {
        if (props.sortOrder === 'ASC'){
            props.onSortOrderChanged('DESC')
        }else{
            props.onSortOrderChanged('ASC')
        }
    }

    return (
        <PaginatorWrapper>
            {showPrev && <Button primary onClick={() => {
                onPrevPage()
            }}>Prev</Button>}
            {pages.filter(page => (page >= startPage && page <= endPage)).map(page => {
                return <NumberBox key={page}
                                  onClick={() => {onPageChanged(page)}}
                                  isSelected={(currentPage === page)}>
                    {page}
                </NumberBox>
            })}
            {showNext && <Button primary onClick={() => {onNextPage()}}>Next</Button>}
            <Button onClick={()=>(toggleSortingOrder())}>Sort order: {props.sortOrder}</Button>
        </PaginatorWrapper>
    )
})

export default Paginator

type PropsType = {
    totalProductsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    portionSize?: number
    onSortOrderChanged: (sort: SortingType) => void
    sortOrder: SortingType
}

type NumberBoxType = {
    isSelected: boolean
}

type ButtonType = {
    primary?: boolean
}

const PaginatorWrapper = styled.div`
    border-radius: 5px;
    padding: 5px;
    background-color: #DCEBF1;
    margin-bottom: 20px;
    text-align: center;
`

const NumberBox = styled.span`
    padding: 0 5px;
    font-size: 13px;
    &:hover {
        cursor: pointer;
        background-color: lightgray;
        border-radius: 5px;
    }
    ${(props: NumberBoxType) => props.isSelected && 
        "font-weight: bold; " +
        "background-color: lightgray;" +
        "border-radius: 5px;"
    }       
`

const Button = styled.button`
  background: ${(props: ButtonType) => !!props.primary ? "palevioletred" : "white"};
  color: ${(props: ButtonType) => !!props.primary ? "white" : "palevioletred"};
    
  &:hover {
     background: ${(props: ButtonType) => !!props.primary ? "#af5a76" : "#faecf1"};
     color: ${(props: ButtonType) => !!props.primary ? "#faecf1" : "#af5a76"};
     cursor: pointer;
  }
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`