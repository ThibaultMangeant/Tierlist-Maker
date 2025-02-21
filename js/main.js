document.addEventListener("DOMContentLoaded", renderTiers);
document.addEventListener("DOMContentLoaded", renderItems);
document.addEventListener("DOMContentLoaded", renderDrag );

const tiers = document.getElementById("tiers-container");
tiers.addEventListener("click", (event) =>
{
	const index = event.target.parentElement.parentElement.dataset.index;

	// Lors du clic sur le bouton flèche vers le haut
	if (event.target.classList.contains("move-up"))
		moveTier(index - 1, "up");

	// Lors du clic sur le bouton flèche vers le bas
	if (event.target.classList.contains("move-down"))
		moveTier(index - 1, "down");

	// // Lors du clic sur le bouton de suppression
	// if (event.target.classList.contains("delete-tier"))
	// {
	// 	if (window.confirm("Voulez-vous vraiment supprimer ce tier ?"))
	// 		deleteTier(index);
	// }

	// Lors du clic sur le titre du tier
	if (event.target.classList.contains("tier-title"))
		editTitle(index, event.target.parentElement.parentElement);
});

// Lors de la perte de focus sur le champ d'édition du titre
tiers.addEventListener("focusout", (event) =>
{
	if (event.target.classList.contains("tier-title"))
		showTitle(event.target.parentElement.parentElement);
});


const addItemButton = document.getElementById("add-item-btn");
addItemButton.addEventListener("click", addItem);
addItemButton.addEventListener("click", renderDrag);