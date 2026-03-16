async function runNEXES() {
    const name = document.getElementById("projectName").value;
    const storyBox = document.getElementById("storyOutput");
    const canvas = document.getElementById("gameCanvas");
    // Optimized Prompt for Commercial Value
    const promptText = `Act as a Senior Game Designer. For the concept "${userPrompt}", generate:
1. Unique Game Title
2. Core Mechanics (3 points)
3. Unique Selling Feature (USF)
4. Monetization Strategy (How to make money from this game)`;

    // Intha output-ah namma Dashboard-la "Market Analysis" section-la kaatalaam.
    const templates = [
        { name: "Fantasy RPG", locked: false },
        { name: "Space Shooter", locked: false },
        { name: "Cyberpunk Racer", locked: true }, // Locked for Free users
        // ... total 10
    ];

    function renderTemplates() {
        templates.map(t => {
            const lockIcon = t.locked ? "🔒" : "✅";
            // Create card with lock icon
        });
    }

    if (!name) {
        alert("Vinu, first project name poodu!");
        return;
    }

    storyBox.innerText = "NEXES AI is thinking... 🧠";
    console.log("Starting generation for:", name);

    try {
        // 1. SIMULATE AI (Since Gemini might be slow, let's show instant result first)
        const mockStory = `In the year 2050, ${name} begins. You must survive the void!`;
        storyBox.innerText = mockStory;

        // 2. SHOW SIMULATION
        canvas.style.display = "block";
        startCanvasAnimation();

        // 3. SAVE TO SPRING BOOT (8081)
        const response = await fetch('http://localhost:8081/api/games/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                genre: "AI Generated",
                generatedCode: mockStory
            })
        });

        if (response.ok) {
            console.log("Saved to Vault!");
        }
    } catch (err) {
        console.error("Error:", err);
        storyBox.innerText = "Error: Backend connect aagala! Terminal check pannunga.";
    }
}

function startCanvasAnimation() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let x = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#10b981";
        ctx.fillRect(x % canvas.width, 80, 40, 40); // Moving square
        x += 5;
        requestAnimationFrame(animate);
    }
    animate();

    let isProMember = false;

    const templates = [
        { id: 1, name: "2D Platformer", status: "Free" },
        { id: 2, name: "RPG Quest", status: "Free" },
        { id: 3, name: "Space Survival", status: "Pro" },
        { id: 4, name: "Battle Royale", status: "Pro" }
    ];

    function renderTemplates() {
        const grid = document.getElementById('vaultGrid');
        grid.innerHTML = templates.map(t => `
        <div class="template-card ${t.status === 'Pro' && !isProMember ? 'locked' : ''}">
            <h4>${t.name}</h4>
            <p>${t.status}</p>
            ${t.status === 'Pro' && !isProMember ? '<button onclick="openSubModal()">Unlock with Pro</button>' : '<button>Build Now</button>'}
        </div>
    `).join('');
    }
    let userStatus = "FREE"; // Initial status

    // 1. PROJECT VAULT - Fetch from Spring Boot 8081
    async function refreshVault() {
        try {
            const response = await fetch('http://localhost:8081/api/games/all');
            const projects = await response.json();
            const grid = document.getElementById("vaultGrid");

            grid.innerHTML = projects.map(p => `
            <div class="card project-card">
                <h4>${p.name}</h4>
                <p>Genre: ${p.genre}</p>
                <button onclick="viewProject(${p.id})">Open Logic</button>
            </div>
        `).join('');
        } catch (e) { console.log("Vault empty or Backend offline"); }
    }

    // 2. SUBSCRIPTION LOGIC
    function simulatePayment() {
        alert("Processing Secure Payment... 💳");
        setTimeout(() => {
            userStatus = "PRO";
            document.getElementById("userBadge").innerText = "PRO MEMBER 👑";
            document.getElementById("userBadge").style.color = "#10b981";
            alert("Welcome to NEXES PRO, Vinu! All templates unlocked.");
            closeSubModal();
            renderTemplates(); // Refresh templates to remove locks
        }, 2000);
    }

    // 3. AI LOGIC GENERATOR (Enhanced)
    async function generateCommercialGame() {
        const prompt = document.getElementById("aiPrompt").value;
        if (!prompt) return alert("Enter a concept first!");

        // Simulation of detailed AI response
        const features = [
            "Dynamic Physics Engine",
            "Procedural Level Generation",
            "AI-Driven NPC Behavior"
        ];

        document.getElementById("aiResponse").innerHTML = `
        <div class="pro-output">
            <p><strong>Mechanics:</strong> ${features.join(", ")}</p>
            <p><strong>Unique Feature:</strong> Neural-link storytelling</p>
        </div>
    `;
        startCanvasAnimation(); // Start the visual preview
    }
    // The Matrix Decryptor Logic
    function decryptText(elementId, targetText) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
        const element = document.getElementById(elementId);
        let iteration = 0;

        const interval = setInterval(() => {
            element.innerText = targetText.split("")
                .map((char, index) => {
                    if (index < iteration) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= targetText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Speed of decryption
        }, 30);
    }
    async function handleGenerate() {
        const prompt = document.getElementById('aiInput').value;
        if (!prompt) return;

        // 1. Show Loading State
        const storyBox = document.getElementById('aiResponse');
        storyBox.innerHTML = "<p class='neon-text animate-pulse'>DECRYPTING NEURAL DATA...</p>";

        // 2. Fetch from Gemini (Simulated or Real)
        const aiStory = `MISSION: ${prompt.toUpperCase()}. OBJECTIVE: Survival in the deep void. MECHANICS: Gravity manipulation and oxygen management enabled.`;

        // 3. Start Matrix Animation
        decryptText('aiResponse', aiStory);

        // 4. Start Canvas Simulation
        startVisuals();

        // 5. Save to Local Backend (8081)
        fetch('http://localhost:8081/api/games/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: prompt, genre: "AI-Gen", generatedCode: aiStory })
        });
    }

    function nav(sectionId) {
        // Ella section-aiyum hide pannu
        document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));

        // Select panna section-ah mattum kaattu
        document.getElementById(sectionId).classList.remove('hidden');

        // Oru vela vault-ku pona, database-la irundhu data fetch pannu
        if (sectionId === 'vault') {
            loadVaultFromH2();
        }
    }

    function handleGenerate() {
        const prompt = document.getElementById('aiInput').value;
        if (!prompt) return;

        // 1. Matrix Animation for Log
        decrypt('matrixLog', `BUILDING ENGINE FOR: ${prompt.toUpperCase()}... DEPLOYING TO LIVE CANVAS.`);

        // 2. Real-Time Canvas Preview
        const canvas = document.getElementById('liveViz');
        const ctx = canvas.getContext('2d');
        let x = 0;
        let y = 100;

        function runPreview() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a "Player" (Neon Box)
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#10b981";
            ctx.fillStyle = "#10b981";
            ctx.fillRect(x % canvas.width, y, 30, 30);

            x += 5; // Simulating movement
            requestAnimationFrame(runPreview);
        }
        runPreview();

        // 3. Save to Backend (Spring Boot 8081)
        fetch('http://localhost:8081/api/games/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: prompt, genre: "AI-Gen", generatedCode: "HTML5 Canvas Code Build" })
        });
    }
    // loadV() function-la indha dynamic HTML-ah update pannunga
    async function loadV() {
        const res = await fetch('http://localhost:8081/api/games/all');
        const data = await res.json();

        document.getElementById('vault').innerHTML = data.map(g => `
        <div class="glass p-8 rounded-3xl border border-slate-800 hover:neon-glow transition group relative">
            <h4 class="text-xl font-bold text-white">${g.name}</h4>
            <p class="text-[10px] text-emerald-500 mt-2 font-mono">NEX-ID: 0x0${g.id}</p>
            
            <button onclick="deleteProject(${g.id})" 
                class="mt-6 w-full py-2 bg-red-900/20 text-red-500 border border-red-900/50 rounded-xl text-[10px] font-bold hover:bg-red-500 hover:text-white transition">
                WIPE PROJECT 🗑️
            </button>
        </div>
    `).join('');

        document.getElementById('vCount').innerText = data.length;
    }

    // DELETE FUNCTION
    async function deleteProject(id) {
        if (confirm("Vinu, confirm-ah wipe pannidalaama?")) {
            await fetch(`http://localhost:8081/api/games/delete/${id}`, { method: 'DELETE' });
            loadV(); // Refresh the list
        }
    }
    const TEMPLATES = [
        { name: "Flappy Bird", prompt: "A 2D flappy bird clone with neon green pipes and gravity physics." },
        { name: "Space Shooter", prompt: "A top-down space shooter where you destroy neon asteroids with lasers." },
        { name: "Neon Runner", prompt: "A side-scrolling endless runner with procedural obstacles." },
        { name: "Matrix Puzzle", prompt: "A falling block puzzle game with matrix-style digital rain effect." },
        { name: "Racer AI", prompt: "A simple top-down car racing game with time trial mode." },
        { name: "Snake Pro", prompt: "Classic snake game but with glowing neon trails and speed powerups." }
    ];

    function loadTemplates() {
        const grid = document.getElementById('temp');
        grid.innerHTML = TEMPLATES.map(t => `
        <div class="glass p-8 rounded-[32px] border border-slate-800 hover:border-emerald-500 transition-all group cursor-pointer" 
             onclick="useTemplate('${t.prompt}')">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">🎮</div>
            <h4 class="text-xl font-bold text-white mb-2">${t.name}</h4>
            <p class="text-[10px] text-slate-500 mb-6 uppercase tracking-widest">Ready to Deploy</p>
            <button class="w-full py-3 bg-slate-900 rounded-xl text-[10px] font-black group-hover:bg-emerald-500 group-hover:text-black transition">ACTIVATE TEMPLATE</button>
        </div>
    `).join('');
    }

    function useTemplate(promptText) {
        nav('gen'); // Go to Generate section
        document.getElementById('aiInput').value = promptText;
        processAI(); // Automatically trigger the preview
    }

    function processAI() {
        const p = document.getElementById('aiInput').value;
        decrypt('matrixLog', `UPLINK ESTABLISHED. CORE_TYPE: ${p.includes('Space') ? 'COSMOS_ENGINE' : 'ARCADE_CORE'}. SYNCING...`);

        const canvas = document.getElementById('liveViz');
        const ctx = canvas.getContext('2d');
        let frame = 0;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#10b981";

            if (p.includes('Space')) {
                // Draw Starfield
                ctx.fillStyle = "white";
                for (let i = 0; i < 10; i++) ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
            }

            ctx.fillStyle = "#10b981";
            ctx.fillRect((frame += 2) % canvas.width, 100, 30, 30);

            requestAnimationFrame(animate);
        }
        animate();
    }
}