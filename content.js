// content.js
function getJobData() {
    const jobTitleElement = document.querySelector("h1");
    const companyElement = document.querySelector(".job-details-jobs-unified-top-card__company-name");

    // Extract skills and qualifications
    let skills = [];
    const relevantSpan = Array.from(document.querySelectorAll("span"))
        .find(span => {
            const text = span.innerText?.trim().toLowerCase();
            return text && /skill.*/.test(text) || /qualification.*/.test(text);
        });

    if (relevantSpan) {
        const listElement = relevantSpan.closest("div")?.querySelector("ul");
        if (listElement) {
            skills = Array.from(listElement.querySelectorAll("li"))
                .map(skill => skill.innerText.trim());
        }
    }

    return {
        jobTitle: jobTitleElement?.innerText?.trim() || "Unknown",
        company: companyElement?.innerText?.trim() || "Unknown",
        link: window.location.href || "Unknown",
        skills: skills.length ? skills : ["Not listed"]
    };
}

// Automatically save job when page loads
chrome.runtime.sendMessage({ action: "saveJob", data: getJobData() });


