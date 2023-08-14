precision highp float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform float izoom;
uniform vec2 imouse;
uniform vec2 ipos;
uniform int nbPoint;
uniform bool showDot;

uniform vec2 ip1;
uniform vec2 ip2;
uniform vec2 ip3;
uniform vec2 ip4;
uniform vec2 ip5;

uniform vec3 ic1;
uniform vec3 ic2;
uniform vec3 ic3;
uniform vec3 ic4;
uniform vec3 ic5;

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

vec3 rgb(int a, int b, int c){
    return vec3(float(a)/255.,float(b)/255.,float(c)/255.);
}

bool fcomp(float a, float b) {//test d'égalité entre 2 floats
    const float marge = 0.001;
    return (b - marge < a && a < b + marge) ? true : false;
}

vec3 color(vec2 p){
    float distmin = 0.0001;
    const int maxIt = 100;

    float dist = 100.;
    float it = 0.;

    vec3 c1 = ic1/255.; // rgb(255, 188, 66);
    vec3 c2 = ic2/255.; // rgb(216, 17, 89);
    vec3 c3 = ic3/255.; // rgb(115, 210, 222);
    vec3 c4 = ic4/255.; 
    vec3 c5 = ic5/255.; 
    vec2 p1 = ip1;
    vec2 p2 = ip2;
    vec2 p3 = ip3;
    vec2 p4 = ip4;
    vec2 p5 = ip5;
    vec2 a = vec2(1.0, 0.0);
    vec2 c = vec2(0.0, 0.0);
    float d1;
    float d2;
    float d3;
    float d4;
    float d5;

    vec3 col = vec3(0.0);

    for(int i = 0; i < maxIt; i++){
        if(dist <= distmin) {
            if(fcomp(d1, dist)){ col = c1;}
            if(fcomp(d2, dist)){ col = c2;}
            if(fcomp(d3, dist)){ col = c3;}
            if(fcomp(d4, dist)){ col = c4;}
            if(fcomp(d5, dist)){ col = c5;}
            break;
        }

        vec2 x1 = p - p1;
        vec2 x2 = p - p2;
        vec2 x3 = p - p3;
        vec2 x4 = p - p4;
        vec2 x5 = p - p5;

        vec2 num;
        vec2 denom;

        if(nbPoint == 3){
            num = mult(mult(x1, x2), x3);
            denom = mult(x2, x3) + mult(x1,x3) + mult(x1, x2);
        }
        if(nbPoint == 4){
            num = mult(mult(x1, x2), mult(x3,x4));
            denom = mult(mult(x2, x3), x4) + mult(mult(x1,x3), x4) + mult(mult(x1, x2), x4) + mult(mult(x1, x2), x3);
        }
        if(nbPoint == 5){
            num = mult(mult(mult(x1, x2), mult(x3,x4)), x5);
            denom = mult(mult(x2, x3), mult(x4, x5)) + mult(mult(x1,x3), mult(x4, x5)) + mult(mult(x1, x2), mult(x4, x5)) + mult(mult(x1, x2), mult(x3,x5)) + mult(mult(x1, x2), mult(x3,x4));
        }

        p = p - mult(a, divide(num, denom)) + c;

        d1 = length(x1);
        d2 = length(x2);
        d3 = length(x3);
        d4 = length(x4) + (nbPoint >= 4 ? 0.0 : 1000.0);
        d5 = length(x5) + (nbPoint >= 5 ? 0.0 : 1000.0);
        dist = min(min(min(d1,d2),min(d3,d4)), d5);
        it++;
    }

    float multVal = 0.9 + 0.3*cos(0.25 * (it - log2(log(dist +0.00000001) / log(distmin))));

    return col*multVal;

}


void main() {
    vec2 uv = (vTexCoord) * 2. - 1.;
    uv *= izoom;
    //vec2 mouse = imouse -0.5;
    uv -= ipos;
    uv.x *= resolution.x/resolution.y;
    vec3 col = color(uv);

    float pointSize = 0.02 * izoom;

    if(showDot){
        if(length(uv - ip1) < pointSize){col = vec3(1.)-ic1/255.;}
        if(length(uv - ip2) < pointSize){col = vec3(1.)-ic2/255.;}
        if(length(uv - ip3) < pointSize){col = vec3(1.)-ic3/255.;}
        if(length(uv - ip4) < pointSize && nbPoint >= 4){col = vec3(1.)-ic4/255.;}
        if(length(uv - ip5) < pointSize && nbPoint >= 5){col = vec3(1.)-ic5/255.;}
    }

    gl_FragColor = vec4(col, 1.0);
}