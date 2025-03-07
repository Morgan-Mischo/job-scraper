// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveJob" && message.data) {
        chrome.storage.local.get({ jobListings: [] }, (result) => {
            const jobListings = result.jobListings || [];
            jobListings.push(message.data);
            chrome.storage.local.set({ jobListings }, () => {
                sendResponse({ success: true });
            });
        });
        return true;
    } else if (message.action === "deleteJob" && message.link) {
        chrome.storage.local.get({ jobListings: [] }, (result) => {
            if (!result.jobListings) {
                sendResponse({ success: false, error: "No job listings found" });
                return;
            }
            const jobListings = result.jobListings.filter(job => job?.link && job.link !== message.link);
            chrome.storage.local.set({ jobListings }, () => {
                sendResponse({ success: true });
            });
        });
        return true;
    }
});
