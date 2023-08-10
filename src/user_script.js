async function main() {
    await chrome.runtime.sendMessage({})
}

main().catch((err) => {
    console.error(err)
})

