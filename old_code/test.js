		// using d3 for convenience
		var main = d3.select('main')//0
		var scrolly = main.select('#scrolly');//0.1
		var figure = scrolly.select(".figure_mapbox");//0.1.1
		var article = scrolly.select('article');//0.1.2
        var step = article.selectAll('.step');//0.1.2.X
        
		// initialize the scrollama
		const scroller = scrollama();
		// token is restricted to the https://lobenichou.github.io/cuny-mbx-2019/ url.
		// Replace with your own token.
		const accessToken = 'pk.eyJ1IjoiYXZ1aWxsaSIsImEiOiJjazY1N3Q3MG4wOGFjM2tvNGo4aDlyamN5In0.sD99_EJ71yWj5o_Grdko0Q';

		// Map style - update if you create your own.This one is public and should work with your token
		const mapStyle = 'mapbox://styles/mapbox/light-v10';

		// If you upload the data into a new style, you will have to update the name of the layers. Make sure they match the id of your layers in Studio (or here if you use addLayer()). You will also have to re-style the data. Check the data folder for the json files for each layer. It contains the expressions used to the properties. You can copy and paste  it into Studio by clicking on "</>" or use it in Mapbox GL JS.
		// const circleLayer = 'income-per-station-cir';
		// const hexLayer = 'income-per-station-hex';
		// const subwayLineLayer = 'subway-lines';

		// access token
		mapboxgl.accessToken = accessToken;

		// map config
		const map = new mapboxgl.Map({
			container: 'map',
			style: mapStyle,
			center: [6.6322734, 46.6196535],
            zoom: 8,
            minZoom: 8,
            pitch: 0,
            bearing: 0
		});

		// function to reset map to original position
		const mapReset = () => {
			map.easeTo({
				center: [6.6322734, 46.6196535],
                zoom: 8,
                minZoom: 8,
                pitch: 0,
                bearing: 0
			});
        }; 

        var chapters = {
            'intro': {
                center: [6.6322734, 46.6196535],
                zoom: 8,
                minZoom: 8,
                pitch: 0,
                bearing: 0
            },
            'lausanne': {
                center: [6.6322734, 46.5145535],
                zoom: 13.6,
                pitch: 60,
                bearing: -50.0
            },
            'lavallee': {
                center: [6.25, 46.6],
                zoom: 12,
                pitch: 20,
                bearing: -35.0
            },
            'lesalpes': {
                center: [7.158056, 46.351389],
                zoom: 10.8,
                pitch: 30,
                bearing: -88.0
            }
        };

		// generic window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 0.85);
			step.style('height', stepH + 'px');

			var figureHeight = window.innerHeight * 0.8
			var figureMarginTop = (window.innerHeight - figureHeight) / 5

			figure
				.style('height', figureHeight + 'px')
				.style('top', figureMarginTop + 'px');


			// 3. tell scrollama to update new element dimensions
			scroller.resize();
        }        
		// scrollama event handlers
		function handleStepEnter(response) {
            // response = { element, direction, index } 

			// add color to current step only
			step.classed('is-active', function (d, i) {
				return i === response.index;
            })  

            const currentStep = response.element.id;
			const currentDirection = response.direction;
			console.log(currentStep, currentDirection)
			const directionIs = (index, direction) => {
				return currentStep === index && currentDirection === direction;
			};
			// update graphic based on step
			// if (directionIs("aldgate", "down") || directionIs("aldgate", "up")) {
			// 	map.flyTo(chapters[currentStep]);
			// } else if (directionIs("gloucester", "down")) {
			// 	mapReset();
			// }
			map.flyTo(chapters[currentStep]);
        }

		function setupStickyfill() {
			d3.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}

		function init() {

            map.on("load", function() {

                // Add the location of the venues ! 
                map.addSource('venues',{
                    'type':'geojson',
                    'data': 'http://cultureincities.com/sport/data/GeoJson/lausanne2020_venues.geojson'      
                });
               
                map.addLayer({
                    'id':'venues-viz',
                    'type':'circle',
                    'source':'venues',
                    'paint':{
                      'circle-stroke-color':'#de5b91',
                      'circle-stroke-width':1,
                      'circle-color':'#de5b91'
                    }
                });  
                
                map.addSource('social-media',{
                    'type':'geojson',
                    'data': 'http://cultureincities.com/sport/data/social/social_vaud_tophashtags_january_2020.geojson'      
                });
               
                map.addLayer({
                    'id':'social-media-viz',
                    'type':'circle',
                    'source':'social-media',
                    'paint':{
                      'circle-color':'#de5b91',
                      'circle-radius': 50,
                      'circle-opacity': 0.4
                    }
                });
                // Change the cursor to a pointer when the mouse is over the location
                map.on('click', 'social-media-viz', function(e) {
                    // Create Popup on Click
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML('<h5>Top 5 Hashtags in '+e.features[0].properties.location+'</h5>'
                        +'<p>1. '+e.features[0].properties.hashtag_1+'</p>'
                        +'<p>2. '+e.features[0].properties.hashtag_2+'</p>'
                        +'<p>3. '+e.features[0].properties.hashtag_3+'</p>'
                        +'<p>4. '+e.features[0].properties.hashtag_4+'</p>'
                        +'<p>5. '+e.features[0].properties.hashtag_5+'</p>')
                        .addTo(map);
                    });
                  
                    // Change cursos to a pointer when the mouse is over states layer!
                    map.on('mouseenter', 'social-media-vi', function() {
                        map.getCanvas().style.cursor = 'pointer';
                    });
  
                    // Change it back to when the mouse leaves, close the popup!
                    map.on('mouseleave', 'social-media-vi', function() {
                        map.getCanvas().style.cursor = '';
                    });
            })
			setupStickyfill();

			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly article .step',
				offset: 0.30,
				debug: false,
			})
				.onStepEnter(handleStepEnter)


			// setup resize event
			window.addEventListener('resize', handleResize);

			//调试使用
			map.on("click", function (e) {
				console.log(e.lngLat);
			});
			// disable map zoom when using scroll
			map.scrollZoom.disable();
		}

		// kick things off
		init();
