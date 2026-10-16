

const form = document.getElementById("joinForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const plan = document.getElementById("plan").value;

    try {
        const response = await fetch("/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, plan })
        });

        const result = await response.json();

        if (!response.ok) {
            message.textContent = result.message;
            return;
        }

        message.textContent = "Welcome " + name +
            "! Registration successful.";

        form.reset();
    } catch (error) {
        message.textContent =
            "Server connection failed. Please try again.";
    }
});

const viewButton = document.getElementById("viewMembers");
const memberList = document.getElementById("memberList");

viewButton.addEventListener("click", async function() {
    memberList.textContent = "Loading members...";

    try {
        const response = await fetch("/api/members");
        const members = await response.json();

        memberList.innerHTML = "";

        if (members.length === 0) {
            memberList.textContent = "No members registered yet.";
            return;
        }

        members.forEach(function(member) {
            const card = document.createElement("div");
            card.className = "plan";

            const name = document.createElement("h3");
            name.textContent = member.name;

            const email = document.createElement("p");
            email.textContent = member.email;

            const plan = document.createElement("p");
            plan.textContent = "Plan: " + member.plan;

            card.append(name, email, plan);
            memberList.appendChild(card);
        });
    } catch (error) {
        memberList.textContent =
            "Could not load members. Check if the server is running.";
    }
});
