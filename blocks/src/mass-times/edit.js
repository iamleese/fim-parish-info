import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { ToggleControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import {autop} from '@wordpress/autop';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';

/**
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes,setAttributes}) {

  const hide_headings = attributes.hide_headings;
  const display_masstimes = attributes.display_masstimes;
  const display_confessions = attributes.display_confessions;
  const display_custom = attributes.display_custom;


  function getMassTimes() {
      const [massTimes, setMassTimes] = useState('');
      const [massResponse, setMassResponse] = useState('');
      const [massError, setMassError] = useState(false);

      function fetchMassTimes() {
          setMassResponse('loading');
          apiFetch( { path: '/fim-parish-info/v1/option/mass_times'} )
          .then((response) => {
            setMassResponse('success');
            setMassTimes(response);
          })
          .catch( error => {
            setMassResponse('Error retrieving Mass Times');
            setMassError(error);
          });

      }
        useEffect(() => {
            fetchMassTimes();
        }, []);

        if (massResponse === 'error')
            return (
                <h1>
                    {massError.toString()}
                </h1>
            );
        if(massResponse === 'success' && display_masstimes == true){

          return (
            <div>
            { hide_headings ? '' : <h4>{__('Mass Times')}</h4> }

            {massResponse === 'loading' ? (
                <h4>Loading...</h4>
            ) : (

            Object.entries(massTimes).map( ([k,timegroup]) => {

                  var title = timegroup.title;
                  var massList = timegroup.timeset;


                  return <div className="mass_group">
                  <span className="group_title">{title}</span>
                  {massList.map((item) => {
                     var time = item.time;
                     var notes = item.notes;

                    return (
                    <li className="masstime"><span class="time">{time}</span>
                    {notes ? <span class="details">{notes}</span> : '' }
                    </li>);

                  })
                  }
                  </div>
                })
            )}
            </div>
          );
        }
  }

  function getConfessions(){
    const [confessions, setConfessions] = useState('');
    const [confessionsResponse, setConfessionsResponse] = useState('');
    const [confessionsError, setConfessionsError] = useState(false);

    function fetchConfessions() {
        setConfessionsResponse('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/confessions'} )
        .then((response) => {
          setConfessionsResponse('success');
          setConfessions(autop(response));
        })
        .catch( error => {
          setConfessionsResponse('Error retrieving confessions');
          setConfessionsError(error);
        });

    }

    useEffect(() => {
       fetchConfessions();
    }, []);


    if (confessionsResponse === 'error' )
        return (
            <h1>
                {confessionsError.toString()}
            </h1>
        );

    if(confessionsResponse === 'success' && display_confessions == true){
        return (<div>
          {confessionsResponse === 'loading' ? (
              <h4>Loading...</h4>
          ) : (
            <div>
            { hide_headings ? '' : <h4>{__('Confessions')}</h4> }
            <RichText.Content tagName="p" value={ confessions } />
            </div>
          )
          }
        </div>);

    }

  }


  function getCustom(){
    const [custom, setCustom] = useState('');
    const [customResponse, setCustomResponse] = useState('');
    const [customError, setCustomError] = useState(false);
    const [customTitle, setCustomTitle] = useState('');
    const [customTitleResponse, setCustomTitleResponse] = useState('');
    const [customTitleError, setCustomTitleError] = useState(false);


    function fetchCustom() {
        setCustomResponse('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/custom_content'} )
        .then((response) => {
          setCustomResponse('success');
          setCustom(autop(response));
        })
        .catch( error => {
          setCustomResponse('Error retrieving custom entry');
          setCustomError(error);
        });

    }

    function fetchCustomTitle() {
        setCustomTitleResponse('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/custom_title'} )
        .then((response) => {
          setCustomTitleResponse('success');
          setCustomTitle(response);
        })
        .catch( error => {
          setCustomTitleResponses('Error retrieving custom title');
          setCustomTitleError(error);
        });

    }


    useEffect(() => {
        fetchCustom();
        fetchCustomTitle();
    }, []);



    if (customTitleResponse === 'error')
        return (
            <h1>
                {customTitlerror.toString()}
            </h1>
        );

    if(customTitleResponse === 'success'){
        var title = customTitle.toString();
    }

    if (customResponse === 'error')
        return (
            <h1>
                {customError.toString()}
            </h1>
          );

    if(customResponse === 'success' && display_custom == true){

      return (<div>
        {customResponse === 'loading' ? (
            <h4>Loading...</h4>
        ) : (
          <div>
          { hide_headings ? '' : <h4>{__(title)}</h4> }
          <RichText.Content tagName="p" value={ custom } />
          </div>
        )
        }
      </div>);
    }


  }

  function toggleMassTimes(){
    if(display_masstimes == false && display_confessions == false && display_custom == false){
      setAttributes({display_masstimes : true});
    }

  }




	return (
		<div{ ...useBlockProps() }>
    {getMassTimes()}
    {getConfessions()}
    {getCustom()}

    <InspectorControls key="setting">
        <Panel>
            <PanelBody title="Display Options">
                <PanelRow>
                <ToggleControl
                  label="Hide Headings"
                  checked = { hide_headings }
                  onChange={ (val) => { setAttributes( { hide_headings: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Display Mass Times"
                  checked = { display_masstimes }
                  onChange={ (val) => { setAttributes( { display_masstimes: val } ), toggleMassTimes() } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Display Confessions"
                  checked = { display_confessions }
                  onChange={ (val) => { setAttributes( { display_confessions: val } ), toggleMassTimes() } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Display Custom"
                  checked = { display_custom }
                  onChange={ (val) => { setAttributes( { display_custom: val } ), toggleMassTimes() } }
                />
                </PanelRow>

            </PanelBody>
        </Panel>
        </InspectorControls>
        </div>

	);
}
