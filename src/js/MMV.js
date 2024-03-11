/*
@name: Multi-Media Viewer
@version: 0.0.1
@author: XHiddenProjects
@module-type: standard
@website: https://github.com/xhiddenprojects
*/
class MMV{
	/**
	 * Creates Multi-Media object
	 * @param {Element} elem - Tragets elements
	 * @returns {ImgViewer}
	 */
	constructor(elem){
		this.target = document.querySelector(elem);
	}
	/**
	 * Activates the object
	 * @returns {void}
	 */
	init(){
		this.target.setAttribute('mmv-status','active');
	}
	/**
	 * Configures Gallery container
	 * @param {JSON} o - Gallery Options
	 * @returns {void}
	 */
	gallery(o={}){
		if(o.hasOwnProperty('allowDescription')&&o['allowDescription']){
			
			[...this.target.querySelectorAll('img')].forEach((e)=>{
				let content = e.outerHTML;
				let container = document.createElement('div');
				container.className = 'imgviewer-container';
				container.innerHTML = content;
				container.innerHTML += '<div class="imgviewer-desc"><span class="text">'+(e.getAttribute('img-desc')&&e.getAttribute('img-desc')!=='' ? e.getAttribute('img-desc') : '')+'</span></div>';
				e.parentNode.replaceChild(container,e);
			});
		}
		if(o['cols']){
			if(o['cols']==='auto'){
				const screenWidth = document.body.clientWidth;
				if(screenWidth<1000){
					o['cols'] = 2;
				}
				this.target.style.gridTemplateColumns = 'repeat('+parseInt(o['cols'])+', 1fr)';
			}else if(o['cols']==='scroll'){
				this.target.setAttribute('scrollable',true);
			}
			
		}
		if(o['hover']){
			
			this.target.classList.add('imgviewer-hover');
			
		}
		if(o['zoom']===true||o['zoom']['active']===true){
			this.target.classList.add('imgviewer-zoom');
			this.target.innerHTML+=`<div class="imgviewer-display`+(o['zoom']['static'] ? ' static' : '')+`" `+(o['zoom']['transition'] ? 'imgviewer-animate="'+o['zoom']['transition']+'"' : '')+`>
				<div class="imgviewer-displayNav">
					<span class="imgviewer-display-close"></span>
					<button data-img-url="" class="imgviewer-dwnld" onclick="downloadImg(this);">Download</button>
					<button data-img-url="" onclick="copyImgURL(this);">Copy</button>
					<button data-img-url="" onclick="copyImg(this);">Clone</button>
					<a href="" target="_blank" class="imgviewer-displayRaw"><button>Open</button></a>
				</div>
				<div class="panel">
					<img src="" class="imgviewer-displayImg"/>
				</div>
			</div>`;
			[...this.target.querySelectorAll('img:not(.imgviewer-display img)')].forEach((e)=>{
				let src = e.src,
					alt = e.alt;
				e.addEventListener('click',(event, s=src, a=alt)=>{
					this.target.querySelector('.imgviewer-display .imgviewer-displayImg').src = s;
					[...this.target.querySelectorAll('.imgviewer-display .imgviewer-dwnld, .imgviewer-display .imgviewer-displayRaw')].forEach((e)=>{
						e.href = s;
					});
					this.target.querySelector('.imgviewer-display .imgviewer-dwnld').download = a;
					[...this.target.querySelectorAll('.imgviewer-display button[data-img-url]')].forEach((e)=>{
						e.setAttribute('data-img-url',s);
					});
					this.target.querySelector('.imgviewer-display').classList.add('show');
				});
			});
			this.target.querySelector('.imgviewer-display-close').addEventListener('click',()=>{
				this.target.querySelector('.imgviewer-display .imgviewer-displayImg').src = '';
				[...this.target.querySelectorAll('.imgviewer-display .imgviewer-dwnld, .imgviewer-display .imgviewer-displayRaw')].forEach((e)=>{
					e.href = '';
				});
				this.target.querySelector('.imgviewer-display .imgviewer-dwnld').download = '';
				[...this.target.querySelectorAll('.imgviewer-display button[data-img-url]')].forEach((e)=>{
					e.setAttribute('data-img-url','');
				});
				this.target.querySelector('.imgviewer-display').classList.remove('show');
			});
			if(!o['zoom']['static']){
				this.target.querySelector('.imgviewer-display .panel:not(.static)').addEventListener('click',()=>{
					this.target.querySelector('.imgviewer-display .imgviewer-displayImg').src = '';
					[...this.target.querySelectorAll('.imgviewer-display .imgviewer-dwnld, .imgviewer-display .imgviewer-displayRaw')].forEach((e)=>{
						e.href = '';
					});
					this.target.querySelector('.imgviewer-display .imgviewer-dwnld').download = '';
					[...this.target.querySelectorAll('.imgviewer-display button[data-img-url]')].forEach((e)=>{
						e.setAttribute('data-img-url','');
					});
					this.target.querySelector('.imgviewer-display').classList.remove('show');
				});
			}
		}	
	}
	/**
	 * Configures carousel container
	 * @param {JSON} o - Carousel options
	 * @returns {void}
	 */
	carousel(o={}){
		var pgn = 0,
			imgtotal = [...this.target.querySelectorAll('img')].length,
			bottom='';
			this.target.setAttribute('slide-index', 1);
		[...this.target.querySelectorAll('img')].forEach((e)=>{
			let content = e.outerHTML;
			let container = document.createElement('div');
			container.className = 'slide fade';
			container.innerHTML = '<div class="imgviewer-num">'+(pgn+=1)+'/'+imgtotal+'</div>';
			container.innerHTML += content;
			if(o.hasOwnProperty('allowDescription')&&o['allowDescription'])
				container.innerHTML += '<div class="imgviewer-desc">'+(e.getAttribute('img-desc')&&e.getAttribute('img-desc')!=='' ? e.getAttribute('img-desc') : '')+'</div>';
			e.parentNode.replaceChild(container,e);
		});
		if(o['control'].toLowerCase()==='auto'){
			this.target.setAttribute('imgviewer-carousel','auto');
			bottom+='';
		}else{
			this.target.setAttribute('imgviewer-carousel','manual');
			bottom+=` <a class="prev" onclick="slideMove(this.parentElement,this.parentElement.getAttribute(\'slide-index\'),-1)">&#10094;</a>
			<a class="next" onclick="slideMove(this.parentElement,this.parentElement.getAttribute(\'slide-index\'),1)">&#10095;</a>`;
		}
		bottom+=`<br/>
		<div style="text-align:center">
			`;
			for(let i=0;i<imgtotal;i++){
				bottom += '<span class="dot" '+(o['control'].toLowerCase()==='auto' ? '' : 'onclick="currentSlide(this.parentElement.parentElement,'+(i+1)+')"')+'></span>';
			}
		bottom+=`</div>`;
		this.target.innerHTML+=bottom;
		if(o['control'].toLowerCase()==='auto'){
			setInterval(()=>{showSlidesAuto(this.target, 1)}, (o['timeout'] ? o['timeout'] : 2000));
		}else{
			showSlides(this.target, parseInt(this.target.getAttribute('slide-index')), parseInt(this.target.getAttribute('slide-index')));
		}
		if(o['zoom']===true||o['zoom']['active']===true){
			this.target.classList.add('imgviewer-zoom');
			this.target.innerHTML+=`<div class="imgviewer-display`+(o['zoom']['static'] ? ' static' : '')+`" `+(o['zoom']['transition'] ? 'imgviewer-animate="'+o['zoom']['transition']+'"' : '')+`>
				<div class="imgviewer-displayNav">
					<span class="imgviewer-display-close"></span>
					<button data-img-url="" class="imgviewer-dwnld" onclick="downloadImg(this);">Download</button>
					<button data-img-url="" onclick="copyImgURL(this);">Copy</button>
					<button data-img-url="" onclick="copyImg(this);">Clone</button>
					<a href="" target="_blank" class="imgviewer-displayRaw"><button>Open</button></a>
				</div>
				<div class="panel">
					<img src="" class="imgviewer-displayImg"/>
				</div>
			</div>`;
			[...this.target.querySelectorAll('img:not(.imgviewer-display img)')].forEach((e)=>{
				let src = e.src,
					alt = e.alt;
				e.addEventListener('click',(event, s=src, a=alt)=>{
					this.target.querySelector('.imgviewer-display .imgviewer-displayImg').src = s;
					[...this.target.querySelectorAll('.imgviewer-display .imgviewer-dwnld, .imgviewer-display .imgviewer-displayRaw')].forEach((e)=>{
						e.href = s;
					});
					this.target.querySelector('.imgviewer-display .imgviewer-dwnld').download = a;
					[...this.target.querySelectorAll('.imgviewer-display button[data-img-url]')].forEach((e)=>{
						e.setAttribute('data-img-url',s);
					});
					this.target.querySelector('.imgviewer-display').classList.add('show');
				});
			});
			this.target.querySelector('.imgviewer-display-close').addEventListener('click',()=>{
				this.target.querySelector('.imgviewer-display .imgviewer-displayImg').src = '';
				[...this.target.querySelectorAll('.imgviewer-display .imgviewer-dwnld, .imgviewer-display .imgviewer-displayRaw')].forEach((e)=>{
					e.href = '';
				});
				this.target.querySelector('.imgviewer-display .imgviewer-dwnld').download = '';
				[...this.target.querySelectorAll('.imgviewer-display button[data-img-url]')].forEach((e)=>{
					e.setAttribute('data-img-url','');
				});
				this.target.querySelector('.imgviewer-display').classList.remove('show');
			});
			if(!o['zoom']['static']){
				this.target.querySelector('.imgviewer-display .panel:not(.static)').addEventListener('click',()=>{
					this.target.querySelector('.imgviewer-display .imgviewer-displayImg').src = '';
					[...this.target.querySelectorAll('.imgviewer-display .imgviewer-dwnld, .imgviewer-display .imgviewer-displayRaw')].forEach((e)=>{
						e.href = '';
					});
					this.target.querySelector('.imgviewer-display .imgviewer-dwnld').download = '';
					[...this.target.querySelectorAll('.imgviewer-display button[data-img-url]')].forEach((e)=>{
						e.setAttribute('data-img-url','');
					});
					this.target.querySelector('.imgviewer-display').classList.remove('show');
				});
			}
		}	
	}
	stack(o={}){
		var boxIndex=0,
			nth=1,
			translate=0,
			blur=0;
		let style='<style>';
		[...this.target.querySelectorAll('img')].forEach((e)=>{
			let content = e.outerHTML;
			let container = document.createElement('div');
			container.className = 'box view';
			container.tabIndex = boxIndex++;
			container.innerHTML += content;
			if(o.hasOwnProperty('allowDescription')&&o['allowDescription'])
				container.innerHTML += '<div class="imgviewer-desc"><span>'+(e.getAttribute('img-desc')&&e.getAttribute('img-desc')!=='' ? e.getAttribute('img-desc') : '')+'</span></div>';
			if(nth==1){
				style+=`[imgviewer-status][img-type="stack"] .view:nth-of-type(`+nth+`) {
					transform: translateZ(`+translate+`px) translateX(`+translate+`px);
				}\n`;
				translate-=40;
			}else{
				blur+=1;
				style+=`[imgviewer-status][img-type="stack"] .view:nth-of-type(`+nth+`) {
					transform: translateZ(`+(translate-=40)+`px) translateX(0px);
				}\n
				[imgviewer-status][img-type="stack"] .view:nth-of-type(`+nth+`) img{
					filter: blur(`+blur+`px);
				}`;
			}
			nth++;
			e.parentNode.replaceChild(container,e);
		});
		style+='</style>';
		this.target.innerHTML+=style;
	}
	lightbox(o={}){
		var slide=0,
			index=0,
			modal=`<div class="modal">
			<span class="close cursor" onclick="closeModal(this);">&times;</span>
			<div class="modal-content">`;
			this.target.setAttribute('slide-index',1);
		[...this.target.querySelectorAll('img')].forEach((e)=>{
			e.classList.add('hover-shadow');
			e.setAttribute('onclick', 'openModal(this.parentElement);lightboxCurrentSlide(this.parentElement.parentElement,'+(slide+=1)+');');
			let content = e.outerHTML;
			let container = document.createElement('div');
			container.className = 'col';
			container.innerHTML = content;
			modal+=` <div class="slide fade">
			<div class="numbertext">`+slide+` / `+([...this.target.querySelectorAll('img')].length)+`</div>
			<img src="`+e.src+`" style="width:100%">
		  </div>`;
			e.parentNode.replaceChild(container,e);
		});
		modal+=` <!-- Next/previous controls -->
		<a class="prev" onclick="lightboxplusSlides(this.parentElement.parentElement.parentElement,-1)">&#10094;</a>
		<a class="next" onclick="lightboxplusSlides(this.parentElement.parentElement.parentElement,1)">&#10095;</a>`+
		(o.hasOwnProperty('allowDescription')&&o['allowDescription'] ? `<div class="caption-container">
		  <p class="caption"></p>
		</div>` : '<div class="caption-container"><p></p></div>')+`
		`;
		[...this.target.querySelectorAll('img')].forEach((e)=>{
			modal+=`<div class="col">
			<img class="demo" src="`+e.src+`" onclick="lightboxCurrentSlide(this.parentElement.parentElement.parentElement.parentElement,`+(index+=1)+`)" alt="`+e.alt+`" img-desc="`+e.getAttribute('img-desc')+`">
		  </div>`;
		});
		modal+=`
		</div>`;
		this.target.innerHTML+=modal;
	}
	background(o={}){
		if(o.hasOwnProperty('multiple')&&o['multiple']){
			this.target.setAttribute('multiple','');
			if(this.target.querySelector('img')){
			[...this.target.querySelectorAll('img')].forEach((e)=>{
				e.outerHTML = '<div class="bg-image" style="background-image:url('+e.src+')"></div>';
			});
			}else if(this.target.querySelector('video')){
				[...this.target.querySelectorAll('video')].forEach((e)=>{
					e.outerHTML = '<div class="bg-image"><video loop autoplay muted src="'+e.querySelector('source').src+'"></video></div>';
				});
			}
			if(o.hasOwnProperty('transition')&&o['transition']){
				
			}
		}else{
			if(this.target.querySelector('img')){
				if(this.target.querySelectorAll('img').length>1){
					console.error('background must be only 1 image');
					return false;
				}else{
					this.target.setAttribute('style','background-image:url('+this.target.querySelectorAll('img')[0].src+');');
					this.target.querySelector('img').outerHTML = '<!--'+this.target.querySelector('img').outerHTML+'-->';
				}
			}else if(this.target.querySelector('video')){
				if(this.target.querySelectorAll('video').length>1){
					console.error('background must be only 1 video');
					return false;
				}else{
					this.target.innerHTML='<video loop autoplay muted src="'+this.target.querySelectorAll('video source')[0].src+'"></video>';
				}
			}
		}
	}
	heroimage(o={}){
		if(this.target.hasAttribute('hero-url')){
			this.target.setAttribute('style','background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+this.target.getAttribute('hero-url')+');');
			this.target.innerHTML = '<div class="hero-text">'+this.target.innerHTML+'</div>';
		}else{
			console.error('hero-url attribute does not exists');
			return false;
		}
	}
	video(o={}){
		if(this.target.querySelectorAll('video').length>1){
			console.error('You must only have one video in the frame');
			return false;
		}else{
			let ppIcon, state;
			this.target.tabIndex = '1';
			this.target.setAttribute('video-speed',1);
			this.target.setAttribute('video-quality','auto');
			this.target.setAttribute('video-subtitle','none');
			this.target.addEventListener('keydown',(e)=>{
				let key = e.keyCode||e.witch;
				if(key==75||key==32){
					changePlayState(this.target.querySelector('.video-controls .playstatebtn'));
				}else if(key==77){
					toggleVolume(this.target.querySelector('.video-controls .volume-control'));
				}else if(key==73){
					toggleMiniplayer(this.target.querySelector('.miniplayer .miniplayerBtn'));
				}else if(key==70||key==27){
					if(this.target.classList.contains('fullscreen')){
						if(key==27)
							toggleFullScreen(this.target.querySelector('.fullscreen .fullscreenBtn'));
						else
							toggleFullScreen(this.target.querySelector('.fullscreen .fullscreenBtn'));
					}else{
						if(key==70)
							toggleFullScreen(this.target.querySelector('.fullscreen .fullscreenBtn'));
					}
				}else if(key==37){
					setTime(this.target.querySelector('video'),(o.hasOwnProperty('skip')&&typeof(o['skip']==='number') ? o['skip'] : 5),'sub');
				}else if(key==39){
					setTime(this.target.querySelector('video'),(o.hasOwnProperty('skip')&&typeof(o['skip']==='number') ? o['skip'] : 5),'add');
				}
			});
			this.target.querySelector('video').setAttribute('onloadedmetadata','updateTime(this);');
			this.target.querySelector('video').setAttribute('ontimeupdate','updateProgress(this);updateTime(this);');
			this.target.innerHTML=`<div class="video-container">`+this.target.innerHTML+`
			<div class="video-footer">
				<div class="video-progress" onmouseout="resetProgressHover(this);" onmousemove="changeProgressHover(event,this);" onclick="changeProgressState(event,this);">
					<div class="video-progress-hover">
						<div class="time-popup"></div>
					</div>
					<div class="video-progress-bg" style="`+(o.hasOwnProperty('bar')&&typeof(o['bar'])==='string' ? 'background-color:'+o['bar']+';' : '')+`width:0%;"></div>
				</div>
				<div class="video-controls">
					<div class="video-controls-container">
						<button title="`+state+` (k)" onclick="changePlayState(this);" class="playstatebtn `+ppIcon+`"></button>
						<div class="control-volume">
							<button title="Mute (m)" class="volume-control control-unmute" onclick="toggleVolume(this)"></button>
							<input type="range" min="0" max="1" step="0.1" value="1" class="volume-slider form-range" oninput="changeVolume(this)"/>
						</div>
						<span class="timeStamp"><span class="currentTime">0:00</span>/<span class="durTime">0:00</span></span>
					</div>
					<div class="video-controls-container">
						<div class="autoplay-switch">
							<input type="checkbox" class="autoplay-input" role="switch" title="Autoplay is off" onclick="setAutoPlay(this);"/>
							<label class="autoplay-label"></label>
						</div>
						<div class="btn-group dropup">
						<button type="button" class="btn btn-secondary dropdown-toggle settingBtn" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
							<i class="fa-solid fa-gear"></i>
						</button>
						<ul class="dropdown-menu">
							<li><a href="#" class="dropdown-item"  onclick="changeSpeed(this.querySelector(\'span\'));"><i class="fa-solid fa-rotate-right"></i> Playback speed <span class="settingBadge vidspeed">Normal</span></a></li>
							<li><a href="#" class="dropdown-item"  onclick="changeLoop(this.querySelector(\'span\'));"><i class="fa-solid fa-repeat"></i> Loop <span class="settingBadge vidLoop">Off</span></a></li>
							<li><a href="#" class="dropdown-item"  onclick=\'changeSubtitle(this.querySelector(\"span\"), `+(o.hasOwnProperty('subtitles') ? JSON.stringify(o.subtitles) : '"subtitles":{"items":{"Off":"Off"}}')+`);\'><i class="fa-solid fa-closed-captioning"></i> Subtitles <span class="settingBadge vidsubtitle">Off</span> <span class="vidsubtitle-label">Off</span></a></li>
							<li><a href="#" class="dropdown-item"  onclick=\'changeQuality(this.querySelector(\"span\"), `+(o.hasOwnProperty('quality') ? JSON.stringify(o.quality) : '"quality":{"Auto":""}')+`);\'><i class="fa-solid fa-sliders"></i> Quality <span class="settingBadge vidquality">Auto</span></a></li>
						</ul>
					</div>
					<div class="miniplayer">
						<button class="miniplayerBtn" title="Miniplayer (i)" onclick="toggleMiniplayer(this);"><i class="fa-light fa-square-arrow-down-right"></i></button>
					</div>
					<div class="fullscreen">
						<button class="fullscreenBtn" title="Fullscreen (f)" onclick="toggleFullScreen(this);"><i class="fa-solid fa-expand"></i></button>
		]			</div>
					</div>
				</div>
			</div>
			</div>`;
		}
	}
	audio(o={}){
		if(this.target.querySelector('audio')&&this.target.querySelectorAll('audio').length==1){
			this.target.setAttribute('audio-speed',1);
			let getAuto = this.target.querySelectorAll('audio')[0];
			getAuto.setAttribute('onloadedmetadata','updateTime(this)');
			getAuto.setAttribute('ontimeupdate','updateProgress(this, \'audio\');updateTime(this);');
			this.target.innerHTML = `<button title="play" onclick="changePlayState(this,\'\',\'audio\');" class="playstatebtn control-play"></button>&nbsp;<span class="currentTime">0:00</span>/<span class="durTime">0:00</span>&nbsp;
			<div class="audioBar"  onmouseout="resetProgressHover(this,\'audio\');" onmousemove="changeProgressHover(event,this,\'audio\');" onclick="changeProgressState(event,this,\'audio\');">
				<div class="audio-progress-hover">
						<div class="time-popup"></div>
				</div>
				<div`+(o.hasOwnProperty('bar')&&typeof(o['bar'])==='string' ? ' style="background-color:'+o['bar']+'"' : '')+` class="audioBar-progress"></div>
			</div>`+getAuto.outerHTML+`<div class="control-volume">
			<button title="Mute" class="volume-control control-unmute" onclick="toggleVolume(this,\'audio\')"></button>
			<input type="range" min="0" max="1" step="0.1" value="1" class="volume-slider form-range" oninput="changeVolume(this,\'\',\'audio\')"/>
		</div>
		<div class="autoplay-switch">
				<input type="checkbox" class="autoplay-input" role="switch" title="Autoplay is off" onclick="setAutoPlay(this,\'audio\');"/>
				<label class="autoplay-label"></label>
		</div>
		<div class="btn-group dropup audio-options">
			<button type="button" class="btn border-0 bg-transparent dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="fa-solid fa-ellipsis-vertical"></i>
			</button>
			<ul class="dropdown-menu">
				<li><a href="#" class="dropdown-item"  onclick="changeSpeed(this.querySelector(\'span\'),\'audio\');"><i class="fa-solid fa-rotate-right"></i> Playback speed <span class="settingBadge audiopeed">Normal</span></a></li>
				<li><a href="#" class="dropdown-item"  onclick="changeLoop(this.querySelector(\'span\'),\'audio\');"><i class="fa-solid fa-repeat"></i> Loop <span class="settingBadge audioLoop">Off</span></a></li>
			</ul>
		</div>`;
		}else{
			console.error('You must have only one audio');
			return false;
		}
	}
}
//Video controls
/**
 * Changes video playstate
 * @param {Element} e - Element of play/pause button 
 */
function changePlayState(e, force='', type='video'){
	if(type==='video'){
		if(force!==''){
			if(force==='pause'){
				e.classList.remove('control-pause');
				e.classList.add('control-play');
				e.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute('video-status','paused');
				e.parentElement.parentElement.parentElement.parentElement.querySelector('video').pause();
				e.title = 'Play (k)';
			}else{
				e.classList.remove('control-play');
				e.classList.add('control-pause');
				e.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute('video-status','playing');
				e.parentElement.parentElement.parentElement.parentElement.querySelector('video').play();
				e.title = 'Pause (k)';
			}
		}else{
			if(e.classList.contains('control-pause')){
				e.classList.remove('control-pause');
				e.classList.add('control-play');
				e.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute('video-status','paused');
				e.parentElement.parentElement.parentElement.parentElement.querySelector('video').pause();
				e.title = 'Play (k)';
			}else{
				e.classList.remove('control-play');
				e.classList.add('control-pause');
				e.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute('video-status','playing');
				e.parentElement.parentElement.parentElement.parentElement.querySelector('video').play();
				e.title = 'Pause (k)';
			}
		}
	}else{
		if(force!==''){
			if(force==='pause'){
				e.classList.remove('control-pause');
				e.classList.add('control-play');
				e.parentElement.setAttribute('audio-status','paused');
				e.parentElement.querySelector('audio').pause();
				e.title = 'Play';
			}else{
				e.classList.remove('control-play');
				e.classList.add('control-pause');
				e.parentElement.setAttribute('audio-status','playing');
				e.parentElement.querySelector('audio').play();
				e.title = 'Pause';
			}
		}else{
			if(e.classList.contains('control-pause')){
				e.classList.remove('control-pause');
				e.classList.add('control-play');
				e.parentElement.setAttribute('audio-status','paused');
				e.parentElement.querySelector('audio').pause();
				e.title = 'Play';
			}else{
				e.classList.remove('control-play');
				e.classList.add('control-pause');
				e.parentElement.setAttribute('audio-status','playing');
				e.parentElement.querySelector('audio').play();
				e.title = 'Pause';
			}
		}
	}

	
}
/**
 * Updates progress on video
 * @param {Element} e - Video element
 */
function updateProgress(e, type='video'){
	let currentTime = e.currentTime,
		totalTime = e.duration;
		if(type==='video'){
			e.parentElement.querySelector('.video-progress-bg').style.width = ((currentTime/totalTime)*100)+'%';
			if(((currentTime/totalTime)*100)===100){
				e.parentElement.parentElement.setAttribute('video-status','paused');
				e.parentElement.querySelector('.control-pause').className = 'playstatebtn control-play';
			}
		}else{
			e.parentElement.querySelector('.audioBar-progress').style.width = ((currentTime/totalTime)*100)+'%';
			if(((currentTime/totalTime)*100)===100){
				e.parentElement.parentElement.setAttribute('audio-status','paused');
				e.parentElement.querySelector('.control-pause').className = 'playstatebtn control-play';
			}
		}
}
/**
 * Changes the progress time
 * @param {Event} event - Click event
 * @param {Element} e - Progress element
 */
function changeProgressState(event, e, type='video'){
	if(type==='video'){
		const video = e.parentElement.parentElement.querySelector('video');
		const progressTime = (event.offsetX / e.offsetWidth) * video.duration;
		video.currentTime = progressTime;
	}else{
		const audio = e.parentElement.querySelector('audio');
		const progressTime = (event.offsetX / e.offsetWidth) * audio.duration;
		audio.currentTime = progressTime;
	}
}
function toggleVolume(e, type='video'){
	if(type==='video'){
		if(e.classList.contains('control-unmute')){
			e.classList.remove('control-unmute');
			e.classList.add('control-mute');
			e.parentElement.querySelector('input').value='0';
			e.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('video').volume = 0;
			e.title = 'Unmute (m)';
		}else{
			e.classList.remove('control-mute');
			e.classList.add('control-unmute');
			e.parentElement.querySelector('input').value='1';
			e.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('video').volume = 1;
			e.title = 'Mute (m)';
		}
	}else{
		if(e.classList.contains('control-unmute')){
			e.classList.remove('control-unmute');
			e.classList.add('control-mute');
			e.parentElement.querySelector('input').value='0';
			e.parentElement.parentElement.querySelector('audio').volume = 0;
			e.title = 'Unmute';
		}else{
			e.classList.remove('control-mute');
			e.classList.add('control-unmute');
			e.parentElement.querySelector('input').value='1';
			e.parentElement.parentElement.querySelector('audio').volume = 1;
			e.title = 'Mute';
		}
	}
	
}
/**
 * Highlights the video progress
 * @param {Event} event 
 * @param {Element} e - Element
 */
function changeProgressHover(event, e, type='video'){
	if(type==='video'){
		const video = e.parentElement.parentElement.querySelector('video');
		const progressTime = (event.offsetX / e.offsetWidth);
		e.querySelector('.video-progress-hover').style.width = (progressTime*100)+'%';
		durHrs = Math.floor(((((progressTime*100)*video.duration)/100) / 3600));
		durMin = Math.floor(((((progressTime*100)*video.duration)/100) % 3600 / 60));
		durSec = Math.floor(((((progressTime*100)*video.duration)/100) % 3600 % 60));
		e.querySelector('.video-progress-hover .time-popup').innerText = (durHrs >= 1 ? (durHrs+':'+(durMin < 10 ? '0'+durMin : durMin)+':'+(durSec<10 ? '0'+durSec : durSec)) : (durMin+':'+(durSec<10 ? '0'+durSec : durSec)));;
		e.querySelector('.video-progress-hover .time-popup').style.left = event.offsetX+'px';
	}else{
		const audio = e.parentElement.querySelector('audio');
		const progressTime = (event.offsetX / e.offsetWidth);
		e.querySelector('.audio-progress-hover').style.width = (progressTime*100)+'%';
		durHrs = Math.floor(((((progressTime*100)*audio.duration)/100) / 3600));
		durMin = Math.floor(((((progressTime*100)*audio.duration)/100) % 3600 / 60));
		durSec = Math.floor(((((progressTime*100)*audio.duration)/100) % 3600 % 60));
		e.querySelector('.audio-progress-hover .time-popup').innerText = (durHrs >= 1 ? (durHrs+':'+(durMin < 10 ? '0'+durMin : durMin)+':'+(durSec<10 ? '0'+durSec : durSec)) : (durMin+':'+(durSec<10 ? '0'+durSec : durSec)));;
		e.querySelector('.audio-progress-hover .time-popup').style.left = event.offsetX+'px';
	}
}
/**
 * Formats seconds to time format
 * @param {Number} t 
 */
function updateTime(t){
	let currentSec, currentMin, currentHrs, durSec, durMin, durHrs;
	currentHrs = Math.floor(t.currentTime / 3600);
	currentMin = Math.floor(t.currentTime % 3600 / 60);
	currentSec = Math.floor(t.currentTime % 3600 % 60);

	durHrs = Math.floor(t.duration / 3600);
	durMin = Math.floor(t.duration % 3600 / 60);
	durSec = Math.floor(t.duration % 3600 % 60);
	if(t.parentElement.querySelector('.durTime'))
		t.parentElement.querySelector('.durTime').innerHTML = (durHrs >= 1 ? (durHrs+':'+(durMin < 10 ? '0'+durMin : durMin)+':'+(durSec<10 ? '0'+durSec : durSec)) : (durMin+':'+(durSec<10 ? '0'+durSec : durSec)));
	if(t.parentElement.querySelector('.currentTime'))
		t.parentElement.querySelector('.currentTime').innerHTML = (currentHrs >= 1 ? (currentHrs+':'+(currentMin < 10 ? '0'+currentMin : currentMin)+':'+(currentSec<10 ? '0'+currentSec : currentSec)) : (currentMin+':'+(currentSec<10 ? '0'+currentSec : currentSec)));
}
/**
 * Adds/remove seconds off the video
 * @param {*} e 
 * @param {*} amount 
 * @param {*} set 
 */
function setTime(e, amount, set){
	switch(set.toLowerCase()){
		case 'add':
			e.currentTime += amount;
		break;
		case 'sub':
			e.currentTime -= amount;
		break;
	}
}
/**
 * Changes volume
 * @param {Element} e 
 * @param {Number} v 
 */
function changeVolume(e,type='video'){
	if(type==='video'){
		if(e.value==0){
			e.parentElement.querySelector('button').classList.remove('control-unmute');
			e.parentElement.querySelector('button').classList.add('control-mute');
		}else{
			e.parentElement.querySelector('button').classList.remove('control-mute');
			e.parentElement.querySelector('button').classList.add('control-unmute');
		}
		e.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('video').volume = e.value;
	}else{
		if(e.value==0){
			e.parentElement.querySelector('button').classList.remove('control-unmute');
			e.parentElement.querySelector('button').classList.add('control-mute');
		}else{
			e.parentElement.querySelector('button').classList.remove('control-mute');
			e.parentElement.querySelector('button').classList.add('control-unmute');
		}
		e.parentElement.parentElement.querySelector('audio').volume = e.value;
	}
}

/**
 * Resets progress hover
 * @param {Element} e - Element
 */
function resetProgressHover(e, type='video'){
	if(type==='video'){
		e.querySelector('.video-progress-hover').style.width = '0%';
	}else{
		e.querySelector('.audio-progress-hover').style.width = '0%';
	}
}
/**
 * Toggles miniplayer
 * @param {Element} e - Element
 */
function toggleMiniplayer(e){
	e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle('miniplayer');
	e.querySelector('i').classList.toggle('fa-square-arrow-down-right');
	e.querySelector('i').classList.toggle('fa-square-arrow-up-left');
}
function toggleFullScreen(e){
	e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle('fullscreen');
	if(e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('fullscreen')){
		e.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML+=`<div class="fullscreenMode">
			Press <span class="key">Esc</span> to exit full screen.
		</div>`;
	}else{
		e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.fullscreenMode').remove();
	}
	e.querySelector('i').classList.toggle('fa-expand');
	e.querySelector('i').classList.toggle('fa-compress');
}
/**
 * Toggles autoplay
 * @param {Element} e - Checkbox element
 */
function setAutoPlay(e,type='video'){
	if(type==='video'){
		const base = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
		if(e.checked){
			base.querySelector('video').autoplay = true;
			changePlayState(base.querySelector('.playstatebtn'),'playing');
			e.title = 'Autoplay is on';
		}else{
			base.querySelector('video').autoplay = false;
			e.title = 'Autoplay is off';
		}
	}else{
		const base = e.parentElement.parentElement.parentElement;
		if(e.checked){
			base.querySelector('audio').autoplay = true;
			changePlayState(base.querySelector('.playstatebtn'),'playing', 'audio');
			e.title = 'Autoplay is on';
		}else{
			base.querySelector('audio').autoplay = false;
			e.title = 'Autoplay is off';
		}
	}
}
/**
 * Changes the video speed.
 * @param {Element} e - Speed change 
 */
function changeSpeed(e,type='video'){
	if(type==='video'){
		const base = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
		let getSpeed = base.getAttribute('video-speed');
		switch(parseFloat(getSpeed)){
			case 0.25:
				e.innerHTML = 'x0.5';
				base.setAttribute('video-speed',0.5);
				base.querySelector('video').playbackRate = 0.5;
			break;
			case 0.5:
				e.innerHTML = 'x0.75';
				base.setAttribute('video-speed',0.75);
				base.querySelector('video').playbackRate = 0.75;
			break;
			case 0.75:
				e.innerHTML = 'Normal';
				base.setAttribute('video-speed',1);
				base.querySelector('video').playbackRate = 1.0;
			break;
			case 1:
				e.innerHTML = 'x1.25';
				base.setAttribute('video-speed',1.25);
				base.querySelector('video').playbackRate = 1.25;
			break;
			case 1.25:
				e.innerHTML = 'x1.5';
				base.setAttribute('video-speed',1.5);
				base.querySelector('video').playbackRate = 1.5;
			break;
			case 1.5:
				e.innerHTML = 'x1.75';
				base.setAttribute('video-speed',1.75);
				base.querySelector('video').playbackRate = 1.75;
			break;
			case 1.75:
				e.innerHTML = 'x2';
				base.setAttribute('video-speed',2);
				base.querySelector('video').playbackRate = 2.0;
			break;
			case 2:
				e.innerHTML = 'x0.25';
				base.setAttribute('video-speed',0.25);
				base.querySelector('video').playbackRate = 0.25;
			break;
		}
	}else{
		const base = e.parentElement.parentElement.parentElement.parentElement.parentElement;
		let getSpeed = base.getAttribute('audio-speed');
		switch(parseFloat(getSpeed)){
			case 0.25:
				e.innerHTML = 'x0.5';
				base.setAttribute('audio-speed',0.5);
				base.querySelector('audio').playbackRate = 0.5;
			break;
			case 0.5:
				e.innerHTML = 'x0.75';
				base.setAttribute('audio-speed',0.75);
				base.querySelector('audio').playbackRate = 0.75;
			break;
			case 0.75:
				e.innerHTML = 'Normal';
				base.setAttribute('audio-speed',1);
				base.querySelector('audio').playbackRate = 1.0;
			break;
			case 1:
				e.innerHTML = 'x1.25';
				base.setAttribute('audio-speed',1.25);
				base.querySelector('audio').playbackRate = 1.25;
			break;
			case 1.25:
				e.innerHTML = 'x1.5';
				base.setAttribute('audio-speed',1.5);
				base.querySelector('audio').playbackRate = 1.5;
			break;
			case 1.5:
				e.innerHTML = 'x1.75';
				base.setAttribute('audio-speed',1.75);
				base.querySelector('audio').playbackRate = 1.75;
			break;
			case 1.75:
				e.innerHTML = 'x2';
				base.setAttribute('audio-speed',2);
				base.querySelector('audio').playbackRate = 2.0;
			break;
			case 2:
				e.innerHTML = 'x0.25';
				base.setAttribute('audio-speed',0.25);
				base.querySelector('audio').playbackRate = 0.25;
			break;
		}
	}
}
/**
 * Toggles video loop
 * @param {*} e 
 */
function changeLoop(e, type='video'){
	if(type==='video'){
		const base = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
		if(e.innerText.toLowerCase()==='off'){
			e.innerText = 'On';
			base.querySelector('video').loop = true;
		}else{
			e.innerText = 'Off';
			base.querySelector('video').loop = false;
		}
	}else{
		const base = e.parentElement.parentElement.parentElement.parentElement.parentElement;
		if(e.innerText.toLowerCase()==='off'){
			e.innerText = 'On';
			base.querySelector('audio').loop = true;
		}else{
			e.innerText = 'Off';
			base.querySelector('audio').loop = false;
		}
	}
}
function changeQuality(e, opt){
	let q = Object.keys(opt),
		res = Object.values(opt);
	q.sort();
	res.sort();
	let index = q.indexOf(e.innerText);
	index = (index-1 < 0 ? q.length-1 : index-1);
	e.innerText = q[index];
	const base = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	base.setAttribute('video-quality',q[index].toLowerCase());
	const video = base.querySelector('video')
		video.querySelector('source').src = res[index];
		video.load();
		video.play();
	changePlayState(base.querySelector('.playstatebtn'),'playing');

}
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
	  r: parseInt(result[1], 16),
	  g: parseInt(result[2], 16),
	  b: parseInt(result[3], 16)
	} : null;
  }
function changeSubtitle(e, opt){
	(!opt['items']['Off']  ? opt['items']['Off'] = 'Off' : '');
	let q = Object.keys(opt['items']),
		res = Object.values(opt['items']);
	q.sort();
	res.sort();
	let index = q.indexOf(e.innerText);
	let getUserLang = navigator.language || navigator.userLanguage;

	const langBase = new Intl.DisplayNames([getUserLang], {
		type: 'language'
	});
	index = (index+1 > q.length-1 ? 0 : index+1);
	
	e.innerText = q[index];
	e.parentElement.querySelector('.vidsubtitle-label').innerText = '('+langBase.of(q[index])+')';
	const base = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	base.setAttribute('video-subtitle',q[index].toLowerCase());
	const video = base.querySelector('video');
	
	if(q[index].toLowerCase()==='off'){
		if(video.textTracks){
			video.textTracks[0].mode = 'hidden';
		}
		video.querySelector('track').remove();
	}else{
		let getLang = langBase.of(q[index]),track;
		if(video.querySelector('track')){
		video.querySelector('track').remove();
		track = document.createElement('track');
		track.src = res[index];
		track.kind = 'subtitles';
		track.srclang = q[index].toLowerCase();
		track.label = getLang;
		if(opt.hasOwnProperty('template')){
			document.documentElement.style.setProperty('--track-size',opt['template']['size']);
			document.documentElement.style.setProperty('--track-color-opacity',(opt['template']['color-opacity'] ? opt['template']['color-opacity'] : 1));
			document.documentElement.style.setProperty('--track-bg-opacity',(opt['template']['bg-opacity'] ? opt['template']['bg-opacity'] : 1));
			document.documentElement.style.setProperty('--track-color',hexToRgb(opt['template']['color'])['r']+','+hexToRgb(opt['template']['color'])['g']+','+hexToRgb(opt['template']['color'])['b']+',var(--track-color-opacity)');
			document.documentElement.style.setProperty('--track-bg',hexToRgb(opt['template']['bg'])['r']+','+hexToRgb(opt['template']['bg'])['g']+','+hexToRgb(opt['template']['bg'])['b']+',var(--track-bg-opacity)');
			document.documentElement.style.setProperty('--track-font',(opt['template']['family'] ? opt['template']['family'] : 'sans-serif'));
		}
		video.appendChild(track);
		if(video.textTracks){
			video.textTracks[0].mode = 'showing';
		}
		}else{
		track = document.createElement('track');
		track.src = res[index];
		track.kind = 'subtitles';
		track.srclang = q[index].toLowerCase();
		track.label = getLang;
		if(opt.hasOwnProperty('template')){
			document.documentElement.style.setProperty('--track-size',opt['template']['size']);
			document.documentElement.style.setProperty('--track-color-opacity',(opt['template']['color-opacity'] ? opt['template']['color-opacity'] : 1));
			document.documentElement.style.setProperty('--track-bg-opacity',(opt['template']['bg-opacity'] ? opt['template']['bg-opacity'] : 1));
			document.documentElement.style.setProperty('--track-color',hexToRgb(opt['template']['color'])['r']+','+hexToRgb(opt['template']['color'])['g']+','+hexToRgb(opt['template']['color'])['b']+',var(--track-color-opacity)');
			document.documentElement.style.setProperty('--track-bg',hexToRgb(opt['template']['bg'])['r']+','+hexToRgb(opt['template']['bg'])['g']+','+hexToRgb(opt['template']['bg'])['b']+',var(--track-bg-opacity)');
			document.documentElement.style.setProperty('--track-font',(opt['template']['family'] ? opt['template']['family'] : 'sans-serif'));
		}
		video.appendChild(track);
			if(video.textTracks){
				video.textTracks[0].mode = 'showing';
			}
		}
	}
}
/**
 * Copies Image URL
 * @param {*} e - image URL
 * @returns {undefined|boolean}
 */
function copyImgURL(e){
	try{
		navigator.clipboard.writeText(e.getAttribute('data-img-url'));
	}catch(err){
		alert('Failed to copy');
		return false;
	}
	alert('Copied URL');
}
/**
 * Copies Image
 * @param {*} e - Image URL
 * @returns {undefined|boolean}
 */
async function copyImg(e){
	const setToClipboard = async blob => {
		const d = [new ClipboardItem({[blob.type]: blob})];
			try{
				await navigator.clipboard.write(d);
			}catch(e){
				alert("Failed to copy to clipboard");
				console.error(e);
				return false;
			}
			alert("Successfully copied to clipboard!");
		}
		const response = await fetch(e.getAttribute('data-img-url'));
		const blob = await response.blob();
		await setToClipboard(blob);
}
/**
 * Downloads Image
 * @param {*} e - Image URL
 * @returns {undefined|boolean}
 */
function downloadImg(e){
	fetch(e.getAttribute('data-img-url'))
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'filename';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
//Manual carousel

// Next/previous controls
function slideMove(e,i,n) {
	i = parseInt(i);
	i+=n;
	e.setAttribute('slide-index', i);
  showSlides(e,i);
}

// Thumbnail image controls
function currentSlide(e,n) {	
	e.setAttribute('slide-index', n);
  showSlides(e,i=n);
}

function showSlides(e,n,k=1) {
  let i=k;
  let slides = e.querySelectorAll('.slide');
  let dots = e.querySelectorAll('.dot');
  if (n > slides.length) {e.setAttribute('slide-index',1);}
  if (n < 1) {e.setAttribute('slide-index', slides.length)}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[parseInt(e.getAttribute('slide-index'))-1].style.display = "block";
  dots[parseInt(e.getAttribute('slide-index'))-1].className += " active";
}
function showSlidesAuto(e, k=1) {
	let i=k;
	let slides = e.querySelectorAll(".slide");
	let dots = e.querySelectorAll('.dot');
	for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	  }
	if (parseInt(e.getAttribute('slide-index')) > slides.length) {e.setAttribute('slide-index',1);}
	slides[parseInt(e.getAttribute('slide-index'))-1].style.display = "block";
	dots[parseInt(e.getAttribute('slide-index'))-1].className += " active";
	let x = parseInt(e.getAttribute('slide-index'));
	x+=1;
	e.setAttribute('slide-index', x);
}

//lightbox
function openModal(e) {
	e.parentElement.querySelector('.modal').style.display = "block";
}
function closeModal(e) {
	e.parentElement.style.display = "none";
}
function lightboxplusSlides(e,n) {
	i = parseInt(e.getAttribute('slide-index'));
	i+=n;
	e.setAttribute('slide-index', i);
	lightBoxSlide(e, i);
  }
function lightboxCurrentSlide(e,n) {
	e.setAttribute('slide-index', n);
	lightBoxSlide(e,i = n);
  }
  
  function lightBoxSlide(e,n) {
	var i;
	var slides = e.querySelectorAll(".slide");
	var dots = e.querySelectorAll(".demo");
	var captionText = e.querySelector(".caption");
	if (n > slides.length) {e.setAttribute('slide-index',1);}
	if (n < 1) {e.setAttribute('slide-index',slides.length)}
	slideIndex = parseInt(e.getAttribute('slide-index'));
	for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
	  dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
	(captionText ? captionText.innerHTML = dots[slideIndex-1].getAttribute('img-desc') : '');
  }