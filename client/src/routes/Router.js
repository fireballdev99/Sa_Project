import React from 'react'
import { Switch } from 'react-router'
import { NavLink } from 'react-router-dom'
import ProductList from '../ProductList'
import Report from '../Report'
import SalePage from '../SalePage'
import Menuroutes from './Menuroutes'

const Router = () => {
    return (
        <>

            <Switch>
                <Menuroutes exact path="/">
                    <SalePage />
                </Menuroutes>
                <Menuroutes path="/productlist">
                    <ProductList />
                </Menuroutes>
                <Menuroutes path="/report">
                    <Report />
                </Menuroutes>

            </Switch>
        </>

    )
}

export default Router