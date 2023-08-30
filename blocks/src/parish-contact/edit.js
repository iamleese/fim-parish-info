import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, Panel, PanelBody, PanelRow} from '@wordpress/components';
import {useState, useEffect} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import {googleMapAPI, mapType, mapLonLat} from './options.js';
import { newOLmap } from '../../../src/ol_map.js';

import './editor.scss';

/**
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

  var show_address = attributes.show_address;
  var show_phone = attributes.show_phone;
  var show_map = attributes.show_map;
  var show_email = attributes.show_email;
  var hide_headings = attributes.hide_headings;


  function ContactInfo() {
    const [contacts, setContacts] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState(false);
    
     function fetchContacts() {
          setState('loading');
          apiFetch( { path: '/fim-parish-info/v1/option/contact_info'} )
          .then((response) => {
            setState('success');
            setContacts(response);
          })
          .catch( err => {
            setState('error');
            setError(err);
          });

      }

      useEffect(() => {
          fetchContacts();
      }, []);

      if (state === 'error')
          return (
              <h1>
                  {error.toString()}
              </h1>
          );
  
    
    const map_api_key = googleMapAPI();
    const map_type = mapType();
    const map_lonlat = mapLonLat();

    newOLmap(map_lonlat,'ol_map_block');
    
   

    let mapembed;
    let srcURL;

    if(state === 'success'){
      mapembed = encodeURI(contacts.street+','+contacts.city+','+contacts.state+','+contacts.zip);
      srcURL = 'https://www.google.com/maps/embed/v1/place?key='+map_api_key+'&q='+mapembed; 
    }

      return (
        <div { ...useBlockProps() }>
          <div className="parish-info-contact-wrap">
                  {state === 'loading' ? (
                      <h4>Loading...</h4>
                  ) : (
                    show_address ? <div className="parish-info-address">{ hide_headings ? '': <h3>{__('Address')}</h3> } {contacts.street}<br />{contacts.city}, {contacts.state} {contacts.zip} </div> : ''
                  )}
                    {state === 'loading' ? (
                      <h4>Loading...</h4>
                  ) : (
                    show_phone ? <div className="parish-info-phone">{ hide_headings ? '': <h3>{__('Phone')}</h3> } {contacts.phone} </div> : ''

                  )}
                    {state === 'loading' ? (
                      <h4>Loading...</h4>
                  ) : (
                    show_email ? <div className="parish-info-email">{ hide_headings ? '': <h3>{__('Email')}</h3> } <a className="emailaddress">{contacts.email}</a></div> : ''
                  )}
          </div>
            <div className="parish-info-map">
            <div className="mapouter">
              {map_type === 'ol' ? (
                <div id="ol_map_block"></div>
              ):(
                <iframe id="gmap_canvas" referrerpolicy="no-referrer-when-downgrade"
                  src={srcURL} frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
    				    </iframe>
              )}
               
            </div>
            </div>
        </div>
      );
  }




	return (
    <div { ...useBlockProps() }>

    {ContactInfo()}

    <InspectorControls key="setting">
        <Panel>
            <PanelBody title="Contact Visibility">
                <PanelRow>
                <ToggleControl
                  label="Show Address"
                  checked = { show_address }
                  help={
                      show_address
                          ? 'Showing Address'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_address: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Phone"
                  checked = { show_phone }
                  help={
                      show_phone
                          ? 'Showing Phone Number'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_phone: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Email"
                  checked = { show_email }
                  help={
                      show_email
                          ? 'Showing Email'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_email: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Map"
                  checked = { show_map }
                  help={
                      show_map
                          ? 'Showing Map'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_map: val } ) } }
                />
                </PanelRow>
                <PanelRow>
                <ToggleControl
                  label="Hide Headings"
                  checked = { hide_headings }
                  help={
                      hide_headings
                          ? 'Headings Hidden'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { hide_headings: val } ) } }
                />
                </PanelRow>
            </PanelBody>
        </Panel>
        </InspectorControls>

        </div>
	);
}
