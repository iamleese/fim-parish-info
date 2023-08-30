
import { newOLmap } from "../../src/ol_map";

document.addEventListener('DOMContentLoaded', function(event) {
	//tab click
	// store tabs variable
 var tabs = document.querySelectorAll(".popup_modal .tab");
 let i = 0;
 for (i = 0; i < tabs.length; i++) {
	 tabs[i].addEventListener("click", selectPane);
 }

 function selectPane(e) {

	 for (var i = 0; i < tabs.length; i++) {
		 tabs[i].classList.remove("active");
		 tabs[i].setAttribute('aria-selected','false');
	 }

	 var selectedTab = e.currentTarget;
	 selectedTab.classList.add("active");
	 selectedTab.setAttribute('aria-selected','true');
	 e.preventDefault();

	 var contentPanes = document.querySelectorAll(".tabcontent");

	 for (i = 0; i < contentPanes.length; i++) {
		 contentPanes[i].classList.remove("active");
		 contentPanes[i].setAttribute('aria-hidden','true');
	 }

	 var activePaneId = selectedTab.getAttribute("aria-controls");
	 var activePane = document.getElementById(activePaneId);
	 activePane.classList.add("active");
	 activePane.setAttribute('aria-hidden','false')
 }


	//open Mass times


  var masstime_button = document.querySelectorAll('.masstimebutton a');



  masstime_button.forEach( function(button) {
    button.addEventListener('click', function(e){
			openMassTimes(e);
		});
  });

  function openMassTimes(e){
    e.preventDefault;
    modal.classList.add('active');
  }

	var modal = document.getElementById('mass_times_outer');

	var closeModal = document.querySelector('#mass_times_outer .closemodal');

 	closeModal.addEventListener('click', function(e){
		e.preventDefault;
		modal.classList.remove('active');
	});

	//Add OpenLayers Map
	const olmap = document.getElementById('ol_map');
	const olmap_block = document.getElementById('ol_map_block')
	
	if( olmap ){
		const lonlatData = olmap.dataset.lonlat;
		newOLmap(lonlatData,'ol_map');
	}

	if( olmap_block ){
		const lonlatData = olmap_block.dataset.lonlat;
		newOLmap(lonlatData,'ol_map_block');
	}
	

});
