async function buscarNFT(contractAddress, tokenId) {
    const imageContainer = document.getElementById('nftImageContainer');

    try {
        const response = await fetch('/getNFTUri', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.apiKey}`, // Utilizar la clave API desde las variables de entorno
                'x-application-vkn': window.appId // Utilizar el App ID desde las variables de entorno
            },
            body: JSON.stringify({ contractAddress, id: parseInt(tokenId) })
        });

        if (response.ok) {
            const data = await response.json();
            const imageUrl = data.uri.replace(/\/\d+\.json$/, '');
            const img = document.createElement('img');
            img.src = `${imageUrl}`;
            img.alt = 'NFT Image';
            imageContainer.appendChild(img);
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
}    