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
				const tier = event.target.closest('.tier-row');
				const indexTier = parseInt(tier.getAttribute('data-index')) - 1;

				initTiers[indexTier].items.push(itemDrag);
				otherItems = otherItems.filter(item => item.id !== itemDrag.id);

				renderTiers();
				renderItems();
				renderDrag();
			}
		});
	});
}