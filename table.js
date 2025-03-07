document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get({ jobListings: [] }, (result) => {
        const jobTable = document.getElementById("jobTable");
        if (!result.jobListings || result.jobListings.length === 0) {
            jobTable.innerHTML = "<tr><td colspan='5'>No jobs saved.</td></tr>";
            return;
        }
        result.jobListings.forEach(job => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${job?.jobTitle || "Unknown"}</td>
        <td>${job?.company || "Unknown"}</td>
        <td><a href="${job?.link || "#"}" target="_blank">Link</a></td>
        <td>${job?.skills ? job.skills.join(", ") : "Not listed"}</td>
        <td><button class="deleteJob" data-link="${job?.link}">Delete</button></td>
      `;
            jobTable.appendChild(row);
        });
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteJob")) {
            const jobLink = event.target.getAttribute("data-link");
            chrome.runtime.sendMessage({ action: "deleteJob", link: jobLink }, (response) => {
                if (response && response.success) {
                    event.target.closest("tr").remove();
                }
            });
        }
    });
});
