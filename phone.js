const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);

    const phoneContainer = document.getElementById("phone-container");

    phoneContainer.innerHTML = ``;

    const noPhone = document.getElementById("no-phone");
    const yourSearch = document.getElementById("your-search");
    const showAll = document.getElementById("show-all")

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");
    }

    if (phones.length === 0) {
        noPhone.classList.remove("d-none");
        yourSearch.classList.add("d-none");
    }
    else {
        noPhone.classList.add("d-none");
        yourSearch.classList.remove("d-none");
    }

    phones.forEach(phone => {
        const phoenDiv = document.createElement("div");
        phoenDiv.classList.add("col")

        phoenDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-5" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text"></p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#detailModal">
            See Details
            </button>
        </div>
        `

        phoneContainer.appendChild(phoenDiv);

    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value
    loadPhones(searchText, dataLimit);
}

const searchPhone = () => {
    processSearch(10);
}

const searchField = document.getElementById("search-field").addEventListener("keyup", function (i) {
    if (i.key === "Enter") {
        processSearch(10)
    }
})

const toggleSpinner = isLoading => {
    const loaderSpiner = document.getElementById("spiner");
    if (isLoading) {
        loaderSpiner.classList.remove("d-none");
    }
    else {
        loaderSpiner.classList.add("d-none");
    }
}

document.getElementById("btn-show-all").addEventListener("click", function () {
    processSearch();

    // ! this is problem
    const searchField = document.getElementById("search-field");
    searchField.value = "";
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    // console.log(phone);
    const modalTitle = document.getElementById("modal-label");
    const chipset = document.getElementById("chipset-text");
    const memory = document.getElementById("memory-text");
    const releaseDate = document.getElementById("release-text");

    modalTitle.innerText = phone.name;
    chipset.innerText = phone.mainFeatures.chipSet;
    memory.innerText = phone.mainFeatures.memory;
    releaseDate.innerText = phone.releaseDate ? phone.releaseDate : "No Release Date Found";
}

// loadPhones('apple');