import sheet from './style.css' assert { type: 'css' };

document.adoptedStyleSheets = [sheet]

async function main() {
    document.body.innerHTML = `
    <div class="container">
    <div class="head">
        <div class="title-container">
            <img src="../icon-256.png" class="icon" alt="">
            <span class="title">Oily Monkey</span>
        </div>
        <img class="setting" src="../setting.png" alt="">
    </div>
    </div>
    `

    document.querySelector('.setting').addEventListener('click', async () => {
        await chrome.runtime.openOptionsPage()
        window.close()
    })
}

main().catch((err) => console.error(err))