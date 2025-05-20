let dataShow = document.getElementById("dataShow");
let imgPath="https://image.tmdb.org/t/p/w500";

//APIs
let nowURL="https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let popularURL ="https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let topratedURL ="https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let trendingURL= 'https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
let upcomingURL="https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";

$(window).on('load',()=>{
    $('.navbar .list').show();
    getFilmsNow();
    closeMenu();
});

$('.menu').click(()=>{
    openMenu();
});

$('.close').click(()=>{
    closeMenu()
});

function openMenu(){
    $('.menu').hide(()=>{
        $('.close').show();
    });
    $(".navbar").animate({"left" : "0px"},1000);
    $('.navbar .list').slideDown(2000);
};

function closeMenu(){
    let hiddenWidth = $('.hiddenNavbar').outerWidth(true);

    $('.close').hide(()=>{
        $('.menu').show();
    });
    $('.navbar').animate({"left" : `-${hiddenWidth}`},1000);
    $('.navbar .list').slideUp(2000);
};

//Search Section
let nameSearch = document.getElementById("wordSearch"); 
let letterSearch = document.getElementById("letterSearch"); 

async function getFilmsByWord(word){
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`);
    let finalResponse = await response.json();
    let currentResponse = finalResponse.results;

    displayFilms(currentResponse);
}

function searchByWord(){
    nameSearch.addEventListener("input", ()=>{
        let nameSearchValue = nameSearch.value;
 
        getFilmsByWord(nameSearchValue)
    })
}

function SearchByLetter(){
    letterSearch.addEventListener("input", ()=>{
        let letterSearchValue = letterSearch.value;
 
        getFilmsByWord(letterSearchValue)
    })
}

searchByWord();
SearchByLetter();

//Now Playing Click
$('.nowPlaying').click(()=>{
    getFilmsNow();
})

//API For NowPlaying
async function getFilmsNow(){
    let response = await fetch(nowURL);
    let finalResponse = await response.json();
    let currentResponse = finalResponse.results;

    displayFilms(currentResponse);
}

function displayFilms(currentResponse){
    film = "";

    for(i = 0; i <= currentResponse.length; i++){
        film += `<div class="col-md-6 col-lg-4 card g-4 bg-transparent border-0">
        <div class="special position-relative">
            <img src="https://image.tmdb.org/t/p/w500${currentResponse[i].poster_path}" class="w-100 rounded-3">
            <div class="overLay position-absolute px-2 rounded-3 d-flex flex-column justify-content-center align-items-center">
                <h3>${currentResponse[i].original_title}</h3>
                <p class="fs-5">${currentResponse[i].overview}</p>
                <p class="fs-5">rate: ${currentResponse[i].vote_average}</p>
                <p class="fs-5">${currentResponse[i].release_date}</p>
            </div>
        </div>
    </div>`

    dataShow.innerHTML = film;
    }
}


//Popular Click
$('.Popular').click(()=>{
    getPopular();
})
//API For Popular
async function getPopular(){
    let response = await fetch(popularURL);
    let finalResponse = await response.json();
    let currentResponse = finalResponse.results;

    console.log(currentResponse);

    displayFilms(currentResponse);
}


//Top Rated Click
$('.topRated').click(()=>{
    getTopRated();
})
//API For Top Rated
async function getTopRated(){
    let response = await fetch(topratedURL);
    let finalResponse = await response.json();
    let currentResponse = finalResponse.results;

    displayFilms(currentResponse);
}

//Trending click
$('.trending').click(()=>{
    getTrending();
})
//API For Trending
async function getTrending(){
    let response = await fetch(trendingURL);
    let finalResponse = await response.json();
    let currentResponse = finalResponse.results;

    displayFilms(currentResponse);
}


//UpComing click
$('.upcoming').click(()=>{
  getUpcoming();
})
//API For Upcoming
async function getUpcoming(){
    let response = await fetch(upcomingURL);
    let finalResponse = await response.json();
    let currentResponse = finalResponse.results;

    displayFilms(currentResponse);
}


(async function() {
    await getFilmsNow();
    await getPopular();
    await getTopRated();
    await getTrending();
    await getUpcoming();
    await getFilmsLatest();
    await getFilmsByWord(nameSearch.value);
})();



//Form Section
let userName = document.getElementById("nameInput");
let userMail = document.getElementById("mailInput");
let userPhone = document.getElementById("phoneInput");
let userAge = document.getElementById("ageInput");
let userPassword = document.getElementById("passInput");
let userRePassword = document.getElementById("repassInput");

//Regex For Name Input
userName.addEventListener("keyup", nameValidation);

function nameValidation(){
    let nameRegex = /^[A-Za-z0-9]/;

    if(nameRegex.test(userName.value)) {
        $('.nameAlert').css({"display" : "none"});
        return true;
    }else {
        $('.nameAlert').css({"display" : "block"});
        return false;
    }
};

//Regex For Email Input
userMail.addEventListener("keyup", mailValidation);

function mailValidation(){
    let mailRegex = /^[A-za-z]{3,}[\._][a-z0-9]{3,}@[a-z]{3,8}\.com$/; 
        
    if(mailRegex.test(userMail.value)) {
        $('.mailAlert').css({"display" : "none"}); 
        return true;
    }else {
        $('.mailAlert').css({"display" : "block"}); 
        return false;
    }
};

//Regex For Phone Input
userPhone.addEventListener("keyup", phoneValidation);

function phoneValidation(){
    let phoneRegex = /^(002)?01[0125][0-9]{8}$/; 

    if(phoneRegex.test(userPhone.value)) {
        $('.phoneAlert').css({"display" : "none"});
        return true;
    }else {
        $('.phoneAlert').css({"display" : "block"});
        return false;
    }
};

//Regex For Age Input
userAge.addEventListener("keyup", ageValidation);

function ageValidation(){
    let ageRegex = /^[0-9]{2,3}$/;

    if(ageRegex.test(userAge.value)) {
        $('.ageAlert').css({"display" : "none"});
        return true;
    }else {
        $('.ageAlert').css({"display" : "block"});
        return false;
    }
};

//Regex For Password Input
userPassword.addEventListener("keyup",passwordValidation);

function passwordValidation(){
    let passRegex = /[A-Z]{1,}[A-Za-z]{8,}[0-9]{1,}/; 

    if(passRegex.test(userPassword.value)) {  
        $('.passAlert').css({"display" : "none"});
        return true;
        }else {
        $('.passAlert').css({"display" : "block"});
        return false;
        }
};

//Validation For Repassword
userRePassword.addEventListener("keyup", repasswordValidation);

function repasswordValidation(){
    if(userPassword.value == userRePassword.value) {
        $('.repassAlert').css({"display" : "none"});
        return true;
        }else {
        $('.repassAlert').css({"display" : "block"});
        return false;
        }
};
    
//Validation For Submit 
document.getElementById("contactUs").addEventListener("click",function(){
    if(nameValidation() && mailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) { 
        document.getElementById("submitBtn").disabled= false
    }
    else {
        document.getElementById("submitBtn").disabled= true
    }   
});


