let otherItems = [
    { id: 4, text: "Java" },
    { id: 5, text: "Bash" },
    { id: 6, text: "C" }
];

async function fetchAddItem(newItem)
{
	try
	{
		const response = await fetch('http://localhost:5000/docs/#/api/item',
		{
			method: "POST",
			headers:
			{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ text: newItem })
		});
	}
	catch (error)
	{
		console.log(error);
	}
}

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

	fetchAddItem(newItem);

	renderItems();
}