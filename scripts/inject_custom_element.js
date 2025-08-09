let data = {
    "video_id":"",
    "video_title":"",
}
function waitForElement(selector) {
  return new Promise(resolve => {
    const el = document.querySelector(selector);
    if (el) {
      console.log(`Found element immediately: ${selector}`);
      return resolve(el);
    }
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        console.log(`Found element via observer: ${selector}`);
        resolve(el);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
const videoPromise = waitForElement('video.html5-main-video')
function apply_time_stamps(video)
{
  if(data.video_timing_data.video_loop_end_time){

  
    if(video.currentTime > data.video_timing_data.video_loop_end_time)
    {
      video.currentTime = data.video_timing_data.video_loop_start_time
    }
  }}
function set_timestamps(video)
{
    //   "video_timing_data":{
    //     "number" : "1",
    //     "video_loop_start_time":"",
    //     "video_loop_end_time":"",
    //     "video_max_time": ""
    // }
  data.video_timing_data.video_loop_start_time = video.currentTime
  data.video_timing_data.video_max_time = video.duration
  video.addEventListener("seeked",()=>{
    console.log("Seeked at: ",video.currentTime)
    data.video_timing_data.video_loop_end_time = video.currentTime
  })




}
function waitForVisibleElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    function check() {
      const el = document.querySelector(selector);
      if (el && window.getComputedStyle(el).display !== 'none') {
        resolve(el);
      } else {
        requestAnimationFrame(check);
      }
    }
    check();
  });
}

async function addCustomContextMenuItem() {
  const videoPlayer = await waitForElement('.html5-video-container');

  videoPlayer.addEventListener('contextmenu', async () => {
    try {
      const menu = await waitForVisibleElement('.ytp-popup.ytp-contextmenu');

      if (menu.querySelector('.custom-loop-item')) return; 

      const panelMenu = menu.querySelector('.ytp-panel-menu');
      if (!panelMenu) return;

      const customMenuItem = document.createElement('div');
      customMenuItem.className = 'ytp-menuitem custom-loop-item';
      customMenuItem.setAttribute('role', 'menuitemcheckbox');
      customMenuItem.setAttribute('aria-checked', 'false');
      customMenuItem.setAttribute('tabindex', '-1');

      const icon = document.createElement('div');
      icon.className = 'ytp-menuitem-icon';
      icon.innerHTML = `<svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <path d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z" fill="white"></path>
      </svg>`;

      const label = document.createElement('div');
      label.className = 'ytp-menuitem-label';
      label.textContent = "Loop(Extension)";

      const content = document.createElement('div');
      content.className = 'ytp-menuitem-content';
      const checkbox = document.createElement('div');
      checkbox.className = 'ytp-menuitem-toggle-checkbox';
      content.appendChild(checkbox);

      customMenuItem.appendChild(icon);
      customMenuItem.appendChild(label);
      customMenuItem.appendChild(content);

      customMenuItem.addEventListener('click', () => {
        const isChecked = customMenuItem.getAttribute('aria-checked') === 'true';
        customMenuItem.setAttribute('aria-checked', !isChecked);
        videoPromise.then((video)=>{
          set_timestamps(video);
          setInterval(()=>{
            apply_time_stamps(video)
          },100)
        })
        console.log(data)
      });

      panelMenu.appendChild(customMenuItem);
      panelMenu.removeChild(Array.from(panelMenu.children)[0])
      console.log("Custom menu item added.");

    } catch (e) {
      console.warn(e);
    }
  });
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "runExtension") {
    chrome.runtime.sendMessage({ reloadPage: true });
  }

  if (message.action === "updateUI" || message.activated) {
    addCustomContextMenuItem();
    chrome.runtime.sendMessage({activated:true})
  }
});

