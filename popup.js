document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saveJob").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const jobTitleElement = document.querySelector("h1");
                    const companyElement = document.querySelector(".job-details-jobs-unified-top-card__company-name");

                    let skills = [];
                    const qualificationsSpan = Array.from(document.querySelectorAll("span"))
                        .find(span => span.innerText && span.innerText.trim().toLowerCase() === "qualifications");

                    if (qualificationsSpan) {
                        const listElement = qualificationsSpan.closest("div")?.querySelector("ul");
                        if (listElement) {
                            skills = Array.from(listElement.querySelectorAll("li"))
                                .map(skill => skill.innerText.trim());
                        }
                    }

                    return {
                        jobTitle: jobTitleElement?.innerText.trim() || "Unknown",
                        company: companyElement?.innerText.trim() || "Unknown",
                        link: window.location.href || "Unknown",
                        skills: skills.length ? skills : ["Not listed"]
                    };
                }
            }, (results) => {
                if (results && results[0] && results[0].result) {
                    chrome.runtime.sendMessage({ action: "saveJob", data: results[0].result });
                }
            });
        });
    });

    document.getElementById("openTable").addEventListener("click", () => {
        chrome.tabs.create({ url: "table.html" });
    });
});
