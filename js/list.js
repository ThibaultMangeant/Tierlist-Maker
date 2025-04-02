// Récupérer le token depuis sessionStorage (ou localStorage selon votre implémentation)
const token = sessionStorage.getItem('token');
const tierlistContainer = document.getElementById('tierlist-container');

function addTierList(tierList)
{
	const tierListItem = document.createElement('a');
	tierListItem.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
	tierListItem.href = `index.html?id=${tierList._id}`;
	tierListItem.innerHTML = `${tierList.name} <i class="fa fa-chevron-right"></i>`;
	tierlistContainer.appendChild(tierListItem);
}

// Fonction pour récupérer et afficher la liste des tier-lists
async function loadTierLists()
{
	try
	{
		const response = await fetch('http://localhost:5000/api/tierlists',
			{
			method: 'GET',
			headers:
			{
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		if (response.ok)
			{
			const tierLists = await response.json();

			// Si aucune tier-list n'est trouvée
			if (tierLists.length === 0)
				{
				tierlistContainer.innerHTML = '<p>Aucune tier list disponible.</p>';
				return;
			}

			// Ajouter les tier-lists à la page
			tierLists.forEach(tierList =>
				{
				addTierList(tierList);
			});
		} else
		{
			console.error('Erreur lors de la récupération des tier-lists');
			tierlistContainer.innerHTML = '<p>Erreur lors du chargement des tier lists.</p>';
		}
	} catch (error)
	{
		console.error('Erreur réseau', error);
		tierlistContainer.innerHTML = '<p>Erreur de connexion au serveur.</p>';
	}
}



// Appeler la fonction pour charger les tier-lists dès le chargement de la page
document.addEventListener('DOMContentLoaded', loadTierLists);

// Gestion de la soumission du formulaire pour créer une nouvelle tier-list
document.getElementById("newTierForm").addEventListener("submit", async function (event)
{
	event.preventDefault();
	const tierName = document.getElementById("tierName").value.trim();

	if (tierName === "")
		{
		alert("Veuillez entrer un nom pour la Tier List.");
		return;
	}

	const newTierList =
	{
		name: tierName,
		tiers: [
			{ name: 'Incontournable', color: '#FF8C42', items: [] },
			{ name: 'Moyenne', color: '#EFBF3E', items: [] },
			{ name: 'Passable', color: '#C2C236', items: [] },
			{ name: 'Médiocre', color: '#6FBF73', items: [] },
			{ name: 'Catastrophique', color: '#4E9A51', items: [] }
		],
		items: []
	};

	try
	{
		const response = await fetch('http://localhost:5000/api/tierlist',
		{
			method: 'POST',
			headers:
			{
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTierList)
		});

		if (response.ok)
		{
			const data = await response.json();
			alert("Tier List créée avec succès : " + data.name);
			document.getElementById("newTierForm").reset();
			new bootstrap.Modal(document.getElementById("newModal")).hide();
			addTierList(data)
		}
		else
		{
			console.error('Erreur lors de la création de la tier-list');
			alert("Erreur lors de la création de la tier-list.");
		}
	}
	catch (error)
	{
		console.error('Erreur réseau', error);
		alert("Erreur de connexion au serveur.");
	}
});