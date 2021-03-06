        // Javascript code for the Scrollama and MapFlying!

        // Javascript inspired from the following :
        // 1. Scrollama GitHub: https://github.com/russellgoldenberg/scrollama
        // 2. ZhangZihao GitHub: https://github.com/zhangzihaoDT/scrollama-sticky-overlay
        // 3. Railways Viz Github: https://github.com/imakshayverma/railwaysafety/
        
        // Using d3 for convenience
		var main = d3.select('main')//0
		var scrolly = main.select('#scrolly');//0.1
		var figure = scrolly.select(".figure_mapbox");//0.1.1
		var article = scrolly.select('article');//0.1.2
        var step = article.selectAll('.step');//0.1.2.X
        
		// initialize the scrollama
        const scroller = scrollama();
        
		// AcessToken is restricted to the https://cultureincities.github.io/sport url.  
        // Replace with your own Maobox token.
		const accessToken = 'pk.eyJ1IjoiYXZ1aWxsaSIsImEiOiJjazY1N3Q3MG4wOGFjM2tvNGo4aDlyamN5In0.sD99_EJ71yWj5o_Grdko0Q';
		// Map style - update if you create your own. This one is public and should work with your token
		const mapStyle = 'mapbox://styles/mapbox/light-v10';

        // ------------- PART 1 ------------- // 
        // Set the Map Style and the Map Flying chapters
		// Mapbox access token
		mapboxgl.accessToken = accessToken;

		// Mapbox map configuration - 1st sight of the map
		const map = new mapboxgl.Map({
			container: 'map',
			style: mapStyle,
			center: [6.6322734, 46.6196535],
            zoom: 8,
            minZoom: 8,
            pitch: 0,
            bearing: 0
		});

		// Function to reset map to original position
		const mapReset = () => {
			map.easeTo({
				center: [6.6322734, 46.6196535],
                zoom: 8,
                minZoom: 8,
                pitch: 0,
                bearing: 0
			});
        }; 

        // Map chapters - Flying around various location
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

        // ------------- PART 2 ------------- // 
        // Set the Scrollama Functions 
		// Window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 0.75);
			step.style('height', stepH + 'px');

			var figureHeight = window.innerHeight * 0.7
			var figureMarginTop = (window.innerHeight - figureHeight) / 4

			figure
				.style('height', figureHeight + 'px')
				.style('top', figureMarginTop + 'px');

			// 3. tell scrollama to update new element dimensions
			scroller.resize();
        }    

		// Scrollama event handlers
		function handleStepEnter(response) {
            // response = { element, direction, index } 

			// Show only the current step 
			step.classed('is-active', function (d, i) {
				return i === response.index;
            })  

            const currentStep = response.element.id;
			const currentDirection = response.direction;
			console.log(currentStep, currentDirection)
			const directionIs = (index, direction) => {
				return currentStep === index && currentDirection === direction;
			};
			// Update graphic based on step
			if (directionIs("intro", "down") || directionIs("intro", "up")) {
			 	map.flyTo(chapters[currentStep]);
			 } else if (directionIs("lesalpes", "down")) {
			 	mapReset();
			}
			map.flyTo(chapters[currentStep]);
        }

		function setupStickyfill() {
			d3.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}

        // ------------- PART 3 ------------- // 
        // Define the map and the story chapters 
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
                
                // Add the hashtags of the venues !
                map.addSource('social-media',{
                    'type':'geojson',
                    'data': 'http://cultureincities.com/sport/data/social/social_vaud_tophashtags_january_2020.geojson'      
                });
                
                // Create Empty Popup 
                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });
                
                // Change cursos to a pointer when the mouse is over venues layer!
                map.on('mouseenter', 'venues-viz', function(e) {
                    map.getCanvas().style.cursor = 'pointer';
                    
                    // Get the coordinates and the name of the venues locations
                    var coordinates = e.lngLat;
                    var description = e.features[0].properties.venues;
                    // Set the empty popup and add it to the map
                    popup
                        .setLngLat(coordinates)
                        .setHTML('<h5>Venue Name: '+description+'</h5>')
                        .addTo(map);
                });

                // Change it back to when the mouse leaves, close the popup!
                map.on('mouseleave', 'venues-viz', function() {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });
            });

			setupStickyfill();

			// Force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly article .step',
				offset: 0.30,
				debug: false,
			})
				.onStepEnter(handleStepEnter)

			// setup resize event
			window.addEventListener('resize', handleResize);

			// disable map zoom when using scroll
			map.scrollZoom.disable();
		}

		// kick things off
		init();
