// Polyfill for older browsers
if (!Object.entries) {
    Object.entries = function(obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i);
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
}

// Polyfill for older browsers
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or undefined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len + n, 0);
        while (k < len) {
            if (o[k] === searchElement) {
                return true;
            }
            k++;
        }
        return false;
    };
}

// ==============Sidebar toggle===============
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector('.main-content');

if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", function() {
        try {
            sidebar.classList.toggle("show");
        } catch (error) {
            console.error('Error toggling sidebar:', error);
        }
    });
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggleBtn = toggleBtn.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnToggleBtn && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
    }
});

// =====================Section/block select=========================
const menuItems = document.querySelectorAll(".menu-items");
const contents = document.querySelectorAll(".content");

menuItems.forEach(menu => {
    menu.addEventListener("click", function() {
        handleMenuClick(this, menuItems, contents);
    });
});

// Helper function for menu click handling
function handleMenuClick(clickedItem, allItems, allContents) {
    allItems.forEach(menu => menu.classList.remove("active"));
    clickedItem.classList.add("active");

    allContents.forEach(content => content.classList.remove("active"));

    const targetId = clickedItem.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add("active");
    }

    // Collapse sidebar on mobile when menu item is clicked
    if (window.innerWidth <= 989 && sidebar && sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
    }
}

// Section/block selection functionality
const selectButtons = document.querySelectorAll(".select-btn");
const floorContents = document.querySelectorAll(".floor_content");

selectButtons.forEach(button => {
    button.addEventListener("click", function() {
        handleSelectClick(this, selectButtons, floorContents);
    });
});

// Helper function for select button click handling
function handleSelectClick(clickedButton, allButtons, allContents) {
    allButtons.forEach(button => button.classList.remove("active"));
    clickedButton.classList.add("active");

    allContents.forEach(content => content.classList.remove("active"));

    const targetId = clickedButton.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add("active");
    }
}

// ======================arccordion=================
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", function() {
        handleAccordionClick(this);
    });
});

// Helper function for accordion click handling
function handleAccordionClick(header) {
    const content = header.nextElementSibling;
    if (content) {
        content.classList.toggle("active");
    }
}

// ======SAVE AS PDF=====
function saveOverlayAsPDF() {
    try {
        const overlay = document.getElementById("overlay");
        if (!overlay) {
            throw new Error('Overlay element not found');
        }

        // Show loading indicator
        showLoading();

        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        // Get all styles from the current document
        const styles = Array.from(document.styleSheets)
            .map(sheet => {
                try {
                    return Array.from(sheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('\n');
                } catch (e) {
                    return '';
                }
            })
            .join('\n');

        // Clone the overlay content to modify it
        const content = overlay.cloneNode(true);
        
        // Show all hidden elements
        const hiddenElements = content.querySelectorAll('[style*="display: none"]');
        hiddenElements.forEach(el => el.style.display = '');
        
        // Show accordion content
        const accordionContent = content.querySelector('.accordion-content');
        if (accordionContent) {
            accordionContent.style.display = 'block';
        }

        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Details</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
                    <style>
                        ${styles}
                        @media print {
                            body { padding: 20px; }
                            .modal-body { padding: 0; }
                            .modal-footer { display: none; }
                            .edit-btn { display: none; }
                            .accordion-header { display: none; }
                            .accordion-content { display: block !important; }
                            .facility-list { display: inline-block; margin: 5px; }
                        }
                    </style>
                </head>
                <body>
                    ${content.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();

        // Hide loading indicator immediately after opening print window
        hideLoading();

        // Wait for content to load then print
        printWindow.onload = function() {
            printWindow.print();
            // Close window after a short delay to ensure print dialog is shown
            setTimeout(() => {
                printWindow.close();
            }, 500);
        };

    } catch (error) {
        console.error('Error printing details:', error);
        hideLoading();
        alert('An error occurred while printing. Please try again.');
    }
}

// Loading indicator functionality
const loadingIndicator = document.getElementById('loading');

function showLoading() {
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

// Example usage in form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoading();
        
        // Simulate form submission delay
        setTimeout(() => {
            hideLoading();
            // Add your form submission logic here
        }, 1000);
    });
});

// Add error boundary for unhandled errors
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// Add support for older browsers that don't support Promise
if (!window.Promise) {
    window.Promise = function(executor) {
        var self = this;
        var state = 'pending';
        var value = null;
        var callbacks = [];

        function resolve(val) {
            if (state === 'pending') {
                state = 'resolved';
                value = val;
                callbacks.forEach(function(callback) {
                    callback(val);
                });
            }
        }

        function reject(val) {
            if (state === 'pending') {
                state = 'rejected';
                value = val;
                callbacks.forEach(function(callback) {
                    callback(val);
                });
            }
        }

        executor(resolve, reject);

        this.then = function(onResolved, onRejected) {
            if (state === 'resolved') {
                onResolved(value);
            } else if (state === 'rejected') {
                onRejected(value);
            } else {
                callbacks.push(function(val) {
                    if (state === 'resolved') {
                        onResolved(val);
                    } else {
                        onRejected(val);
                    }
                });
            }
            return self;
        };
    };
}

// Table search functionality
const searchInput = document.getElementById('search');
const table = document.querySelector('.table');

if (searchInput && table) {
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const rows = table.querySelectorAll('tr:not(.table-header)');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Table pagination functionality
const ROWS_PER_PAGE = 10;
let currentPage = 1;
let totalRows = 0;
let allRows = [];

function initializePagination() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    // Get all rows except the header
    allRows = Array.from(tableBody.querySelectorAll('tr'));
    totalRows = allRows.length;
    
    // Calculate total pages
    const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);
    document.getElementById('totalPages').textContent = totalPages;
    
    // Show first page
    showPage(1);
    
    // Add event listeners to pagination buttons
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
}

function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRows);
    
    // Hide all rows
    allRows.forEach(row => row.style.display = 'none');
    
    // Show rows for current page
    for (let i = startIndex; i < endIndex; i++) {
        allRows[i].style.display = '';
    }
    
    // Update pagination info
    document.getElementById('currentPage').textContent = page;
    
    // Update button states
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);
    
    prevButton.disabled = page === 1;
    nextButton.disabled = page >= totalPages;
    
    // Update button styles
    prevButton.classList.toggle('disabled', page === 1);
    nextButton.classList.toggle('disabled', page >= totalPages);
}

// Initialize pagination when the page loads
document.addEventListener('DOMContentLoaded', initializePagination);


