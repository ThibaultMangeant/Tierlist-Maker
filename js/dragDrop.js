async function fetchDragDropItem(itemId, tierId)
{
	try
	{
		const response = await fetch('http://localhost:5000/api/tierlist/' + idTierlist + '/move-item-to-tier',
		{
			method: "PUT",
			headers:
			{
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"itemId": itemId,
				"tierId": tierId
			})
		});

		const data = await response.json();

		if (response.ok)
		{
			console.log(data);
			console.log("Item déplacé avec succès");
		}
		else
		{
			console.log("Erreur lors du déplacement de l'item");
		}
	}
	catch (error)
	{
		console.log(error);
	}
}

function renderDrag()
{
	const draggable = document.querySelectorAll('.item');
	const droppable = document.querySelectorAll('.tier-content');

	draggable.forEach(element =>
	{
		element.addEventListener("dragstart", (event) =>
		{
			if (element.classList.contains("item"))
				event.dataTransfer.setData("text/plain", element.getAttribute("data-id"));
		});
	});

	droppable.forEach(element =>
	{
		element.addEventListener("dragover", (event) =>
		{
			event.preventDefault();
			if (element.classList.contains("tier-row"))
				element.classList.add("drag-over");
		});

		element.addEventListener("dragleave", () =>
		{
			if (element.classList.contains("tier-row"))
				element.classList.remove("drag-over");
		});

		element.addEventListener("drop", (event) =>
		{
			event.preventDefault();
			element.classList.remove("drag-over");

			const id = event.dataTransfer.getData('text/plain');
			const itemDrag = otherItems.find(item => item.id === parseInt(id));

			if (itemDrag)
			{
				// Récupérer le tier cible où l'élément est déplacé
				const tier = event.target.closest('.tier-row');
				const tierIndex = parseInt(tier.getAttribute('data-index')) - 1;
				const tierId = initTiers[tierIndex]._id;

				// Mise à jour des éléments dans les tiers (localement)
				initTiers[tierIndex].items.push(itemDrag);
				otherItems = otherItems.filter(item => item.id !== itemDrag.id);


				console.log(itemDrag);
				console.log(tierId);
				fetchDragDropItem(itemDrag._id, tierId);

				renderTiers();
			}
		});
	});
}