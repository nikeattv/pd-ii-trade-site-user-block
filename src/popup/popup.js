const inputField = document.getElementById("inputField");
const submitButton = document.getElementById("submitButton");

let currentBrowser;

if (typeof browser === "undefined") {
    currentBrowser = chrome;
}
else {
    currentBrowser = browser;
}

async function getStoredData() {
    let storedData = await currentBrowser.storage.local.get("blockedUsers");
    let storedUsers = storedData["blockedUsers"];
    inputField.value = storedUsers === undefined ? "" : storedUsers;
}

getStoredData().catch(console.error);

submitButton.onclick = () => {
    console.log(inputField.value);
    currentBrowser.storage.local.set({ "blockedUsers": inputField.value }).then(() => {
        console.log("Value is set.")
    });
}