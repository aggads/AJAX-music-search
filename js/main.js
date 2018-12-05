jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1170;
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile - open lateral menu clicking on the menu icon
	// $('.cd-nav-trigger').on('click', function(event){
	// 	event.preventDefault();
	// 	if( $('.cd-main-content').hasClass('nav-is-visible') ) {
	// 		closeNav();
	// 		$('.cd-overlay').removeClass('is-visible');
	// 	} else {
	// 		$(this).addClass('nav-is-visible');
	// 		$('.cd-main-header').addClass('nav-is-visible');
	// 		$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
	// 			$('body').addClass('overflow-hidden');
	// 		});
	// 		toggleSearch('close');
	// 		$('.cd-overlay').addClass('is-visible');
	// 	}
	// });



	//open search form
	$('.cd-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
		// hideSlide();
		// showSlide();
		



	});
// var testSlide = document.querySelector('.flexslider');

// function hideSlide() {
//     testSlide.style.visibility = "hidden";
// }



	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

	function closeNav() {
		$('.cd-nav-trigger').removeClass('nav-is-visible');
		$('.cd-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close search 
			$('.cd-search').removeClass('is-visible');	
			// showSlide();
			$('.cd-search-trigger').removeClass('search-is-visible');
			$('.cd-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.cd-search').toggleClass('is-visible');
			// hideSlide();
			$('.cd-search-trigger').toggleClass('search-is-visible');
			$('.cd-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
			($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window, 
		a = 'inner';
		if (!('innerWidth' in window )) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var navigation = $('.cd-nav');
		var desktop = checkWindowWidth();
		if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		} else {
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
		}
	}


// $('#recherche').autocomplete({
//     source : function(requete, reponse){
// 	$.ajax({
//             url : 'https://musicdemons.com/api/v1/artist/music',
//             type : "GET",
//             dataType : 'json',
//             data : {
//                 name_startsWith : $('#recherche').val(), 
//                 maxRows : 5
//             },

//             success : function(donnee){
//                 reponse($.map(donnee, function(objet){
//                     return objet.name; 
//                 }));
//             }
//         });
//     }

// });



});

//Toggle slide
$(document).ready(function(){
	$(".cd-search-trigger").click(function(){
		$(".flexslider").toggle();
	});
});



// function status(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(new Error(response.statusText))
//   }
// }

// function json(response) {
//   return response.json()
// }

// fetch('https://musicdemons.com/api/v1/artist')
//   .then(status)
//   .then(json)
//   .then(function(data) {
//     console.log('Request succeeded with JSON response', data);
//   }).catch(function(error) {
//     console.log('Request failed', error);
//   });






const api = 'https://musicdemons.com/api/v1/artist';
const input = document.querySelector('#recherche');
const search = document.querySelector('.search');
const container = document.querySelector('.w3-agile-sectn_search');
const artist = [];

function log(objet){
	var test = objet.value.toUpperCase();

}

fetch(api)
.then(response => response.json())
.then(response =>{
	var list;
	var log;
	for (i in response) {
        		// console.log(response[i].name);
        		if (input.value == response[i]){
        			log = response[i].name.toUpperCase();
        			list += ` <li> "${log}"</li>`;
        			document.querySelector("#results").innerHTML = list;

        		}
        		
        	}


        })


    // function Searching(word) {
    //     return artist.filter(artist => {
    //         const regex = new RegExp(word,'gi')
    //         return artist.name.match(regex);
    //     });
    // }

    // function EnableArray() {
    //     const matches = Searching(this.value);
    //     const html = matches.map(match => {
    //         return 

    //         // {% raw %}
    //         ` <p class="p-2 d-flex flex-column border-bottom">
    //                     <span><small>${match.name}</small><small class="float-right">From ${match.state}</small></span>
    //                     </p>
    //                     <hr>
    //                 `;
    //                 // {% endraw %};
    //     }).join('');
    //     search.innerHTML = html;
    // }

    // input.addEventListener('click',EnableArray);
    // input.addEventListener('keyup',EnableArray);

    // container.addEventListener('click',function() {
    //     search.innerHTML = ''
    // });