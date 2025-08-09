chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.reloadPage && sender.tab) {
    const tabId = sender.tab.id;
    chrome.tabs.reload(tabId)
    function listener(updatedtabId,changeInfo)
    {
        if(tabId === updatedtabId && changeInfo.status === 'complete')
        {
            chrome.tabs.sendMessage(tabId, { action: "updateUI" });
            chrome.tabs.onUpdated.removeListener(listener)
        }
    }
    chrome.tabs.onUpdated.addListener(listener)
  }
});


// chrome.tabs.onRemoved.addListener((tabId) => {
//   chrome.storage.session.remove("buttonPressed");
// });