
// ==============Sidebar toggle===============
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("show");
    });
});

// =====================Section/block select=========================

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

    const floor_contents = document.querySelectorAll(".floor_content");
    const select_btn = document.querySelectorAll(".select-btn");
    
    select_btn.forEach(item => {
        item.addEventListener("click", function () {
            // Remove active class from all select_btn
            select_btn.forEach(menu => menu.classList.remove("active"));
            this.classList.add("active"); // Add active class to the clicked item

            // Hide all content sections
            floor_contents.forEach(floor_content => floor_content.classList.remove("active"));

            // Show the target content section
            const targetIds = this.getAttribute("data-target");
            document.getElementById(targetIds).classList.add("active");
        });
    });
});


// ======================arccordion=================


document.querySelectorAll(".accordion-header").forEach(header => { 
    header.addEventListener("click", function() { 
        let content = this.nextElementSibling; 
            
        document.querySelectorAll(".accordion-content").forEach(item => { 
            if (item !== content) item.classList.remove("active"); 
        }); 

        content.classList.toggle("active"); 
    }); 
}); 

// ======SAVE AS PDF===

function saveOverlayAsPDF() { 
    let overlay = document.getElementById("overlay"); // Get the overlay content 

    // Create a new print window 
    let printWindow = window.open("", "", "width=600,height=600"); 

    // Get all stylesheets (both internal & external) 
    let styles = ""; 
    document.querySelectorAll("link[rel='stylesheet'], style").forEach(style => { 
        styles += style.outerHTML; // Copy all styles 
    }); 

    printWindow.document.write(` 
        <html> 
        <head> 
            <title>Save as PDF</title> 
            ${styles}  <!-- Injects all styles --> 
            <style> 
                body { 
                    display: flex;
                    flex-direction:column;
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    margin: 0; 
                } 
                .overlay { 
                    display: block !important; 
                    position: relative !important; 
                } /* Ensure it's visible */ 

                @media print{
                    @page{size:A4;
                        margin:20mm;
                    }
                    body{
                        width:210mm;
                        height:297mm;
                    }
                    .overlay{
                        display:block;
                        position:relative;
                        width:100%;
                        height:auto;
                    }
                }
                .header{
                    text-align:center;
                    margin-bottom:4rem;
                }
                .footer{
                    margin-top:4rem;
                }
                h1,h2,h3{
                    margin-top:8px !important;
                }
            </style> 
        </head> 
        <body> 
            <section>
                <div class="header">
                    <h1>Nigerian College of Aviation Technology</h1>
                    <h2>Student Affairs Department</h2>
                    <h3>   Hostel Occupant Details</h3>
                </div>
                
                <div class="overlay">${overlay.innerHTML}</div> 

                <div class="footer">
                    <h3>Engr.  H.A Mu'azu</h3>
                    <h4>Dean, Student Affairs</h4>
                </div> 
            </section>
        </body> 
        </html> 
    `); 

    printWindow.document.close(); 
    printWindow.focus(); 
    setTimeout(() => { 
        printWindow.print();  // Users can choose "Save as PDF" 
        printWindow.close(); 
    }, 500); // Delay to ensure styles load 
} 

// ==========select=============


