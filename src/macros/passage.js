$(document).ready(function() {
    // Get the initial position of the container when the page renders
    const artContainer = $(`#art`);
    let containerOffset = artContainer.offset().top;
    let scrollTop = $(window).scrollTop();
    let adjustedPosition = containerOffset + scrollTop;

    // Update the background position based on scroll
    artContainer.css('background-position', `center ${adjustedPosition}px`);

    $(window).on('scroll', function() {
        let containerOffset = artContainer.offset().top;
        let scrollTop = $(window).scrollTop();
        let adjustedPosition = containerOffset + scrollTop;
        
        // Update the background position based on scroll
        artContainer.css('background-position', `center ${adjustedPosition}px`);
    });
});

// <<art "url">> macro to set the background image of the #art element
Macro.add("art", {
    handler() {
        let artURL = this.args[0];
        let artContainer = this.args[1] ? $(this.args[1]) : $(`#art`);
        artContainer.css("background-image", `url(${artURL})`);
    }
});

// Radiolink
Macro.add("radiolink", {
	isAsync : true,
	tags    : null,

	handler() {
		if (this.args.length === 0) {
			return this.error(`no ${this.name === 'button' ? 'button' : 'link'} text specified`);
		}

		// const $link = jQuery(document.createElement(this.name === 'button' ? 'button' : 'a'));
        
        const $radio = jQuery(document.createElement('input'))
            .attr('type', 'radio')
            .attr('name', this.args[1]);
        const $label = jQuery(document.createElement('label'))
		let passage;
		$label
			.addClass(`radio macro-${this.name}`)
			.ariaClick({
				namespace : '.macros',
				role      : passage != null ? 'link' : 'button', // lazy equality for null
				one       : passage != null // lazy equality for null
			}, this.shadowHandler(
				this.payload[0].contents !== ''
					? () => Wikifier.wikifyEval(this.payload[0].contents.trim())
					: null,
				passage != null // lazy equality for null
					? () => Engine.play(passage)
					: null
			))
            .append($radio)
            .append(this.args[0])
            
            .appendTo(this.output);
	}
});