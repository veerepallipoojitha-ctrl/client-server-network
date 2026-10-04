/*
============================================================
CLIENT-SERVER NETWORK SIMULATION
============================================================

CLIENT
IP  : 192.168.10.10
MAC : 00:11:22:33:44:55

SERVER
IP : 192.168.10.20

SERVICES

DNS  : Port 53
HTTP : Port 80
FTP  : Port 21

DNS:
www.network.local -> 192.168.10.20
ftp.network.local -> 192.168.10.20

============================================================
*/


// ============================================================
// NETWORK INFORMATION
// ============================================================

const client = {

    name: "Client-PC",

    ip: "192.168.10.10",

    mac: "00:11:22:33:44:55"

};


const server = {

    name: "Network-Server",

    ip: "192.168.10.20"

};


const services = {

    DNS: {

        protocol: "UDP",

        port: 53

    },

    HTTP: {

        protocol: "TCP",

        port: 80

    },

    FTP: {

        protocol: "TCP",

        port: 21

    }

};


// ============================================================
// DNS RECORDS
// ============================================================

const dnsRecords = {

    "www.network.local":
        "192.168.10.20",

    "ftp.network.local":
        "192.168.10.20",

    "dns.network.local":
        "192.168.10.20"

};


// ============================================================
// SIMULATION
// ============================================================

let currentStep = 0;

let started = false;

const totalSteps = 10;


// ============================================================
// ELEMENTS
// ============================================================

const consoleBox =
    document.getElementById("console");

const progress =
    document.getElementById("progress");

const stepText =
    document.getElementById("stepText");


// ============================================================
// LOG
// ============================================================

function log(message, type = "") {

    const line =
        document.createElement("div");

    line.textContent =
        message;

    if (type) {

        line.classList.add(type);

    }

    consoleBox.appendChild(line);

    consoleBox.scrollTop =
        consoleBox.scrollHeight;

}


// ============================================================
// PROGRESS
// ============================================================

function updateProgress() {

    const percentage =
        (currentStep / totalSteps) * 100;

    progress.style.width =
        percentage + "%";

}


// ============================================================
// PACKET DISPLAY
// ============================================================

function updatePacket(

    clientIP,
    service,
    protocol,
    destination,
    port,
    status

) {

    document.getElementById("packetClient")
        .textContent = clientIP;

    document.getElementById("packetService")
        .textContent = service;

    document.getElementById("packetProtocol")
        .textContent = protocol;

    document.getElementById("packetDestination")
        .textContent = destination;

    document.getElementById("packetPort")
        .textContent = port;

    document.getElementById("packetStatus")
        .textContent = status;

}


// ============================================================
// ACTIVATE LINK
// ============================================================

function activateLine(id) {

    document
        .getElementById(id)
        .classList.add("active");

}


// ============================================================
// STEP 1 — CLIENT START
// ============================================================

function stepOne() {

    log(
        "==================================================",
        "info"
    );

    log(
        "STEP 1: Client starts network communication",
        "info"
    );

    log(
        `Client IP: ${client.ip}`
    );

    log(
        `Client MAC: ${client.mac}`
    );

    log(
        `Server IP: ${server.ip}`
    );

    log(
        "Client wants to access www.network.local."
    );

    log(
        "Client first needs DNS name resolution."
    );


    updatePacket(

        client.ip,

        "DNS",

        "UDP",

        server.ip,

        53,

        "REQUEST"

    );


    activateLine("line1");


    stepText.textContent =
        "Step 1: Client starts communication with the server.";

}


// ============================================================
// STEP 2 — DNS REQUEST
// ============================================================

function stepTwo() {

    log(
        "STEP 2: DNS request sent",
        "info"
    );

    log(
        "Client sends DNS query."
    );

    log(
        "Query: www.network.local"
    );

    log(
        "Destination port: UDP 53."
    );

    log(
        "DNS server receives query."
    );


    updatePacket(

        client.ip,

        "DNS",

        "UDP",

        server.ip,

        53,

        "QUERY"

    );


    activateLine("line2");


    stepText.textContent =
        "Step 2: Client sends a DNS query to the DNS server.";

}


// ============================================================
// STEP 3 — DNS RESPONSE
// ============================================================

function stepThree() {

    log(
        "STEP 3: DNS server sends response",
        "info"
    );

    const domain =
        "www.network.local";

    const resolvedIP =
        dnsRecords[domain];

    log(
        `DNS Query: ${domain}`
    );

    log(
        `DNS Response: ${resolvedIP}`,
        "success"
    );

    log(
        "Name resolution completed."
    );


    updatePacket(

        server.ip,

        "DNS",

        "UDP",

        client.ip,

        53,

        "RESPONSE"

    );


    stepText.textContent =
        "Step 3: DNS resolves the domain name to 192.168.10.20.";

}


// ============================================================
// STEP 4 — HTTP REQUEST
// ============================================================

function stepFour() {

    log(
        "STEP 4: Client sends HTTP request",
        "info"
    );

    log(
        "Client opens:"
    );

    log(
        "http://www.network.local"
    );

    log(
        "TCP connection established."
    );

    log(
        "HTTP request sent to port 80."
    );


    updatePacket(

        client.ip,

        "HTTP",

        "TCP",

        server.ip,

        80,

        "GET /"

    );


    stepText.textContent =
        "Step 4: Client sends an HTTP GET request.";

}


// ============================================================
// STEP 5 — HTTP RESPONSE
// ============================================================

function stepFive() {

    log(
        "STEP 5: Web server processes HTTP request",
        "info"
    );

    log(
        "[HTTP SERVER] Request received."
    );

    log(
        "[HTTP SERVER] GET /"
    );

    log(
        "[HTTP SERVER] Sending HTTP 200 OK.",
        "success"
    );


    updatePacket(

        server.ip,

        "HTTP",

        "TCP",

        client.ip,

        80,

        "200 OK"

    );


    document.getElementById("webPage")
        .innerHTML = `

        <h2>
            Welcome to Network Web Server
        </h2>

        <p>
            HTTP 200 OK
        </p>

        <p>
            Server IP:
            ${server.ip}
        </p>

        <p>
            Client:
            ${client.ip}
        </p>

    `;


    stepText.textContent =
        "Step 5: HTTP server returns a 200 OK response.";

}


// ============================================================
// STEP 6 — FTP CONNECTION
// ============================================================

function stepSix() {

    log(
        "STEP 6: Client connects to FTP server",
        "info"
    );

    log(
        "FTP server address:"
    );

    log(
        "ftp.network.local"
    );

    log(
        `Resolved IP: ${server.ip}`
    );

    log(
        "FTP control connection uses TCP port 21."
    );


    updatePacket(

        client.ip,

        "FTP",

        "TCP",

        server.ip,

        21,

        "CONNECT"

    );


    stepText.textContent =
        "Step 6: Client establishes an FTP connection.";

}


// ============================================================
// STEP 7 — FTP LOGIN
// ============================================================

function stepSeven() {

    log(
        "STEP 7: FTP authentication",
        "info"
    );

    log(
        "[FTP SERVER] Client connection accepted."
    );

    log(
        "[FTP SERVER] User authentication successful.",
        "success"
    );

    log(
        "[FTP SERVER] Ready for file transfer."
    );


    updatePacket(

        client.ip,

        "FTP",

        "TCP",

        server.ip,

        21,

        "AUTH OK"

    );


    stepText.textContent =
        "Step 7: FTP server accepts the client connection.";

}


// ============================================================
// STEP 8 — FTP FILE TRANSFER
// ============================================================

function stepEight() {

    log(
        "STEP 8: FTP file transfer",
        "info"
    );

    log(
        "Client requests:"
    );

    log(
        "network-report.pdf"
    );

    log(
        "File size: 2.4 MB"
    );

    log(
        "FTP server starts transfer."
    );


    updatePacket(

        server.ip,

        "FTP",

        "TCP",

        client.ip,

        21,

        "TRANSFER"

    );


    document.getElementById("ftpStatus")
        .textContent =
        "Transferred successfully";


    stepText.textContent =
        "Step 8: FTP successfully transfers the file.";

}


// ============================================================
// STEP 9 — SERVICES
// ============================================================

function stepNine() {

    log(
        "STEP 9: Network services verified",
        "info"
    );

    log(
        "DNS service: RUNNING",
        "success"
    );

    log(
        "HTTP service: RUNNING",
        "success"
    );

    log(
        "FTP service: RUNNING",
        "success"
    );

    log(
        "All client-server services are operational.",
        "success"
    );


    stepText.textContent =
        "Step 9: DNS, HTTP and FTP services are operational.";

}


// ============================================================
// STEP 10 — FINAL TEST
// ============================================================

function stepTen() {

    log(
        "STEP 10: Client-server connectivity test",
        "info"
    );

    log(
        `Pinging server ${server.ip}...`
    );

    log(
        `Reply from ${server.ip}: bytes=32 time<1ms TTL=64`,
        "success"
    );

    log(
        "DNS resolution: SUCCESS",
        "success"
    );

    log(
        "HTTP connection: SUCCESS",
        "success"
    );

    log(
        "FTP connection: SUCCESS",
        "success"
    );

    log(
        "Client-server network test completed.",
        "success"
    );


    const connectivity =
        document.getElementById("connectivity");


    connectivity.classList.add("success");


    connectivity.innerHTML = `

        Server:
        ${server.ip}

        <br><br>

        DNS:
        www.network.local →
        ${server.ip}

        <br>

        HTTP:
        Port 80 → 200 OK

        <br>

        FTP:
        Port 21 → File transferred

        <br><br>

        Ping:
        Reply received

        <br><br>

        <strong>
        Result: SUCCESS
        </strong>

    `;


    passTest("test1");

    passTest("test2");

    passTest("test3");

    passTest("test4");

    passTest("test5");


    log(
        "==================================================",
        "success"
    );

    log(
        "CLIENT-SERVER NETWORK TEST PASSED",
        "success"
    );


    stepText.textContent =
        "Client-server simulation completed successfully.";

}


// ============================================================
// PASS TEST
// ============================================================

function passTest(id) {

    const element =
        document.getElementById(id);

    element.textContent =
        "PASS";

    element.classList.add("pass");

}


// ============================================================
// EXECUTE STEP
// ============================================================

function executeStep() {

    currentStep++;

    updateProgress();


    switch (currentStep) {

        case 1:
            stepOne();
            break;

        case 2:
            stepTwo();
            break;

        case 3:
            stepThree();
            break;

        case 4:
            stepFour();
            break;

        case 5:
            stepFive();
            break;

        case 6:
            stepSix();
            break;

        case 7:
            stepSeven();
            break;

        case 8:
            stepEight();
            break;

        case 9:
            stepNine();
            break;

        case 10:
            stepTen();
            break;

    }

}


// ============================================================
// START SIMULATION
// ============================================================

function startSimulation() {

    if (started) {

        return;

    }


    started = true;


    consoleBox.innerHTML = "";


    log(
        "Starting client-server simulation...",
        "info"
    );

    log(
        "Topology: Client -> Switch -> Server",
        "info"
    );

    log(
        "Services: DNS / HTTP / FTP",
        "info"
    );


    executeStep();

}


// ============================================================
// NEXT STEP
// ============================================================

function nextStep() {

    if (!started) {

        startSimulation();

        return;

    }


    if (currentStep < totalSteps) {

        executeStep();

    }

}


// ============================================================
// RESET
// ============================================================

function resetSimulation() {

    currentStep = 0;

    started = false;


    consoleBox.innerHTML = `

        <div>
            Client-server simulator ready...
        </div>

        <div>
            Click "Start Simulation" to begin.
        </div>

    `;


    progress.style.width =
        "0%";


    stepText.textContent =
        "Ready to start client-server simulation.";


    updatePacket(

        "--",
        "--",
        "--",
        "--",
        "--",
        "--"

    );


    document.getElementById("line1")
        .classList.remove("active");


    document.getElementById("line2")
        .classList.remove("active");


    document.getElementById("webPage")
        .innerHTML = `

        <h2>
            Network Web Server
        </h2>

        <p>
            Waiting for HTTP request...
        </p>

    `;


    document.getElementById("ftpStatus")
        .textContent =
        "Waiting";


    const connectivity =
        document.getElementById("connectivity");

    connectivity.classList.remove("success");

    connectivity.textContent =
        "Waiting for simulation...";


    for (let i = 1; i <= 5; i++) {

        const test =
            document.getElementById("test" + i);

        test.textContent =
            "WAITING";

        test.classList.remove("pass");

    }

}