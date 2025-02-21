let initTiers = [
    { id: 1, name: 'Incontournable', color: '#FF8C42', items: [{ id: 1, text: "PHP" }, { id: 4, text: "SQL" }] },
    { id: 2, name: 'Moyenne', color: '#EFBF3E', items: [{ id: 2, text: "Javascript" }] },
    { id: 3, name: 'Passable', color: '#C2C236', items: [] },
    { id: 4, name: 'Médiocre', color: '#6FBF73', items: [] },
    { id: 5, name: 'Catastrophique', color: '#4E9A51', items: [{ id: 3, text: "CSS" }] }
];



function renderTiers()
{
	const tiers = document.getElementById('tiers-container');
	tiers.innerHTML = "";

	for (let tier of initTiers)
	{
		let categorie = `
		<div class="row align-items-center tier-row" data-index="${tier.id}">
			<div class="col-2 text-center p-2" style="background: ${tier.color}">
				<h3 class="tier-title">${tier.name}</h3>
			</div>
			<div class="col-7 tier-content d-flex flex-wrap gap-2 p-2">`;
			
		for (let item of tier.items)
		{
			categorie += createItemElement(item);
		}

		categorie += `
			</div>
			<div class="col-3 actions text-center">
				<button class="btn move-up"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
				<button class="btn move-down"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
				<button class="btn delete-tier"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
		</div>`;

		tiers.innerHTML += categorie;
	}
}

// function deleteTier(index)
// {
// 	initTiers = initTiers.filter(tier => tier.id != index);
// 	renderTiers();
// 	renderItems();
// 	renderDrag();
// }

function moveTier(index, direction)
{
	let temp = initTiers[index];

	let newIndex = (direction === 'up') ? index - 1 : index + 1;
	
	if (newIndex >= 0 && newIndex < initTiers.length)
	{
		initTiers[index] = initTiers[newIndex];
		initTiers[newIndex] = temp;
	}

	initTiers.forEach((tier, cpt) =>
	{
		tier.id = cpt + 1;
	});

	renderTiers();
}

function editTitle(index, element)
{
	const h3Element = element.querySelector('.tier-title');

	const inputElement = document.createElement("input");
	inputElement.type = "text";
	inputElement.classList.add("tier-title");

	h3Element.replaceWith(inputElement);

	inputElement.focus();
}

function showTitle(element)
{
	const inputElement = element.querySelector('.tier-title');
	const h3Element = document.createElement("h3");

	h3Element.innerText = inputElement.value;
	h3Element.classList.add("tier-title");

	inputElement.replaceWith(h3Element);
}