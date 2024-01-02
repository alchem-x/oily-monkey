export function loadJs(url, module = false) {
    return new Promise((resolve, reject) => {
        const scriptRef = document.createElement('script')
        scriptRef.src = url
        if (module) {
            scriptRef.type = 'module'
        }
        scriptRef.addEventListener('load', (ev) => {
            resolve(ev)
        })
        scriptRef.addEventListener('error', (err) => {
            reject(err)
        })
        document.body.appendChild(scriptRef)
    })
}

export function loadCss(url) {
    return new Promise((resolve, reject) => {
        const linkRef = document.createElement('link')
        linkRef.rel = 'stylesheet'
        linkRef.href = url
        linkRef.addEventListener('load', (ev) => {
            resolve(ev)
        })
        linkRef.addEventListener('error', (err) => {
            reject(err)
        })
        document.head.appendChild(linkRef)
    })
}