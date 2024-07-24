/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 * 
 *  *
 * Vignette shader
 * based on PaintEffect postprocess from ro.me
 * http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
 * 
 * 
 * OBLIO - (we just combined alteredq's 2 shaders into one for efficiency)
 * 
 */

import React, { forwardRef, useMemo } from 'react'
import { Uniform } from 'three'
import { Effect } from 'postprocessing'
import { wrapEffect } from '@react-three/postprocessing'

var TiltShiftVignetteShader = [
	"uniform sampler2D map;",
	"uniform float v;",
	"uniform float r;",
	"uniform float offset;",
	"uniform float darkness;",

	"void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {",

	"	vec4 sum = vec4( 0.0 );",

	"	float vv = v * abs( r - uv.y );",

	"	sum += texture2D( map, vec2( uv.x, uv.y - 4.0 * vv ) ) * 0.051;",
	"	sum += texture2D( map, vec2( uv.x, uv.y - 3.0 * vv ) ) * 0.0918;",
	"	sum += texture2D( map, vec2( uv.x, uv.y - 2.0 * vv ) ) * 0.12245;",
	"	sum += texture2D( map, vec2( uv.x, uv.y - 1.0 * vv ) ) * 0.1531;",
	"	sum += texture2D( map, vec2( uv.x, uv.y ) ) * 0.1633;",
	"	sum += texture2D( map, vec2( uv.x, uv.y + 1.0 * vv ) ) * 0.1531;",
	"	sum += texture2D( map, vec2( uv.x, uv.y + 2.0 * vv ) ) * 0.12245;",
	"	sum += texture2D( map, vec2( uv.x, uv.y + 3.0 * vv ) ) * 0.0918;",
	"	sum += texture2D( map, vec2( uv.x, uv.y + 4.0 * vv ) ) * 0.051;",

	"	vec2 _uv = pow( ( uv - vec2( 0.5 ) ) * vec2( offset ), vec2(2.0) );",

	"	outputColor = vec4( mix( sum.rgb, vec3( darkness ), dot( _uv, _uv ) ), sum.a );",
	"}"
].join("\n");


// const TiltShiftVignette = wrapEffect(TiltShiftVignetteEffect)

let _uParam_v
let _uParam_r
let _uParam_offset
let _uParam_darkness

// Effect implementation
class TiltShiftVignetteEffectImpl extends Effect {
	constructor({
		v = 1.0 / 512.0,
		r = 0.35,
		offset = 1.0,
		darkness = 1.0
	} = {}) {
		super('TiltShiftVignetteEffect', TiltShiftVignetteShader, {
			uniforms: new Map([
				['v', new Uniform(v)],
				['r', new Uniform(r)],
				['offset', new Uniform(offset)],
				['darkness', new Uniform(darkness)],
			]),
		})

		_uParam_v = v
		_uParam_r = r
		_uParam_offset = offset
		_uParam_darkness = darkness
	}

	update(renderer, inputBuffer, deltaTime) {
		this.uniforms.get('v').value = _uParam_v
		this.uniforms.get('r').value = _uParam_r
		this.uniforms.get('offset').value = _uParam_offset
		this.uniforms.get('darkness').value = _uParam_darkness
	}
}

// Effect component
const TiltShiftVignetteEffect = forwardRef(function TiltShiftVignetteEffect({ param }, ref) {
	const effect = useMemo(() => new TiltShiftVignetteEffectImpl(param), [param]);
	return <primitive ref={ref} object={effect} dispose={null} />
})



export { TiltShiftVignetteShader, TiltShiftVignetteEffect };