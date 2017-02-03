angular.module('ngDebate').component("aboutComponent", {
	template : `
		<nav-component></nav-component>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<h2>Quiblur: Not the Site the Internet Deserves, but the Site It Needs Right Now</h2>
					<h4>Ladies and gentlemen, trolls and intellectuals, welcome to Quibblur: your outlet for internet outrage.</h4><h4>What is Quibblur? We'll let Monte Python explain.</h4>

					<div class="row">
						<div class="col-sm-12 col-md-6 about-vidinfo">
							<div class="video-container">
								<iframe width="704px" height="387px" src="https://www.youtube.com/embed/XNkjDuSVXiE" frameborder="0" allowfullscreen></iframe>
							</div>
						</div>
	
						<div class="col-sm-12 col-md-6 about-vidinfo">
							<p><b>Quibblur</b> is an argument site, a place where you can find people of opposing views.
							But Quibblur is more than just a forum for flame-wars: it's a fully automated moderator, a voting tool,
							an evidence collector, logic analyzer and a chat room for spectators complete with RPG mechanics. Quibblur was built for everyone, from
							middle-school debate clubs to middle-aged roast masters. You decide the topic, you decide the rules, so you
							decide what kind of argument you want. Please be respectful (but only if the rules say so), and enjoy!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`

});
