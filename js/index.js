var keys = document.querySelectorAll('.key'),
	sustain = document.querySelector('#sus'),
	record = document.querySelector('#record'),
	recordBtn = document.querySelector('[for="record"]'),
	play = document.querySelector('#playback');

var context = new AudioContext(),
	notes = {},
	isRecording = false,
	isPlayback = false,
	_record = { start : null, sequence : [] };


record.addEventListener('change',function () {	

	if ( isPlayback ) {
		this.checked = false;
		return;
	}

	isRecording = this.checked;
	if ( isRecording ) {
		// new record evertime record is activated
		_record.start = Date.now();
		_record.sequence = [];
		recordBtn.className = recordBtn.className.replace('grey','red');
	} else {
		recordBtn.className = recordBtn.className.replace('red','grey');
		console.log('_record',_record);
	}
});

play.addEventListener('click',function () {	

	if ( isRecording || isPlayback ) return;

	if ( _record.sequence.length ) {
		isPlayback = true;
		console.log('playing');
		_record.sequence.forEach(function (_note,_index) {
			setTimeout(function () {
				notes[_note.noteId].play();
				if ( _index == _record.sequence.length - 1 ) {
					isPlayback = false;
					console.log('stopped');
				}
			},_note.delay);
		});
	}
});


[].forEach.call(keys,function(el){

	var _note = {};

	_note.el = el;
	_note.f = el.getAttribute('data-freq');
	_note.octave = el.getAttribute('data-octave');
	_note.note = el.getAttribute('data-note');
	_note.id = _note.octave+_note.note;
	_note.uiTimeout = null,
	_note.oscillator = null,
	_note.gainNode = null;

	_note.play = function () {

		if ( _note.oscillator ) return;

		_note.oscillator = context.createOscillator();
	    _note.gainNode = context.createGain();

	    // connect
	    _note.oscillator.connect(_note.gainNode);
	    _note.gainNode.connect(context.destination);

	    _note.oscillator.frequency.value = _note.f;
	    _note.gainNode.gain.value = 0.15;
	    _note.oscillator.start(context.currentTime);

	    // check use of sustain
	    // if ( !sustain.checked ) {
	    	_note.oscillator.stop(context.currentTime + 1.25);
	    	_note.gainNode.gain.setTargetAtTime(0, context.currentTime, 0.3);
	    	_note.oscillator = null;
			_note.gainNode = null;
	    // }	        

	    // update ui
	    _note.el.setAttribute('aria-pressed',true);
	    setTimeout(function () {
	    	_note.el.removeAttribute('aria-pressed');
	    },100);

	    // record if activated
	    if ( isRecording ) {
	    	_record.sequence.push( { delay : Date.now() - _record.start, noteId : _note.id } );
	    }
	}

	// _note.stop = function () {		

	// 	_note.el.removeAttribute('aria-pressed');		

	// 	if ( !_note.oscillator ) return;

	// 	if ( sustain.checked ) {
	//     	_note.oscillator.stop(context.currentTime + 1.25);
	//     	// fadeout
	// 	    _note.gainNode.gain.setTargetAtTime(0, context.currentTime, 0.3);
	// 	    _note.oscillator = null;
	// 		_note.gainNode = null;
	//     }	
	// }

	// mousedown
	_note.el.addEventListener('mousedown',_note.play);

	// mouseup
	// _note.el.addEventListener('mouseup',_note.stop);

	notes[_note.id] = _note;

});

console.log('notes',notes);



/*
	BIND KEYBOARD KEYS
 */

(function () {
	
	// keycode to note map
	var keyMap = {

		81 : { octave : 4, note : 'C' },
		87 : { octave : 4, note : 'D' },
		69 : { octave : 4, note : 'E' },
		82 : { octave : 4, note : 'F' },
		84 : { octave : 4, note : 'G' },
		89 : { octave : 4, note : 'A' },
		85 : { octave : 4, note : 'B' },

		50 : { octave : 4, note : 'C#'},
		51 : { octave : 4, note : 'D#'},
		53 : { octave : 4, note : 'F#'},
		54 : { octave : 4, note : 'G#'},
		55 : { octave : 4, note : 'A#'},

		90 : { octave : 3, note : 'C'},
		88 : { octave : 3, note : 'D'},
		67 : { octave : 3, note : 'E'},
		86 : { octave : 3, note : 'F'},
		66 : { octave : 3, note : 'G'},
		78 : { octave : 3, note : 'A'},
		77 : { octave : 3, note : 'B'},

		83 : { octave : 3, note : 'C#'},
		68 : { octave : 3, note : 'D#'},
		71 : { octave : 3, note : 'F#'},
		72 : { octave : 3, note : 'G#'},
		74 : { octave : 3, note : 'A#'}

	};

	document.addEventListener('keydown',function (e) {
		var key = keyMap[e.keyCode];
		if ( !key ) return;

		var _note = notes[key.octave+key.note];

		if ( _note ) _note.play();
	});

	// document.addEventListener('keyup',function (e) {
	// 	var key = keyMap[e.keyCode];
	// 	if ( !key ) return;

	// 	var _note = notes[key.octave+key.note];

	// 	if ( _note ) _note.stop();
	// });

})();