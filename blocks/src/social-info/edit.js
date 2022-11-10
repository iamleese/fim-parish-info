import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { ToggleControl, Panel, PanelBody, PanelRow, ColorIndicator, RadioControl, RangeControl } from '@wordpress/components';
import {useState, useEffect} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
const classNames = require('classnames');

import './editor.scss';

/**
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

  const show_icons = attributes.show_icons;
  const show_name = attributes.show_name;
  const custom_color = attributes.custom_color;
  const use_custom_colors = attributes.use_custom_colors;
  const flexlayout = attributes.flexlayout;
  const gap = attributes.gap;
  const iconsize = attributes.iconsize;


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
        <div className="socialLinkList" style={{flexDirection:flexlayout, gap:gap+'px'}}>
                {state === 'loading' ? (
                    <h4>Loading...</h4>
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
                        return <li><a className={name+' social_item'} ><div className="iconContainer" style={{width:iconsize+'px'}}><span className="icon" style={{ backgroundColor: use_custom_colors ? custom_color : '' }}></span></div><span className="display_name">{displayname}</span></a></li>
                      }
                    })
                )}

        </div>
    );
}


  const [isShowingName, setIsShowingName] = useState(show_name);
  const [isShowingIcons, setIsShowingIcons ] = useState(show_icons);
  const [ isShowingColors, setIsShowingColors] = useState(use_custom_colors);

  function toggleName(){
    if(isShowingName == false){
			setIsShowingName( true );
		} else {
			setIsShowingName( false );
      if(isShowingIcons == false){
        setIsShowingIcons(true);
        setAttributes({ show_icons: true});
      }
		}
  }

  function toggleIcons() {
		if(isShowingIcons == false){
			setIsShowingIcons( true );
		} else {
      if(isShowingName == false){
        setIsShowingName(true);
        setAttributes({ show_name: true});
      }
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
      <div>
      <PanelRow>
      <RangeControl
          label="Icon Size"
          value={ iconsize }
          onChange={ ( value ) => setAttributes( {iconsize : value} ) }
          min={ 20 }
          max={ 100 }
      />
      </PanelRow>
      <PanelRow>
      <ToggleControl
        label="Use Custom Colors"
        checked = { use_custom_colors }
        onChange={ (val) => { setAttributes( { use_custom_colors: val } ), toggleColors() } }
      />

      </PanelRow>
      </div>
    )
  }

  const blockProps = useBlockProps({
    className: classNames(show_icons ? 'show_icons' : '', show_name ? 'show_name' : '')
  });


	return (
    <div {...blockProps}>

    {SocialLinks()}

    <InspectorControls key="setting">
        <Panel>
            <PanelBody title="Display Options">
                <PanelRow>
                <ToggleControl
                  label="Show Name"
                  checked = { show_name}
                  onChange={ (val) => { setAttributes( { show_name: val } ), toggleName() } }
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

            <PanelBody title="Layout Options">
              <PanelRow>
              <RadioControl
                    label="Display as:"
                    selected={ flexlayout }
                    options={ [
                        { label: 'Columns', value: 'column' },
                        { label: 'Rows', value: 'row' },
                    ] }
                    onChange={ ( value ) => setAttributes( {flexlayout : value} ) }
                />
              </PanelRow>
              <PanelRow>
              <RangeControl
                  label="Spacing"
                  value={ gap }
                  onChange={ ( value ) => setAttributes( {gap : value} ) }
                  min={ 0 }
                  max={ 100 }
              />
              </PanelRow>
            </PanelBody>

        </Panel>
        </InspectorControls>

        </div>
	);
}
