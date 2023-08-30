import apiFetch from '@wordpress/api-fetch';
import {useState, useEffect} from '@wordpress/element';


export function googleMapAPI() {
    const [mapAPI, setMapAPI] = useState('');
    const [res, setRes] = useState('');
    const [err, setErr] = useState(false);

    function fetchMapAPI() {
        setRes('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/maps_api_key'} )
        .then((response) => {
          setRes('success');
          setMapAPI(response);
        })
        .catch( err => {
          setRes('error');
          setErr(err);
        });

    }

    useEffect(() => {
        fetchMapAPI();
    }, []);

    if (res === 'error')
        return (
            <h1>
                {err.toString()}
            </h1>
        );

    if(res === 'success'){
        return mapAPI.toString();
    }

}


export function mapType() {
    const [mapType, setMapType] = useState('');
    const [res, setRes] = useState('');
    const [err, setErr] = useState(false);

    function fetchMapType() {
        setRes('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/map_type'} )
        .then((response) => {
          setRes('success');
          setMapType(response);
        })
        .catch( err => {
          setRes('error');
          setErr(err);
        });

    }

    useEffect(() => {
        fetchMapType();
    }, []);

    if (res === 'error')
        return (
            <h1>
                {err.toString()}
            </h1>
        );

    if(res === 'success'){
        return mapType.toString();
    }

}

export function mapLonLat() {
    const [lonLat, setLonLat] = useState('');
    const [res, setRes] = useState('');
    const [err, setErr] = useState(false);

    function fetchLonLat() {
        setRes('loading');
        apiFetch( { path: '/fim-parish-info/v1/option/contact_lonlat'} )
        .then((response) => {
          setRes('success');
          setLonLat(response);
        })
        .catch( err => {
          setRes('error');
          setErr(err);
        });

    }

    useEffect(() => {
        fetchLonLat();
    }, []);

    if (res === 'error')
        return (
            <h1>
                {err.toString()}
            </h1>
        );

    if(res === 'success'){
        return lonLat.toString();
    }

}




