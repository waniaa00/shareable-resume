// Select elements 
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Generate Resume function
function generateResume(event) {
    event.preventDefault();
    var username = document.getElementById('name').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var profilePictureInput = document.getElementById('profilePicture');
    var reader = new FileReader();
    reader.onload = function () {
        var profilePicture = reader.result;
        var resumeData = {
            name: name,
            email: email,
            contact: contact,
            education: education,
            experience: experience,
            skills: skills,
            profilePicture: profilePicture,
            username: username,
        };
        // Store resume data in localStorage
        localStorage.setItem(username, JSON.stringify(resumeData));
        // Display resume
        displayResume(resumeData);
        // Generate shareable URL 
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        if (shareableLinkElement) {
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        }
        else {
            console.error("Shareable link element not found");
        }
    };
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        reader.readAsDataURL(profilePictureInput.files[0]);
    }
}
// Display Resume function
function displayResume(data) {
    resumeDisplayElement.innerHTML = "\n        <div class=\"resume\">\n            <h2><span contenteditable=\"true\">".concat(data.name, "</span></h2>\n            <img src=\"").concat(data.profilePicture, "\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px;\">\n            <p><strong>Email:</strong><span contenteditable=\"true\"> ").concat(data.email, "</span></p>\n            <p><strong>Contact:</strong><span contenteditable=\"true\"> ").concat(data.contact, "</span></p>\n            <h3>Education</h3>\n            <p><span contenteditable=\"true\">").concat(data.education, "</span></p>\n            <h3>Experience</h3>\n            <p><span contenteditable=\"true\">").concat(data.experience, "</span></p>\n            <h3>Skills</h3>\n            <p><span contenteditable=\"true\">").concat(data.skills, "</span></p>\n        </div>\n    ");
}
// Prefill form based on info in localstorage
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('contact').value = resumeData.contact;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
// Handle PDF download section
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', function () {
        window.print(); // Opens the print dialog to save as PDF
    });
}
//  submit 
var form = document.getElementById('Resume-form');
if (form) {
    form.addEventListener('submit', generateResume);
}
else {
    console.error("Form not found");
}
