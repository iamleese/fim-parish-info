import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { ToggleControl, Panel, PanelBody, PanelRow, ColorIndicator } from '@wordpress/components';
import {useState, useEffect} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

  const show_icons = attributes.show_icons;
  const show_name = attributes.show_name;
  const custom_color = attributes.custom_color;
  const use_custom_colors = attributes.use_custom_colors;


function SocialLinks() {
    const [links, setLinks] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState(false);

    function fetchLinks() {
        setState('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/social_links'} )
        .then((response) => {
          setState('success');
          setLinks(response);
        })
        .catch( err => {
          setState('error');
          setError(err);
        });

    }

    useEffect(() => {
        fetchLinks();
    }, []);

    if (state === 'error')
        return (
            <h1>
                {error.toString()}
            </h1>
        );

    return (
        <div>
                {state === 'loading' ? (
                    <h1>Loading...</h1>
                ) : (
                  Object.entries(links).map( ([key,value]) => {
                      if(value.length > 0 && value != ''){
                        var name = key.toString();
                        var link = value.toString();
                        var displayname;

                        if(name == 'linkedin'){
                          displayname = 'LinkedIn';
                        } else {
                          displayname = name.charAt(0).toUpperCase() + name.slice(1);
                        }
                        return <li><a className={name} href={link}><span className="display_name">{displayname}</span></a></li>
                      }
                    })
                )}

        </div>
    );
}

  const [isShowingIcons, setIsShowingIcons ] = useState(show_icons);
  const [ isShowingColors, setIsShowingColors] = useState(use_custom_colors);

  function toggleIcons() {
		if(isShowingIcons == false){
			setIsShowingIcons( true );
		} else {
			setIsShowingIcons( false );
		}
	}

  function toggleColors() {
		if(isShowingColors == false){
			setIsShowingColors( true );
		} else {
			setIsShowingColors( false );
		}
	}


  const CustomColor = () => {
    return(
      <PanelRow>
      <label >Icon Color: <ColorIndicator colorValue={custom_color} /></label>
      <ColorPalette
          value={ custom_color}
          disableCustomColors = 'true'
          onChange={ ( color ) => {setAttributes( {custom_color : color }) } }
      />
      </PanelRow>
    )
  }

  const ShowColorOption = () => {
    return(
      <PanelRow>
      <ToggleControl
        label="Use Custom Colors"
        checked = { use_custom_colors }
        onChange={ (val) => { setAttributes( { use_custom_colors: val } ), toggleColors() } }
      />

      </PanelRow>
    )
  }


	return (
    <div { ...useBlockProps() }>
    <div id="SocialLinkList">
    test
    {SocialLinks()}
    </div>

    <InspectorControls key="setting">
        <Panel>
            <PanelBody title="Social Media Display Options">
                <PanelRow>
                <ToggleControl
                  label="Show Name"
                  checked = { show_name}
                  onChange={ (val) => { setAttributes( { show_name: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Icons"
                  checked = { show_icons }
                  onChange={ (val) => { setAttributes( { show_icons: val } ), toggleIcons() } }
                />
                </PanelRow>

                {isShowingIcons && (
                  <ShowColorOption />
                )}

                {isShowingIcons && isShowingColors && (
                  <CustomColor />
                )}


            </PanelBody>
        </Panel>
        </InspectorControls>

        </div>
	);
}
