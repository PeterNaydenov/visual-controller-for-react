import VisualController from '/src/main.js'
import Header from '/demo/Header.jsx'
import Sidebar from '/demo/Sidebar.jsx'

const
      html = new VisualController({})
    , main = document.getElementById('main')
    , updateHeaderBtn = document.getElementById('updateHeader')
    , incrementBtn = document.getElementById('incrementHeader')
    , swapBtn = document.getElementById('swapApps')
    , destroyHeaderBtn = document.getElementById('destroyHeader')
    , destroySidebarBtn = document.getElementById('destroySidebar')
    , resetBtn = document.getElementById('resetAll')
    , resultText = document.getElementById('resultText')
    , aliasesList = document.getElementById('aliasesList')
    ;

function refreshAliases() {
    aliasesList.textContent = html.list().join(', ') || '-'
}

html.set(({ start, end }) => {
    main.append(start, end)
    return 'header'
})

html.set(({ start, end }) => {
    main.append(start, end)
    return 'sidebar'
})

refreshAliases()

html.publish('header', Header).then(() => {
    resultText.textContent = 'Header published'
    refreshAliases()
})

html.publish('sidebar', Sidebar).then(() => {
    console.log('Sidebar published')
    refreshAliases()
})

updateHeaderBtn.addEventListener('click', () => {
    const app = html.getApp('header')
    if (app) app.changeMessage(`Header updated at ${new Date().toLocaleTimeString()}`)
})

incrementBtn.addEventListener('click', () => {
    const app = html.getApp('header')
    if (app) app.increment()
})

let swapped = false
swapBtn.addEventListener('click', () => {
    swapped = !swapped
    const [headerApp, sidebarApp] = swapped
        ? [Sidebar, Header]
        : [Header, Sidebar]
    html.publish('header', headerApp)
    html.publish('sidebar', sidebarApp)
    resultText.textContent = swapped
        ? 'Swapped: header and sidebar exchanged apps'
        : 'Restored: header and sidebar back to initial apps'
})

destroyHeaderBtn.addEventListener('click', () => {
    const ok = html.destroy('header')
    resultText.textContent = 'Destroy header: ' + ok
    refreshAliases()
})

destroySidebarBtn.addEventListener('click', () => {
    const ok = html.destroy('sidebar')
    resultText.textContent = 'Destroy sidebar: ' + ok
    refreshAliases()
})

resetBtn.addEventListener('click', () => {
    html.reset()
    resultText.textContent = 'Reset all'
    refreshAliases()
})
