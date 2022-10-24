/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./admin/src/vanilla.js":
/*!******************************!*\
  !*** ./admin/src/vanilla.js ***!
  \******************************/
/***/ (function() {

//button functions in admin
document.addEventListener('DOMContentLoaded', function (event) {
  function deleteButton(container_id) {
    let a = document.createElement('a');
    a.textContent = 'Delete Time';
    a.classList.add('delete_time');
    a.classList.add('button');
    a.setAttribute('href', '#');
    a.setAttribute('data-container', 'mass_group_' + container_id);
    return a;
  } //Add Time Group


  const addtimegroup = document.querySelector('.add_time_group');

  function setFieldAttributes(obj, name, value) {
    obj.setAttribute(name, value);
  }

  function add_time_group() {
    const container = document.getElementById('mass_time_container');
    const groupcount = document.querySelectorAll('.masstime_set');
    const id_num = parseInt(groupcount.length);
    let newgroup = document.createElement('div');
    newgroup.id = 'mass_group_' + id_num;
    newgroup.classList.add('masstime_set');
    let titlefieldset = document.createElement('fieldset');
    let titlelabel = document.createElement('label');
    titlelabel.setAttribute('for', 'title_' + id_num);
    titlelabel.classList.add('masstimetitle');
    titlelabel.textContent = 'Title:';
    let titlefield = document.createElement('input');
    let titleAttributes = [{
      'name': 'type',
      'value': 'text'
    }, {
      'name': 'class',
      'value': 'titleentry'
    }, {
      'name': 'name',
      'value': 'fim_parish_info_mass_times[' + id_num + '][title]'
    }];
    titleAttributes.forEach(el => {
      setFieldAttributes(titlefield, el.name, el.value);
    });
    titlefieldset.appendChild(titlelabel);
    titlefieldset.appendChild(titlefield);
    let masstimeset = document.createElement('div');
    masstimeset.classList.add('times');
    let masstimefieldset = document.createElement('fieldset');
    masstimefieldset.classList.add('masstime');
    let timelabel = document.createElement('label');
    timelabel.setAttribute('for', 'time_0');
    timelabel.classList.add('timetitle');
    timelabel.textContent = 'Time:';
    let timeinput = document.createElement('input');
    let timeAttributes = [{
      'name': 'type',
      'value': 'text'
    }, {
      'name': 'class',
      'value': 'timeentry'
    }, {
      'name': 'name',
      'value': 'fim_parish_info_mass_times[' + id_num + '][timeset][0][time]'
    }];
    timeAttributes.forEach(el => {
      setFieldAttributes(timeinput, el.name, el.value);
    });
    let notelabel = document.createElement('label');
    notelabel.setAttribute('for', 'notes_0');
    notelabel.classList.add('detailtitle');
    notelabel.textContent = 'Details:';
    let noteinput = document.createElement('input');
    let noteAttributes = [{
      'name': 'type',
      'value': 'text'
    }, {
      'name': 'class',
      'value': 'notesentry'
    }, {
      'name': 'name',
      'value': 'fim_parish_info_mass_times[' + id_num + '][timeset][0][notes]'
    }];
    noteAttributes.forEach(el => {
      setFieldAttributes(noteinput, el.name, el.value);
    });
    masstimefieldset.appendChild(timelabel);
    masstimefieldset.appendChild(timeinput);
    masstimefieldset.appendChild(notelabel);
    masstimefieldset.appendChild(noteinput);
    masstimeset.appendChild(masstimefieldset);
    let addButton = document.createElement('a');
    addButton.classList.add('add_time');
    addButton.classList.add('button');
    addButton.textContent = '+ Add Time';
    newgroup.appendChild(titlefieldset);
    newgroup.appendChild(masstimeset);
    newgroup.appendChild(addButton);
    const deleteoption = document.createElement('div');
    deleteoption.classList.add('deletecol');
    const deletebutton = document.createElement('a');
    deletebutton.classList.add('delete_mass_group');
    deletebutton.classList.add('button');
    deletebutton.textContent = 'Delete Mass Group';
    deletebutton.setAttribute('data-container', 'mass_group_' + id_num);
    deleteoption.appendChild(deletebutton);
    newgroup.appendChild(deleteoption);
    container.appendChild(newgroup);
  } //Dynamic Object Listeners


  document.addEventListener('click', function (e) {
    //Add Time Fields
    if (e.target && e.target.classList.contains('add_time')) {
      event.preventDefault();
      const parent_id = e.target.parentNode.id;
      const timeset = Array.from(document.querySelectorAll('#' + parent_id + ' .masstime')).pop();
      var nodekeys = timeset.querySelector('.timeentry ').name;
      var regexp = /[0-9]+/g;
      const matches = [...nodekeys.matchAll(regexp)];
      const newfieldset = timeset.cloneNode(true);
      const container = timeset.parentNode;
      const timefield = newfieldset.querySelector('.timeentry');
      const notefield = newfieldset.querySelector('.notesentry');
      const newkey = parseInt(matches[1]) + 1;
      timefield.setAttribute('name', 'fim_parish_info_mass_times[' + matches[0] + '][timeset][' + newkey + '][time]');
      timefield.value = '';
      notefield.setAttribute('name', 'fim_parish_info_mass_times[' + matches[0] + '][timeset][' + newkey + '][notes]');
      notefield.value = '';
      var isDelete = newfieldset.querySelector('.delete_time');

      if (isDelete == null || isDelete == undefined) {
        newfieldset.appendChild(deleteButton(matches[0]));
      }

      container.appendChild(newfieldset);
    } //DELETE TIME


    if (e.target && e.target.classList.contains('delete_time')) {
      const deletefield = e.target.parentNode;
      var container_id = e.target.getAttribute('data-container');
      deletefield.remove(); //reindex the array

      let alltimes = document.querySelectorAll('#' + container_id + ' .masstime');
      const set = Array.from(document.querySelectorAll('#' + container_id + ' .masstime')).pop();
      var keys = set.querySelector('.timeentry ').name;
      var regexp = /[0-9]+/g;
      const matches = [...keys.matchAll(regexp)];
      var k = 0;
      alltimes.forEach(timeset => {
        const time = timeset.querySelector('.timeentry');
        const note = timeset.querySelector('.notesentry');
        time.setAttribute('name', 'fim_parish_info_mass_times[' + matches[0] + '][timeset][' + k + '][time]');
        note.setAttribute('name', 'fim_parish_info_mass_times[' + matches[0] + '][timeset][' + k + '][notes]');
        k++;
      });
    } // DELETE TIME GROUP


    if (e.target && e.target.classList.contains('delete_mass_group')) {
      var deletecontainer = e.target.getAttribute('data-container');
      const removeme = document.getElementById(deletecontainer);
      removeme.remove();
      const containers = document.querySelectorAll('.masstime_set');
      var firstkey = /[0-9]+/;
      var i = 0; //re-index arrays

      containers.forEach(container => {
        const currentContainerId = container.id;
        const timetitle = container.querySelector('.titleentry');
        timetitle.setAttribute('name', timetitle.name.replace(firstkey, i));
        const timefields = document.querySelectorAll('#' + currentContainerId + ' .timeentry');
        console.log(timefields);
        timefields.forEach(timefield => {
          timefield.setAttribute('name', timefield.name.replace(firstkey, i));
        });
        const notefields = document.querySelectorAll('#' + currentContainerId + ' .notesentry');
        notefields.forEach(notefield => {
          notefield.setAttribute('name', notefield.name.replace(firstkey, i));
        });
        container.id = 'mass_group_' + i;
        i++;
      });
    } //Delete Mass group

  }); //event listeners
  //get contact input change

  let contactinputs = document.querySelectorAll('.contact_input');
  contactinputs.forEach(function (elem) {
    elem.addEventListener("input", updateMap());
  });

  function updateMap() {
    const street = document.getElementById('contact_street');
    const city = document.getElementById('contact_city');
    const state = document.getElementById('contact_state');
    const zipcode = document.getElementById('contact_zip');

    if (street.value !== '' && city.value !== '' && state.value !== '') {
      var fulladdress = street.value + ', ' + city.value + ', ' + state.value + ' ' + zipcode.value;
      const mapurlcode = encodeURI(fulladdress);
      const map = document.getElementById('gmap_canvas');
      var regex = /(?<=q=)(.)+(?=&t)/;
      var mapsrc = map.getAttribute('src');
      map.setAttribute('src', mapsrc.replace(regex, mapurlcode));
    }
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!****************************!*\
  !*** ./admin/src/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vanilla_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vanilla.js */ "./admin/src/vanilla.js");
/* harmony import */ var _vanilla_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vanilla_js__WEBPACK_IMPORTED_MODULE_0__);

}();
/******/ })()
;
//# sourceMappingURL=index.js.map