const video_controls = document.querySelector('.video-loop-controls')
const id = document.querySelector('.video-data > ul > #id')
const title = document.querySelector('.video-data > ul > #title')



const activate_button = document.querySelector("button#activate-button")
const send_activation_signal = activate_button.addEventListener('click',()=>{
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{action:"runExtension"},(response)=>{
            if(response && response.id && response.title)
            {
                video_controls.hidden = false;
                id.textContent = `ID: ${response.id}`
                title.textContent = `Title : ${response.title}`.replace('- Youtube', '')
            }
        })
    })
})

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.popup === 'activated') {
        video_controls.hidden = false;
        id.textContent = `ID: ${response.id}`
        title.textContent = `Title : ${response.title}`.replace('- Youtube', '')
    }
  });
});