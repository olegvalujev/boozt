import React from 'react'
import ProductList from './components/ProductList/ProductList'
import styled from 'styled-components'

const AppWrapper = styled.div`
    background-color: blue;
`

function App() {
  return (
    <AppWrapper>
      <ProductList/>
    </AppWrapper>
  )
}

export default App;
