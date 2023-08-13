precision highp float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

#define PI 3.14159265

vec2 add(vec2 a, vec2 b){
    return vec2(a.x + b.x, a.y + b.y);
}

vec2 sub(vec2 a, vec2 b){
    return vec2(a.x - b.x, a.y - b.y);
}

vec2 mult(vec2 a, vec2 b){
    return vec2((a.x * b.x - a.y * b.y), (a.y*b.x + a.x*b.y));
}

vec2 divide(vec2 a, vec2 b){
	float mod_2 = b.x*b.x + b.y*b.y;

	if (mod_2 == 0.) {return vec2(0., 0.);}

	return vec2((a.x * b.x + a.y * b.y) / mod_2, (a.y * b.x - a.x * b.y) / mod_2);
}

vec3 color(vec2 p){
    float distmin = 0.0001;
    const int maxIt = 100;

    float dist = 100.;

    vec2 p1 = vec2(1., 0.);
    vec2 p2 = vec2(-0.5, 0.866025);
    vec2 p3 = vec2(-0.5, -0.866025);
    float d1;
    float d2;
    float d3;

    for(int i = 0; i < maxIt; i++){
        if(dist < distmin) {
            if(d1 <= d2 && d1 <= d3){ return vec3(1.0,0.0,0.0);}
            if(d2 <= d1 && d2 <= d3){ return vec3(0.0,1.0,0.0);}
            if(d3 <= d2 && d3 <= d1){ return vec3(0.0,0.0,1.0);}
        }

        vec2 num = mult(mult(p - p1, p - p2), p - p3);
        vec2 denom = mult(p-p2, p-p3) + mult(p-p1, p-p3) + mult(p-p1, p-p2);
        p = p - divide(num, denom);

        d1 = length(p-p1);
        d2 = length(p-p2);
        d3 = length(p-p3);
        dist = min(min(d1,d2),d3);
    }

    return vec3(0.0);

}


void main() {
    vec2 uv = vTexCoord * 2. - 1.;
    uv.x *= resolution.x/resolution.y;

    vec3 col = color(uv);

    gl_FragColor = vec4(col, 1.0);
}