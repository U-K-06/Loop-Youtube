
function take_input()
{
    const save_button = document.getElementById('save-button')
}





const activate_button = document.querySelector("button#activate-button")
const send_activation_signal = activate_button.addEventListener('click',()=>{
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{action:"runExtension"},(response)=>{
            if((response && response.id && response.title))
            {
                const video_controls = document.querySelector('.video-loop-controls')
                const id = document.querySelector('.video-data > ul > #id')
                const title = document.querySelector('.video-data > ul > #title')

                video_controls.hidden = false;
                id.textContent = `ID: ${response.id}`
                title.textContent = `Title : ${response.title}`.replace('- Youtube', '')
            }
        })
    })
})

document.addEventListener('DOMContentLoaded', () => {
const video_controls = document.querySelector('.video-loop-controls')
const id = document.querySelector('.video-data > ul > #id')
const title = document.querySelector('.video-data > ul > #title')

  chrome.storage.local.get("second_time", (result) => {
    if (result.second_time) {
      video_controls.hidden = false;
      id.textContent = `ID: ${response.id}`;
      title.textContent = `Title: ${response.title}`.replace('- Youtube', '');
    }
  });
});