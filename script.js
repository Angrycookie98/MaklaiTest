document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('api_form').addEventListener('submit', function(event){
        event.preventDefault();
        let date_from = document.getElementById('from_date').value;
        let date_to = document.getElementById('to_date').value;
        sendAPI(date_from, date_to);
    })
});

function sendAPI(date_from, date_to){
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `https://fakerapi.it/api/v1/persons?_birthday_start=${date_from}&_birthday_end=${date_to}`);
    httpRequest.onreadystatechange = returnAnswer;
    httpRequest.send();

    function returnAnswer(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let personsData = JSON.parse(httpRequest.responseText)['data'];
                let personsDom = '';
                for (let personData of personsData){
                    personsDom += getPersonDom(personData);
                }
                document.getElementById('person_cards_block').innerHTML = personsDom;
                console.log(personsData);
            } else {
                console.warn("There was a problem with the request.");
            }
        }
    }
}

function getPersonDom(personData){
    return `<div class="person_card mt-4 mt-lg-3">
        <div class="person_card_title font_family_merriweather">
            <span class="fw-700" title="${personData['firstname']} ${personData['lastname']}">${personData['firstname']} ${personData['lastname']}</span>
        </div>
        <div class="person_card_mail d-flex mt-3 align-items-center">
            <img src="./img/message.svg" class="person_icon">
            <span class="ml-1" title="${personData['email']}">${personData['email']}</span>
        </div>
        <div class="person_card_phone d-flex mt-2 align-items-center">
            <img src="./img/phone.svg" class="person_icon">
            <span class="ml-1" title="${personData['phone']}">${personData['phone']}</span>
        </div>
        <div class="person_card_birthday d-flex mt-2 align-items-center">
            <img src="./img/birthday-cake.svg" class="person_icon">
            <span class="ml-1" title="${personData['birthday']}">${personData['birthday']}</span>
        </div>
        <div class="person_card_gender d-flex mt-2 align-items-center">
            <img src="./img/${(personData['gender'] === 'female') ? 'female' : 'male'}.svg" class="person_icon">
            <span class="ml-1" title="${personData['gender']}">${personData['gender']}</span>
        </div>
        <div class="person_card_site d-flex mt-2 align-items-center">
            <img src="./img/site.svg" class="person_icon">
            <span class="ml-1" title="${personData['website']}">${personData['website']}</span>
        </div>
    </div>`;
}