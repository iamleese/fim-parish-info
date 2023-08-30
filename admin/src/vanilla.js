
//button functions in admin
import { newOLmap } from "../../src/ol_map";

document.addEventListener('DOMContentLoaded', function(event) {

  function deleteButton(container_id) {
    let a = document.createElement('a');
    a.textContent = 'Delete Time';
    a.classList.add('delete_time');
    a.classList.add('button');
    a.setAttribute('href','#');
    a.setAttribute('data-container','mass_group_'+container_id);
    return a;
  }



  //Add Time Group
  const addtimegroup = document.querySelector('.add_time_group');

  if(addtimegroup){
    addtimegroup.addEventListener("click",function(e){
      e.preventDefault;
      add_time_group();
    });

  }

  

  function setFieldAttributes(obj,name,value){
    obj.setAttribute(name,value);
  }


  function add_time_group(){

    const container = document.getElementById('mass_time_container');

    const groupcount = document.querySelectorAll('.masstime_set');
    const id_num = parseInt(groupcount.length);

    let newgroup = document.createElement('div');
    newgroup.id = 'mass_group_'+ id_num;
    newgroup.classList.add('masstime_set');

    let titlefieldset = document.createElement('fieldset');
    let titlelabel = document.createElement('label');
    titlelabel.setAttribute('for','title_'+ id_num);
    titlelabel.classList.add('masstimetitle');
    titlelabel.textContent = 'Title:';

    let titlefield = document.createElement('input');

    let titleAttributes = [
      {
        'name':'type',
        'value': 'text'
      },
      {
        'name':'class',
        'value': 'titleentry'
      },
      {
        'name': 'name',
        'value': 'fim_parish_info_mass_times['+id_num+'][title]'
      }
    ];

    titleAttributes.forEach((el) => {
      setFieldAttributes(titlefield, el.name, el.value);
    });

    titlefieldset.appendChild(titlelabel);
    titlefieldset.appendChild(titlefield);

    let masstimeset = document.createElement('div');
    masstimeset.classList.add('times');

    let masstimefieldset = document.createElement('fieldset');
    masstimefieldset.classList.add('masstime');

    let timelabel = document.createElement('label');
    timelabel.setAttribute('for','time_0');
    timelabel.classList.add('timetitle');
    timelabel.textContent = 'Time:';

    let timeinput = document.createElement('input');
    let timeAttributes = [
      {
        'name' : 'type',
        'value' : 'text'
      },
      {
        'name' : 'class',
        'value' : 'timeentry'
      },
      {
        'name' : 'name',
        'value' : 'fim_parish_info_mass_times['+id_num+'][timeset][0][time]'
      }
    ];

    timeAttributes.forEach((el) => {
      setFieldAttributes(timeinput, el.name, el.value);
    });

    let notelabel = document.createElement('label');
    notelabel.setAttribute('for','notes_0');
    notelabel.classList.add('detailtitle');
    notelabel.textContent = 'Details:';

    let noteinput = document.createElement('input');
    let noteAttributes = [
      {
        'name' : 'type',
        'value' : 'text'
      },
      {
        'name' : 'class',
        'value' : 'notesentry'
      },
      {
        'name' : 'name',
        'value' : 'fim_parish_info_mass_times['+id_num+'][timeset][0][notes]'
      }
    ];

    noteAttributes.forEach((el) => {
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
    deletebutton.setAttribute('data-container','mass_group_'+id_num);
    deleteoption.appendChild(deletebutton);

    newgroup.appendChild(deleteoption);
    container.appendChild(newgroup);

  }

//Dynamic Object Listeners


  document.addEventListener('click',function(e){

      //Add Time Fields
      if(e.target && e.target.classList.contains('add_time')){
        event.preventDefault();
        const parent_id = e.target.parentNode.id;
        const timeset = Array.from( document.querySelectorAll('#'+parent_id+' .masstime') ).pop();

        var nodekeys = timeset.querySelector('.timeentry ').name;

        var regexp = /[0-9]+/g;
        const matches = [...nodekeys.matchAll(regexp)];

        const newfieldset = timeset.cloneNode(true);
        const container = timeset.parentNode;
        const timefield = newfieldset.querySelector('.timeentry');
        const notefield = newfieldset.querySelector('.notesentry');
        const newkey = parseInt(matches[1]) + 1;
        timefield.setAttribute('name','fim_parish_info_mass_times['+matches[0]+'][timeset]['+newkey+'][time]');
        timefield.value = '';
        notefield.setAttribute('name','fim_parish_info_mass_times['+matches[0]+'][timeset]['+newkey+'][notes]');
        notefield.value = '';

        var isDelete = newfieldset.querySelector('.delete_time');
        if( isDelete == null || isDelete == undefined ){
          newfieldset.appendChild( deleteButton(matches[0]) );
        }


        container.appendChild(newfieldset);

      }

      //DELETE TIME
      if(e.target && e.target.classList.contains('delete_time')){

            const deletefield = e.target.parentNode;
            var container_id = e.target.getAttribute('data-container');

            deletefield.remove();

            //reindex the array


            let alltimes = document.querySelectorAll('#'+container_id+' .masstime');

            const set = Array.from( document.querySelectorAll('#'+container_id+' .masstime') ).pop();
            var keys = set.querySelector('.timeentry ').name;


            var regexp = /[0-9]+/g;
            const matches = [...keys.matchAll(regexp)];
            var k = 0;

            alltimes.forEach( timeset => {
              const time = timeset.querySelector('.timeentry');
              const note = timeset.querySelector('.notesentry');
              time.setAttribute('name','fim_parish_info_mass_times['+matches[0]+'][timeset]['+k+'][time]');
              note.setAttribute('name','fim_parish_info_mass_times['+matches[0]+'][timeset]['+k+'][notes]');

              k++;
            })

       }


      // DELETE TIME GROUP
      if(e.target && e.target.classList.contains('delete_mass_group')){

        var deletecontainer = e.target.getAttribute('data-container');
        const removeme = document.getElementById(deletecontainer);
        removeme.remove();

        const containers = document.querySelectorAll('.masstime_set');

        var firstkey = /[0-9]+/;
        var i = 0;

        //re-index arrays
        containers.forEach( container => {
            const currentContainerId = container.id;

            const timetitle =  container.querySelector('.titleentry');
            timetitle.setAttribute('name',timetitle.name.replace(firstkey,i));

            const timefields = document.querySelectorAll('#'+currentContainerId+' .timeentry');
            console.log(timefields);
            timefields.forEach( timefield => {
              timefield.setAttribute('name',timefield.name.replace(firstkey,i));
            });

            const notefields = document.querySelectorAll('#'+currentContainerId+' .notesentry');
            notefields.forEach( notefield => {
              notefield.setAttribute('name',notefield.name.replace(firstkey,i));
            });

            container.id = 'mass_group_'+i;


            i++;
        });


      } //Delete Mass group




   }); //event listeners

   //detect map selection change
   const mapSelect = document.getElementById('contact_map_type');
   const gmap = document.querySelector('#gmap_canvas');
   const olmap = document.querySelector('#ol_map');

   mapSelect.addEventListener('change', () => {
        if(mapSelect.value == 'ol'){
          gmap.style.visibility = "hidden";
          olmap.style.visibility = "visible";
        } else {
          gmap.style.visibility = "visible";
          olmap.style.visibility = "hidden";
        }
   });
   //map selection change


   //get contact input change
   
   let contactinputs = document.querySelectorAll('.contact_input');
   const mapType = document.querySelector('#contact_map_type');
   const lonlat = document.querySelector('#contact_lonlat');

   contactinputs.forEach(function(elem) {
      elem.addEventListener("input", mapDisplay());
    });


    function encodeAddress(){
        const street = document.getElementById('contact_street').value;
        const city = document.getElementById('contact_city');
        const state = document.getElementById('contact_state');
        const zipcode = document.getElementById('contact_zip');
        let mapurlcode = null;
        const regex = /.+?(?=#)/; //remove any pound signs
        let address = street.match(regex);

        if(address){
          address = address[0];
        } else {
          address = street;
        }

        if(street.value !== '' && city.value !== '' && state.value !== ''){
          var fulladdress = address+', '+city.value+', '+state.value+' '+zipcode.value;
          mapurlcode = encodeURIComponent(fulladdress);
        }

        return mapurlcode;

    }

      async function getLonLat(){
        let address = encodeAddress();
        let url = 'https://nominatim.openstreetmap.org/search?q='+address+'&format=json';

        try {
          const res = await fetch(url, { method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',} });
          const jsonData = res.json();
          return jsonData;      

        }
        catch (error){
          console.error(error);
        }
        
      }

      let lonlatData;

      async function setMapVars() {

        let data = await getLonLat();
        data = JSON.stringify(data);
        const mapData = JSON.parse(data);
        lonlatData = mapData[0].lon+','+mapData[0].lat;
        lonlat.value = lonlatData;

        newOLmap(lonlatData,'ol_map');
        
      };
      
      function mapDisplay(){
        if(mapType == ''){ 
          //gmap
          const map = document.getElementById('gmap_canvas');
          var regex = /(?<=q=)(.)+(?=&t)/;
          var mapsrc = map.getAttribute('src');
          map.setAttribute('src', mapsrc.replace(regex,encodeAddress()) );
        }
      }
  
     setMapVars();
      
  

});
