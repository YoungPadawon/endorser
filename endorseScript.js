var profileURLS = [];

//After the DOM is loaded.
window.onload = function () {  
    

	setInterval(function(){

        console.log("--the heist--");


		//Get profile urls
		chrome.storage.sync.get(['profileURLS'], function(items) {
	      	profileURLS = items.profileURLS;

	      	console.log(profileURLS)

	      	//check which page we are on
			if(window.location.href.includes("people")){

				//grab the urls and store to the profile urls
				var elementList = document.querySelectorAll(".search-result__result-link");

				var urls = []
				elementList.forEach(function(element){
					urls.push(element.href)
					console.log(element.href)
				})

				chrome.storage.sync.set({'profileURLS':urls}, function() {
				    console.log('Settings saved');
				});

				redirectNextProfile(elementList[0])

			} else {

				//time to endorse!!

				setInterval(function(){

			        try {
					    // some code
				        //Endorse For all
				        endorse()
					} catch (e) {
					    // This here can be empty
					}

					//Check profileURLS size
					if(profileURLS.length == 0) {
						//Add some more profile urls

						//Get urls page
						chrome.storage.sync.get(['count'], function(items) {
					      	console.log('Settings retrieved', items);
					      	index = items.count;

					      	//store new count
					      	// Save it using the Chrome extension storage API.
						  	chrome.storage.sync.set({'count':(index + 1)}, function() {
						      console.log('Settings saved');
						  	});


							redirectNextProfile("https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%5D&origin=MEMBER_PROFILE_CANNED_SEARCH&page=" + index)

					    });

					} else {

						profileURLS.shift()


						chrome.storage.sync.set({'profileURLS':(profileURLS)}, function() {
						console.log('Settings saved');
						});


						redirectNextProfile(profileURLS[0])

					}




				   }, 15000); 


			}




			


	    });

  }, 10000); 
       
} 

function goEndorse(){

}


function redirectNextProfile(url){ 
    window.location= url;
}


//Click Endorse
function click(el) {
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent(
		"click",
		true /* bubble */ , true /* cancelable */ ,
		window, null,
		0, 0, 0, 0, /* coordinates */
		false, false, false, false, /* modifier keys */
		0 /*left*/ , null
	);
	el.dispatchEvent(ev);
}


//do work on page
function endorse(){
	var expand = document.querySelector(".pv-skills-section__additional-skills");
	click(expand);

	var elementList = document.querySelectorAll(".pv-skill-entity__featured-endorse-button-shared");
	elementList.forEach(function(element){
		if(!element.textContent.includes("Remove")){
			click(element);

		}
	})
}
