import React, {Component} from 'react'
import ProductList from './components/ProductList/ProductList'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import store, {AppStateType} from './redux/redux-store'
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
    catchUnhandledErrors(event: PromiseRejectionEvent) {
        alert(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchUnhandledErrors.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchUnhandledErrors.bind(this))
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            <AppWrapper>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path="/" render={ProductList}/>
                        <Route path="*">
                            <div>404 NOT FOUND</div>
                        </Route>
                    </Switch>
                </div>
            </AppWrapper>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}),
)(App)

const RootContainer: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default RootContainer;

const AppWrapper = styled.div`
    background-color: blue;
`