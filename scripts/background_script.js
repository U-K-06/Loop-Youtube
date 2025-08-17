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

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (tabs.length === 0) return;
  const activeTabId = tabs[0].id;
  chrome.tabs.onRemoved.addListener(function(removedTabId, removeInfo) {
    if (removedTabId === activeTabId) {
      chrome.storage.local.remove('second_time')
      chrome.storage.local.remove('id')
      chrome.storage.local.remove('title')
    }
  });
});