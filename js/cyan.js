var cyanjson = {

    pageTitle: "Cyan Image List",

    pageItems: [

        {
            itemTitle      : "Agility Chart",
            itemDescription: "A Graphical depiction of how agile we are.",
            url            : "http://www.cyaninc.com/static/cms_page_media/mso3.jpg"

        },
        {
            itemTitle      : "Attack Chart",
            itemDescription: "How we approach the marketplace.",
            url            : "http://www.cyaninc.com/static/cms_files/img/attack_chart.png"
        },
        {
            itemTitle      : "Petaluma HQ",
            itemDescription: "A outside shot of our Petaluma Office.",
            url            : "http://www.cyaninc.com/static/cms_page_media/wtp2.jpg"
        },
        {
            itemTitle      : "Network Dialog",
            itemDescription: "A Diagram show several network layers.",
            url            : "http://www.cyaninc.com/static/cms_files/img/network_diagram.png"
        },
        {
            itemTitle      : "Sample Bubble",
            itemDescription: "An example of a bubble chart.",
            url            : "http://www.cyaninc.com/static/cms_page_media/data-center.jpg"
        },
        {
            itemTitle      : "Sample Bubble",
            itemDescription: "An example of a bubble chart.",
            url            : "http://www.cyaninc.com/static/cms_files/img/software_chart.png"
        }]
};

$().ready(function() {
	
	var mypage = page.init({
		title: cyanjson.pageTitle,
		tileContainer: $('#tile-area'),
		header: $("#header"),
		defaultTileWidth: 260,
		defaultTileHeight: 320,
		expandedWidth:280,
		expandedHeight:320
		});
	mypage.createTiles( cyanjson.pageItems );
	window.myTiles = mypage;
	var newDiv = $("<div>").insertAfter($("#tile-area"));
	var newtiles = page.init({
		tileContainer: newDiv
		});
	newtiles.createTiles(cyanjson.pageItems);
	});

var page = {
	init: function(args) { 
		if (args.header && args.title) {
			page.header(args.header, args.title);
		}
		return page.tiles(args);
	},
	header: function(helement, title) {
		helement.append($("<h1>").attr("id","headerText").html(title));
	},
	tiles: function(args) {
		var defaults = {
			headerText: $('<h1>'),
			title: false,
			tileContainer: $('<div>'),
			header: $("<div>"),
			tileSelect: [],
			defaultTileWidth: 260,
			defaultTileHeight: 320,
			expandedWidth: 280,
			expandedHeight: 320
			};

		var newObj = {
			options: {},
			getTiles: function() {
				return this.options.tileContainer.children(".tile");
				},
			createTiles: function(listOfTiles) {
				this.options.list = listOfTiles;
		    		var o = this;
				$.each( this.options.list, function(i, value) {
	        			o.tile(value);
				});
			},
			expand: function() {
				if(this.data('expanding')) {
					var w = this.width();
					var h = this.height();
					if(typeof arguments[0] === "number" && typeof arguments[1] === "number") {
						var maxX = arguments[0];
						var maxY = arguments[1];
						if(w < maxX || h < maxY) {
							if(w < maxX) {
								this.css('width', w + 20);
								}
							if(h < maxY) {
								this.css('height', h + 20);
								}
							return true;
							}
						else {
							this.data('expanding', false);
							}
						}
					else {
					// in this case, keep expanding until the other tiles have stopped shrinking
						this.css('width', w + 20);
						this.css('height', h + 20);
						}
					}
				else {
					return false;
					}
				},
			shrink: function() {
				if(this.data('shrinking')) {
					if(typeof arguments[0] === "string") {
						var w = this.width();
						var h = this.height();
						var direction = arguments[0];
						if(direction == "horizontal") {
							if(w > 240) {
								this.css('width', w - 20);
								return true;
								}
							else {
								this.data('shrinking',false);
								}
							}
						if(direction == "vertical") {
							if(w > 300) {
								this.css('height', w - 20);
								return true;
								}
							else {
								this.data('shrinking',false);
								}
							}
						}
					if(typeof arguments[0] === "number" && typeof arguments[1] === "number") {
						var width = arguments[0];
						var height = arguments[1];
			
						var origWidth = this.width();
						var origHeight = this.height();

	
						if(origWidth > width || origHeight > height) {
							if(origWidth > width) {
								this.css('width', origWidth - 20);
								}
	
							if(origHeight > width) {
								this.css('height', origHeight - 20);
								}
							return true;
							}
						else {	
							this.data('shrinking',false);
							}
						}
					}
				else return false;
				},
			shrinkTiles: function(tileList) {
				if(typeof arguments[1] == "string") {
					var dir = arguments[1];
					var o = this;
					for(var i = 0; i < $(tileList).length; i++) {
						var ti = $(tileList).eq(i);
						(function(tile, direction) {
						tile.data('expanding', false);
						tile.data('shrinking', true);
						var intrv = setInterval(function() {
							if(tile.data('shrinking')) {
								o.shrink.call(tile, direction);
								}
							else {
								clearInterval(intrv);
								}
							},16);
						})(ti, dir);
						}

					}
				if(typeof arguments[1] == "number" && typeof arguments[2] == "number") {
					var x = arguments[1];
					var y = arguments[2];

					for(var i = 0; i < tileList.length; i++) {
						var ti = tileList[i];
						var o = this;
						(function(tile, width, height) {
							tile.data('expanding', false);
							tile.data('shrinking', true);
							var intrv = setInterval(function() {
								if(tile.data('shrinking')) {
									o.shrink.call(tile, width, height);
									}
								else {
									clearInterval(intrv);
									}
								},16);
							})(ti, x, y);
						}
					}
				},
			expandTiles: function(tileList) {
				var o = this;
				for(var i = 0; i < tileList.length; i++) {
					var ti = $(tileList[i]);
					(function(tile, args) {
						tile.data('shrinking',false);
						tile.data('expanding',true);
						if(typeof args[1] === "number" && typeof args[2] == "number") {
							var width = args[1];
							var height = args[2];
							var intrv = setInterval(function() {
								if(tile.data('expanding')) {
									o.expand.call(tile, width, height);
									}
								else {
									clearInterval(intrv);
									}
								},50);
							}
						})(ti, arguments);
					}
				},
 			tile: function(args) {
				var tile = $('<div>').addClass('tile');
				var imageContainer = $('<div>').addClass('imageContainer');
				var textContainer = $('<div>').addClass('textContainer');
				tile.append(imageContainer);
				for(var item in args) {
					if(item == "url") {
						var itemHtml = $('<img>').attr('src', args.url).addClass('image');
						}
					else {
						var itemHtml = $('<div>').addClass(item).html(args[item]);
						}

					imageContainer.append(itemHtml);
					}
			var o = this;
			o.options.tileContainer.append(tile);
			o.options.tileSelect.push({"data": args, "tile": tile});
				tile.hover(function() {
					o.shrinkTiles( o.getTiles().not($(this)), "horizontal" );
					o.expandTiles( [$(this)], o.options.expandedWidth, o.options.expandedHeight); 
					return false;
					},
				function() {
					o.expandTiles( o.getTiles().not($(this)), o.options.defaultTileWidth, o.options.defaultTileHeight );
					o.shrinkTiles( [$(this)], o.options.defaultTileWidth, o.options.defaultTileHeight );
					return false;
					});
			}
		};

		for(var item in defaults) {
			newObj.options[item] = args[item] || defaults[item];
			}

		var v = function() {
			for (var i in newObj) {
				this[i] = newObj[i];
			}
		};
		return new v();
		}
	}
