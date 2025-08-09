const activate_button = document.querySelector("button#activate-button")
const send_activation_signal = activate_button.addEventListener('click',()=>{
    activate_button.disabled = true
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{action:"runExtension"})
    })
})