
// =====================================
// LOAD PORTFOLIO DATA USING FETCH API
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load JSON file");
            }

            return response.json();
        })
        .then(data => {

            // Show portfolio
            document.getElementById("portfolioContent")
                .classList.remove("d-none");

            // Display all sections
            loadPersonalDetails(data.personal);
            loadAbout(data.about, data.personal);
            loadSkills(data.skills);
            loadProjects(data.projects);
            loadEducation(data.education);
            loadCertifications(data.certifications);
            loadSocialLinks(data.social);

            // Current year
            document.getElementById("currentYear")
                .textContent = new Date().getFullYear();

            // Contact form
            setupContactForm(data.personal);

        })
        .catch(error => {

            console.error("Error:", error);

            document.getElementById("errorMessage")
                .classList.remove("d-none");

        });

});


// =====================================
// PERSONAL DETAILS
// =====================================

function loadPersonalDetails(personal) {

    document.getElementById("logo").textContent =
        personal.name;

    document.getElementById("heroGreeting").textContent =
        personal.greeting;

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentTitle").textContent =
        personal.title;

    document.getElementById("heroIntro").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("profileImage").alt =
        personal.name;

    const resumeLink = document.getElementById("resumeLink");

    resumeLink.href = personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyrightName").textContent =
        personal.name;
}


// =====================================
// ABOUT SECTION
// =====================================

function loadAbout(about, personal) {

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("aboutEmail").textContent =
        personal.email;

    document.getElementById("aboutPhone").textContent =
        personal.phone;
}


// =====================================
// SKILLS SECTION
// =====================================

function loadSkills(skills) {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const skillCard = `
            <div class="col-sm-6 col-lg-4">
                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>

                    <h5>${escapeHTML(skill.name)}</h5>

                    <p>${escapeHTML(skill.description)}</p>

                    <div class="skill-progress">
                        <span style="width: ${skill.level}%"></span>
                    </div>

                    <small>${skill.level}%</small>

                </div>
            </div>
        `;

        container.innerHTML += skillCard;

    });

}


// =====================================
// PROJECTS SECTION
// =====================================

function loadProjects(projects) {

    const container =
        document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const technologies = project.technologies
            .map(tech =>
                `<span class="tech-badge">${escapeHTML(tech)}</span>`
            ).join("");

        const projectCard = `
            <div class="col-md-6 col-lg-4">

                <div class="project-card">

                    <img src="${escapeHTML(project.image)}"
                         alt="${escapeHTML(project.name)}"
                         loading="lazy">

                    <div class="project-content">

                        <h5>${escapeHTML(project.name)}</h5>

                        <p>${escapeHTML(project.description)}</p>

                        <div class="mb-3">
                            ${technologies}
                        </div>

                        <a href="${safeURL(project.link)}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="project-link">

                            View Project
                            <i class="bi bi-arrow-right"></i>

                        </a>

                    </div>

                </div>

            </div>
        `;

        container.innerHTML += projectCard;

    });

}


// =====================================
// EDUCATION SECTION
// =====================================

function loadEducation(education) {

    const container =
        document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const educationCard = `
            <div class="education-card mb-4">

                <h4>${escapeHTML(item.course)}</h4>

                <h5>${escapeHTML(item.college)}</h5>

                <p>
                    <i class="bi bi-calendar"></i>
                    ${escapeHTML(item.duration)}
                </p>

                <p>
                    <strong>Semester:</strong>
                    ${escapeHTML(item.semester)}
                </p>

                <p>
                    <strong>Academic Details:</strong>
                    ${escapeHTML(item.details)}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${escapeHTML(item.status)}
                </p>

            </div>
        `;

        container.innerHTML += educationCard;

    });

}


// =====================================
// CERTIFICATIONS SECTION
// =====================================

function loadCertifications(certifications) {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const card = `
            <div class="col-md-6 col-lg-4">

                <div class="certificate-card">

                    <i class="bi bi-award-fill"></i>

                    <h5>${escapeHTML(certificate.name)}</h5>

                    <p>${escapeHTML(certificate.provider)}</p>

                    <small>
                        ${escapeHTML(certificate.year)}
                    </small>

                    <p class="mt-2">
                        ${escapeHTML(certificate.description)}
                    </p>

                </div>

            </div>
        `;

        container.innerHTML += card;

    });

}


// =====================================
// SOCIAL MEDIA LINKS
// =====================================

function loadSocialLinks(social) {

    const container =
        document.getElementById("socialLinks");

    container.innerHTML = "";

    social.forEach(item => {

        const link = document.createElement("a");

        link.href = safeURL(item.url);

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.setAttribute("aria-label", item.name);

        const icon = document.createElement("i");

        icon.className = item.icon;

        link.appendChild(icon);

        container.appendChild(link);

    });

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

function setupContactForm(personal) {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();

        const formMessage =
            document.getElementById("formMessage");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check empty fields
        if (!name || !email || !subject || !message) {

            showFormMessage(
                "Please fill in all fields.",
                "danger"
            );

            return;

        }

        // Validate email
        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "danger"
            );

            return;

        }

        // Basic message validation
        if (message.length < 10) {

            showFormMessage(
                "Message must contain at least 10 characters.",
                "danger"
            );

            return;

        }

        // Prepare email using mailto
        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            "mailto:" + personal.email +
            "?subject=" + mailSubject +
            "&body=" + mailBody;

        showFormMessage(
            "Validation successful! Your email application will open.",
            "success"
        );

        window.location.href = mailtoLink;

        form.reset();

    });

}


// =====================================
// DISPLAY FORM MESSAGE
// =====================================

function showFormMessage(message, type) {

    const formMessage =
        document.getElementById("formMessage");

    formMessage.className = "alert alert-" + type + " mt-3";

    formMessage.textContent = message;

}


// =====================================
// BASIC HTML ESCAPING
// =====================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


// =====================================
// VALIDATE EXTERNAL URLS
// =====================================

function safeURL(value) {

    try {

        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

    } catch (error) {

        console.error("Invalid URL:", value);

    }

    return "#";

}
