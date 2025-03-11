
// ==============Sidebar toggle===============
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("show");
    });
});

// =====================Accordion=========================

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-items");
    const contents = document.querySelectorAll(".content");

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove active class from all menu items
            menuItems.forEach(menu => menu.classList.remove("active"));
            this.classList.add("active"); // Add active class to the clicked item

            // Hide all content sections
            contents.forEach(content => content.classList.remove("active"));

            // Show the target content section
            const targetId = this.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });
});
