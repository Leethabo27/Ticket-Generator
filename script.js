
const form = document.getElementById("ticketForm");
const ticket = document.getElementById("ticket");
const ticketContent = document.getElementById("ticketContent"); 
const ticketName = document.getElementById("ticketName");
const ticketEmail = document.getElementById("ticketEmail");
const ticketCompany = document.getElementById("ticketCompany");
const ticketTypeDisplay = document.getElementById("ticketTypeDisplay");
const ticketNumber = document.getElementById("ticketNumber");
const qrcodeContainer = document.getElementById("qrcode");
const downloadButton = document.getElementById("downloadTicket");


form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const ticketType = document.getElementById("ticketType").value;

    
    if (name === "" || email === "") {
        alert("All fields are required!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    
    const ticketNum = "CVS-" + Math.floor(100000 + Math.random() * 900000);

    
    ticketName.textContent = name;
    ticketEmail.textContent = email;
    ticketCompany.textContent = company ? company : "N/A";
    ticketTypeDisplay.textContent = ticketType;
    ticketNumber.textContent = ticketNum;

    // Clear and generate QR Code
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, {
        text: `Name: ${name}\nEmail: ${email}\nTicket Number: ${ticketNum}`,
        width: 100,
        height: 100
    });

    
    ticket.classList.remove("hidden");
});


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Working Download Ticket Function
downloadButton.addEventListener("click", function () {
    html2canvas(ticketContent, { scale: 2, backgroundColor: "#fff" }).then(canvas => {
        canvas.toBlob(blob => {
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "CreativeVisionSummit_Ticket.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});