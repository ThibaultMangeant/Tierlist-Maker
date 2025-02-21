let otherItems = [
    { id: 4, text: "Java" },
    { id: 5, text: "Bash" },
    { id: 6, text: "C" }
];

function createItemElement(item)
{
	const itemElement = `
	<div class="item" draggable="true" data-id="${item.id}">
		<span class="item-text">${item.text}</span>
	</div>`;

	return itemElement;
}

function renderItems()
{
	const items = document.getElementById('items-list');
	items.innerHTML = "";

	for (let item of otherItems)
	{
		items.innerHTML += createItemElement(item);
	}

	renderDrag();
}

function addItem()
{
	newItem = window.prompt("Ajouter un item");

	otherItems.push({ id: otherItems.length, text: newItem });

	renderItems();
}