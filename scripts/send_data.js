
function take_input()
{
  console.log("TAKE INPUT ACTIVATED")
  document.getElementById('save-button').addEventListener('click', () => {
    const startHour = parseInt(document.getElementById('start-hour').value) || 0;
    const startMin = parseInt(document.getElementById('start-min').value) || 0;
    const startSec = parseInt(document.getElementById('start-sec').value) || 0;

    const endHour = parseInt(document.getElementById('end-hour').value) || 0;
    const endMin = parseInt(document.getElementById('end-min').value) || 0;
    const endSec = parseInt(document.getElementById('end-sec').value) || 0;

    let invalid = false;
    if (startMin >= 60 || startSec >= 60 || endMin >= 60 || endSec >= 60) {
      invalid = true;
    }

    if (invalid) {
      alert('Minutes and seconds for start and end time must be less than 60.');
      return;
    }

    const startTimeInSeconds = startHour * 3600 + startMin * 60 + startSec;
    const endTimeInSeconds = endHour * 3600 + endMin * 60 + endSec;

    const loopTimes = {
      start: startTimeInSeconds,
      end: endTimeInSeconds,
    };
    console.log('BUTTON CLICKED')
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
      chrome.tabs.sendMessage(tabs[0].id, {timestamps: loopTimes});
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const video_controls = document.querySelector('.video-loop-controls')
  const id = document.querySelector('.video-data > ul > #id')
  const title = document.querySelector('.video-data > ul > #title')
  chrome.storage.local.get("second_time", (result) => {
    console.log(result)
    if (result.second_time) {
      video_controls.hidden = false;
      id.textContent = `ID: ${chrome.storage.local.get('id')}`;
      title.textContent = `Title: ${chrome.storage.local.get('title')}`.replace('- Youtube', '');
    }
  });

const activate_button = document.querySelector("button#activate-button")
activate_button.addEventListener('click',()=>{
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
});
});
take_input()