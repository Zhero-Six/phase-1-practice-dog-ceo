// src/index.js

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Challenge 1: Fetch and display dog images
    function fetchImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = 'Dog image';
                    imageContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    // Challenge 2 & 4: Fetch and display dog breeds with filtering
    function fetchBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                renderBreeds(breeds);
                
                // Challenge 4: Add filter functionality
                breedDropdown.addEventListener('change', (e) => {
                    const selectedLetter = e.target.value;
                    const filteredBreeds = breeds.filter(breed => 
                        breed.startsWith(selectedLetter)
                    );
                    renderBreeds(filteredBreeds);
                });
            })
            .catch(error => console.error('Error fetching breeds:', error));
    }

    // Helper function to render breeds
    function renderBreeds(breeds) {
        breedList.innerHTML = ''; // Clear existing list
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            
            // Challenge 3: Add click behavior to change color
            li.addEventListener('click', () => {
                li.style.color = 'purple'; // You can choose any color
            });
            
            breedList.appendChild(li);
        });
    }

    // Initialize the application
    fetchImages();
    fetchBreeds();
});