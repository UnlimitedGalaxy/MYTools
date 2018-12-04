import Tween from './tween';

class Core {
	constructor(opt) {
		this._init(opt);
		this.state = 'init';
	}
	
	_init(opt) {
		this._initValue(opt.value);
		this.duration = opt.duration || 1000;
		this.timingFunction = opt.timingFunction || 'linear';
		this.renderFunction = opt.render || this._defaultFunc;
		
		/* Events */
		this.onPlay = opt.onPlay;
		this.onEnd = opt.onEnd;
		this.onStop = opt.onStop;
		this.onReset = opt.onReset;
	}
	
	_initValue(value) {
		this.value = [];
		value.forEach(item => {
			this.value.push({
				start: parseFloat(item[0]),
				end: parseFloat(item[1]),
			});
		})
	}
	
	_loop() {
		const t = Date.now() - this.beginTime,
			d = this.duration,
			func = Tween[this.timingFunction] || Tween['linear'];
		
		if (this.state === 'end' || t >= d) {
			this._end();
		} else if (this.state === 'stop') {
			this._stop(t);
		} else if (this.state === 'init') {
			this._reset();
		} else {
			this._renderFunction(t, d, func)
			window.requestAnimationFrame(this._loop.bind(this));
		}
	}
	
	_renderFunction(t, d, func) {
		const values = this.value.map(value => func(t, value.start, value.end - value.start, d));
		this.renderFunction.apply(this, values);
	}
	
	_renderEndState() {
		const d = this.duration,
			func = Tween[this.timingFunction] || Tween['linear'];
		this._renderFunction(d, d, func);
	}
	
	_renderInitState() {
		const d = this.duration,
			func = Tween[this.timingFunction] || Tween['linear'];
		this._renderFunction(0, d, func);
	}
	
	_renderStopState(t) {
		const d = this.duration,
			func = Tween[this.timingFunction] || Tween['linear'];
		this._renderFunction(t, d, func);
	}
	
	_stop(t) {
		this.state = 'stop';
		this._renderStopState(t);
		this.onStop && this.onStop();
	}
	
	_play() {
		this.state = 'play';
		this.onPlay && this.onPlay();
		
		this.beginTime = Date.now();
		const loop = this._loop.bind(this);
		window.requestAnimationFrame(loop);
	}
	
	_end() {
		this.state = 'end';
		this._renderEndState();
		this.onEnd && this.onEnd.call(this);
	}
	
	_reset() {
		this.state = 'init';
		this._renderInitState();
		this.onReset && this.onReset();
	}
	
	play() {
		this._play();
	}
	
	end() {
		this.state === 'play' ? (this.state = 'end') : this._end();
	}
	
	reset() {
		this.state === 'play' ? (this.state = 'init') : this._reset();
	}
	
	stop() {
		if (this.state === 'play') {
			this.state = 'stop';
		} else {
			this.state = 'stop';
			this.onStop && this.onStop();
		}
	}
}

window.Timeline = Core;