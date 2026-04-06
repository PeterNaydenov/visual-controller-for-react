import { describe, it, expect, beforeEach } from 'vitest'
import { act } from 'react'
import VisualController from "../src/main.js";
import Test from '../components/Test.jsx'
import Layout from '../components/Layout.jsx'
import NoUpdates from '../components/NoUpdates.jsx'
import serverRender from './serverRender'
import fs from 'fs'
import path from 'path'

beforeEach(() => {
  const html = fs.readFileSync(path.join(__dirname, 'fixtures', 'index.html'), 'utf-8')
  document.body.innerHTML = html
})

describe ( 'Visual controller for react', () => {

    it ( 'Method "publish" returns a promise', async () => {
        const r = { value: 0 }
        const root = document.querySelector('#root')
        const html = new VisualController({ r })
        root.id = 'el'

        const el = await html.publish(Test, {}, 'el')
        
        await act(async () => {
            el.setupText('update')
        })
        
        expect(document.getElementById('ins').textContent).toBe('update')
    })


    it ( 'Method "has"', async () => {
        const r = { value: 0 }
        const root = document.querySelector('#root')
        const html = new VisualController({ r })
        root.id = 'el'

        await html.publish(Layout, {}, 'el')

        const before = html.has('a')
        
        await Promise.all([
            html.publish(Test, {}, 'a'),
            html.publish(Test, {}, 'b')
        ])
        
        const after = html.has('a')
        
        expect(before).toBe(false)
        expect(after).toBe(true)
    })


    it ( 'No update methods', async () => {
        const r = { value: 0 }
        const root = document.querySelector('#root')
        const html = new VisualController({ r })
        root.id = 'el'

        await html.publish(NoUpdates, {}, 'el')
        
        const x = html.getApp('el')
        
        expect(Object.keys(x).length).toBe(0)
        html.destroy('el')
    })

    it ( 'Hydrate, SSR support', async () => {
        const r = { value: 0 }
        const root = document.querySelector('#root')
        const html = new VisualController({ r })
        root.id = 'el'

        const dependencies = { r }
        const data = {}
        const setupUpdates = () => {}
        
        const content = serverRender(Test, { dependencies, data, setupUpdates })
        
        const el = document.getElementById('el') || document.createElement('div')
        el.id = 'el'
        el.innerHTML = content
        
        const published = await html.publish(Test, {}, 'el')
        
        await new Promise(resolve => setTimeout(resolve, 10))
        
        expect(published).toHaveProperty('setupText')
        
        const newTitle = 'Updated title'
        
        await act(async () => {
            published.setupText(newTitle)
        })
        
        const title = document.getElementById('ins').innerHTML
        expect(title).toBe(newTitle)
        
        let text = document.getElementById('count').innerHTML
        expect(text).toBe('Count: <!-- -->0')
        
        document.getElementById('ins').click()
        
        await new Promise(resolve => setTimeout(resolve, 100))
        
        text = document.getElementById('count').innerHTML
        expect(text).toBe('Count: <!-- -->12')
    })

})
