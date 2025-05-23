const blockedUsers = [];

let currentBrowser;

if (typeof browser === "undefined") {
    currentBrowser = chrome;
}
else {
    currentBrowser = browser;
}

async function getStoredData() {
    let storedData = await currentBrowser.storage.local.get("blockedUsers");
    let blockedUsersString = storedData["blockedUsers"].trim();
    console.log(blockedUsersString);
    if (blockedUsersString.length == 0) {
        return;
    }
    let split = storedData["blockedUsers"].split(',');
    for (let s of split) {
        if (s.trim().length == 0) {
            continue;
        }
        blockedUsers.push(s);
    }
    console.log(blockedUsers);
}

function handleBlock() {
    const listings = document.getElementsByClassName("listing");
    for (let listing of listings) {
        let seller = listing.getElementsByClassName("seller")[0];
        for (let user of blockedUsers) {
            if (seller.innerHTML.includes(user)) {
                listing.style.display = "none";
            }
        }
    }
}

getStoredData().catch(console.error);
document.onmousewheel = handleBlock;
document.onscroll = handleBlock;