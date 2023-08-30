import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, PanelRow } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';


import metadata from './block.json';

const enableMassTimeButton = [
    'core/button',
];

const filterBlocks = (settings) => {
    
    if (settings.name !== 'core/button') {
        return settings
    }

    const newSettings = {
          ...settings, attributes : {...settings.attributes, isMassTimeButton: { type: 'boolean' } } ,
    }

    return newSettings; 
}

addFilter(
    'blocks.registerBlockType', 
    metadata.name, 
    filterBlocks 
)



const withMassTimeButton = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

        // Do nothing if it's another block than our defined ones.
        if ( ! enableMassTimeButton.includes( props.name ) ) {
            return (
                <BlockEdit { ...props } />
            );
        }

        const {
            attributes: { isMassTimeButton },
            setAttributes,
        } = props;

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <PanelBody title="Enable Mass Time Button" initialOpen={ true }>
                        <PanelRow>
                            <ToggleControl
                                label = "Make this button open Mass Times"
                                checked = {!!isMassTimeButton}
                                onChange = {(val) => {setAttributes({isMassTimeButton: val})}}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withMassTimeButton' );

addFilter( 'editor.BlockEdit', 'fim-parish-info/with-mass-time-button', withMassTimeButton );

function saveMassTimeButton(extraProps, blockType, attributes) {
    
    const { isMassTimeButton } = attributes;
    
    if (blockType.name === 'core/button' && isMassTimeButton == true) {
        return {
            ...extraProps,
            'onclick' : 'openMassTimes()',
        };
    }

    return extraProps;
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'fim-parish-info/save-mass-time-button',
    saveMassTimeButton
);