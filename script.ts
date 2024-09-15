interface ResumeData {
    name: string;
    email: string;
    contact: string;
    education: string;
    experience: string;
    skills: string;
    profilePicture: string;
    username: string;
}

// Select elements 
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Generate Resume function
function generateResume(event: Event) {
    event.preventDefault();

    const username = (document.getElementById('name') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    const reader = new FileReader();
    reader.onload = function () {
        const profilePicture = reader.result as string;

        const resumeData: ResumeData = {
            name,
            email,
            contact,
            education,
            experience,
            skills,
            profilePicture: profilePicture,
            username: username,
        };

        // Store resume data in localStorage
        localStorage.setItem(username, JSON.stringify(resumeData));

        // Display resume
        displayResume(resumeData);

        // Generate shareable URL 
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
        if (shareableLinkElement) {
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        } else {
            console.error("Shareable link element not found");
        }
    };

    if (profilePictureInput.files && profilePictureInput.files[0]) {
        reader.readAsDataURL(profilePictureInput.files[0]);
    }
}

// Display Resume function
function displayResume(data: ResumeData) {
    resumeDisplayElement.innerHTML = `
        <div class="resume">
            <h2><span contenteditable="true">${data.name}</span></h2>
            <img src="${data.profilePicture}" alt="Profile Picture" style="width: 150px; height: 150px;">
            <p><strong>Email:</strong><span contenteditable="true"> ${data.email}</span></p>
            <p><strong>Contact:</strong><span contenteditable="true"> ${data.contact}</span></p>
            <h3>Education</h3>
            <p><span contenteditable="true">${data.education}</span></p>
            <h3>Experience</h3>
            <p><span contenteditable="true">${data.experience}</span></p>
            <h3>Skills</h3>
            <p><span contenteditable="true">${data.skills}</span></p>
        </div>
    `;
}

// Prefill form based on info in localstorage
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData) as ResumeData;
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('contact') as HTMLInputElement).value = resumeData.contact;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});

// Handle PDF download section
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', () => {
        window.print(); // Opens the print dialog to save as PDF
    });
}

//  submit 
const form = document.getElementById('Resume-form') as HTMLFormElement;
if (form) {
    form.addEventListener('submit', generateResume);
} else {
    console.error("Form not found");
}
