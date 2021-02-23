import React from "react";
import Paginator from "./Paginator";
import {create} from 'react-test-renderer'

describe('Paginator Component tests', () => {
    test('If pages count is more than portion size - displayed pages must be equal to portion size', () => {
        const component = create(
            <Paginator totalUsersCount={11}
                        pageSize={1}
                        currentPage={1}
                        portionSize={10}/>)
        const root = component.root
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10)
    })

    test('If pages count is more than 10 button Next must be displayed', () => {
        const component = create(
            <Paginator totalUsersCount={11}
                       pageSize={1}
                       currentPage={1}
                       portionSize={10}/>)
        const root = component.root
        let buttons = root.findAllByType('button')
        expect(buttons.length).toBe(1)
        expect(buttons[0].children[0]).toBe('Next')
    })
})