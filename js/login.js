document.addEventListener("DOMContentLoaded", () =>
{
	const form = document.querySelector("form");
	const errorMessage = document.getElementById("error-message");


	
	form.addEventListener("submit", async (event) =>
	{
		event.preventDefault(); // Empêche le rechargement de la page


		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;


		try
		{
			const response = await fetch("http://localhost:5000/api/users/login",
			{
				method: "POST", // Doit être la même que celle demandé par l'API
				headers:
				{
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password }) // Ce qui est envoyé à l'API
			});

			const data = await response.json();

			if (response.ok)
			{
				sessionStorage.setItem("token", data.token);
				window.location.href = "../index.html"; // Redirige vers la tier-list ou une autre page
			}
			else
			{
				errorMessage.textContent = "Identifiants invalides !";
				errorMessage.classList.remove("d-none");
			}
		}
		catch (error)
		{
			errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
			errorMessage.classList.remove("d-none");
		}
	});
});