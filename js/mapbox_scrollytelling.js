// var config = {
//     style: 'mapbox://styles/mapbox/light-v10',
//     accessToken: 'pk.eyJ1IjoiYXZ1aWxsaSIsImEiOiJjazY1N3Q3MG4wOGFjM2tvNGo4aDlyamN5In0.sD99_EJ71yWj5o_Grdko0Q',
//     showMarkers: false,
//     theme: 'light',
//     alignment: 'right',
//    // title: 'The Title Text of this Story',
//    // subtitle: 'A descriptive and interesting subtitle to draw in the reader',
//    // byline: 'By a Digital Storyteller',
//    // footer: 'Source: source citations, etc.',
//     chapters: [
//    {
//        id: 'intro-id',
//        title: 'Welcome to Lausanne2020',
//        image: 'https:/cultureincities.com/sport/images/lausanne_torch.png',
//        description: 'The 2020 Youth Olympic Games took place in Lausanne, Switzerland in January.',
//        location: {
//            center: [6.6322734, 46.6196535],
//            zoom: 8,
//            minZoom: 8,
//            pitch: 0,
//            bearing: 0
//        },
//        onChapterEnter: [
//            // {
//            //     layer: 'layer-name',
//            //     opacity: 1
//            // }
//        ],
//        onChapterExit: [
//            // {
//            //     layer: 'layer-name',
//            //     opacity: 0
//            // }
//        ]
//    },
//    {
//        id: 'lausanne-id',
//        title: 'Lausanne - Olympic Hub',
//        image: 'https:/cultureincities.com/sport/images/speepdskating_photosgraphy.png',
//        description: 'Lausanne was a the heart of the Games.',
//        location: {
//            center: [6.6322734, 46.5145535],
//            zoom: 13.6,
//            pitch: 60,
//            bearing: -50.0
//        },
//        onChapterEnter: [],
//        onChapterExit: []
//    },
//    {
//        id: 'lavalle',
//        title: 'La Vallée de Joux',
//        image: 'https:/cultureincities.com/sport/images/lavalllee_jedleicesterpic.png',
//        description: 'La Vallée de Joux is in the Jura. Famous for old and small moutains.',
//        location: {
//            center: [6.25, 46.6],
//            zoom: 12,
//            pitch: 20,
//            bearing: -35.0
//        },
//        onChapterEnter: [],
//        onChapterExit: []
//    },
//    {
//        id: 'lesalpes',
//        title: 'Les Alpes Vaudoises',
//        image: 'https:/cultureincities.com/sport/images/lesalpes_dustyhenricksenusa.png',
//        description: 'Leysin, Les Diablerets and Villards are three ski resort in the Vaudoise Alpes.',
//        location: {
//            center: [7.158056, 46.351389],
//            zoom: 10.8,
//            pitch: 30,
//            bearing: -88.0
//        },
//        onChapterEnter: [],
//        onChapterExit: []
//    }
//     ]
// };
var chapters = {
    'intro': {
        id: 'intro-id',
        title: 'Welcome to Lausanne2020',
        image: 'https:/cultureincities.com/sport/images/lausanne_torch.png',
        description: 'The 2020 Youth Olympic Games took place in Lausanne, Switzerland in January.',
        location: {
            center: [6.6322734, 46.6196535],
            zoom: 8,
            minZoom: 8,
            pitch: 0,
            bearing: 0
        },
    },
    'lausanne': {
        id: 'lausanne-id',
        title: 'Lausanne - Olympic Hub',
        image: 'https:/cultureincities.com/sport/images/speepdskating_photosgraphy.png',
        description: 'Lausanne was a the heart of the Games.',
        location: {
            center: [6.6322734, 46.5145535],
            zoom: 13.6,
            pitch: 60,
            bearing: -50.0
        },
        onChapterEnter: [],
        onChapterExit: []
    },
    'lavalle': {
        id: 'lavalle',
        title: 'La Vallée de Joux',
        image: 'https:/cultureincities.com/sport/images/lavalllee_jedleicesterpic.png',
        description: 'La Vallée de Joux is in the Jura. Famous for old and small moutains.',
        location: {
            center: [6.25, 46.6],
            zoom: 12,
            pitch: 20,
            bearing: -35.0
        },
        onChapterEnter: [],
        onChapterExit: []
    },
    'lesalpes': {
        id: 'lesalpes',
        title: 'Les Alpes Vaudoises',
        image: 'https:/cultureincities.com/sport/images/lesalpes_dustyhenricksenusa.png',
        description: 'Leysin, Les Diablerets and Villards are three ski resort in the Vaudoise Alpes.',
        location: {
            center: [7.158056, 46.351389],
            zoom: 10.8,
            pitch: 30,
            bearing: -88.0
        },
        onChapterEnter: [],
        onChapterExit: []
    }
};